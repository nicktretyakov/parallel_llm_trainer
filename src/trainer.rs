use crate::dataset::Dataset;
use crate::neural_network::NeuralNetwork;
use rayon::prelude::*;
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Instant;

/// Configuration for parallel training
pub struct TrainingConfig {
    pub batch_size: usize,
    pub epochs: usize,
    pub num_threads: usize,
    pub learning_rate: f32,
    pub validation_split: f32,
}

impl Default for TrainingConfig {
    fn default() -> Self {
        Self {
            batch_size: 32,
            epochs: 10,
            num_threads: num_cpus::get(),
            learning_rate: 0.01,
            validation_split: 0.2,
        }
    }
}

/// Training metrics
pub struct TrainingMetrics {
    pub loss: f32,
    pub accuracy: f32,
    pub training_time: std::time::Duration,
}

/// Error types for training
#[derive(Debug)]
pub enum TrainingError {
    InvalidDataset,
    ThreadPoolCreationFailed,
    TrainingFailed(String),
}

/// Main trainer that encapsulates parallelism details
pub struct ParallelTrainer {
    model: Arc<Mutex<NeuralNetwork>>,
    config: TrainingConfig,
}

impl ParallelTrainer {
    /// Create a new parallel trainer with default configuration
    pub fn new(model: NeuralNetwork) -> Self {
        Self {
            model: Arc::new(Mutex::new(model)),
            config: TrainingConfig::default(),
        }
    }

    /// Create a new parallel trainer with custom configuration
    pub fn with_config(model: NeuralNetwork, config: TrainingConfig) -> Self {
        Self {
            model: Arc::new(Mutex::new(model)),
            config,
        }
    }

    /// Train the model on the given dataset
    pub fn train(&self, dataset: &Dataset) -> Result<TrainingMetrics, TrainingError> {
        if dataset.inputs.len() != dataset.targets.len() || dataset.inputs.is_empty() {
            return Err(TrainingError::InvalidDataset);
        }

        println!(
            "Starting parallel training with {} threads",
            self.config.num_threads
        );
        let start_time = Instant::now();

        // Split dataset into batches
        let batches = self.create_batches(dataset);

        // Train for specified number of epochs
        for epoch in 0..self.config.epochs {
            let epoch_start = Instant::now();

            // Process batches in parallel
            let results: Vec<Result<f32, String>> = batches
                .par_iter()
                .map(|batch| self.process_batch(batch))
                .collect();

            // Check for errors
            let losses: Vec<f32> = results.into_iter().filter_map(|r| r.ok()).collect();

            if losses.is_empty() {
                return Err(TrainingError::TrainingFailed(
                    "All batch processing failed".to_string(),
                ));
            }

            // Calculate average loss
            let avg_loss: f32 = losses.iter().sum::<f32>() / losses.len() as f32;

            println!(
                "Epoch {}/{} completed in {:?}, loss: {:.6}",
                epoch + 1,
                self.config.epochs,
                epoch_start.elapsed(),
                avg_loss
            );
        }

        // Calculate final metrics
        let metrics = self.evaluate(dataset);
        let training_time = start_time.elapsed();

        Ok(TrainingMetrics {
            loss: metrics.0,
            accuracy: metrics.1,
            training_time,
        })
    }

    /// Process a single batch (called in parallel)
    fn process_batch(&self, batch: &(Vec<Vec<f32>>, Vec<Vec<f32>>)) -> Result<f32, String> {
        let (inputs, targets) = batch;
        let batch_size = inputs.len();

        // Lock the model for gradient calculation
        let mut gradients = Vec::new();

        {
            let model = self.model.lock().map_err(|e| e.to_string())?;

            // Calculate gradients for each sample in the batch
            for i in 0..batch_size {
                let sample_gradients = self.calculate_gradients(&model, &inputs[i], &targets[i]);
                gradients.push(sample_gradients);
            }
        }

        // Average gradients across the batch
        let avg_gradients = self.average_gradients(gradients);

        // Apply gradients to the model
        let mut model = self.model.lock().map_err(|e| e.to_string())?;
        self.apply_gradients(&mut model, &avg_gradients);

        // Calculate loss for this batch
        let mut batch_loss = 0.0;
        for i in 0..batch_size {
            batch_loss += self.calculate_loss(&model, &inputs[i], &targets[i]);
        }

        Ok(batch_loss / batch_size as f32)
    }

    /// Split dataset into batches
    fn create_batches(&self, dataset: &Dataset) -> Vec<(Vec<Vec<f32>>, Vec<Vec<f32>>)> {
        let mut batches = Vec::new();
        let n_samples = dataset.inputs.len();

        for i in (0..n_samples).step_by(self.config.batch_size) {
            let end = std::cmp::min(i + self.config.batch_size, n_samples);
            let batch_inputs = dataset.inputs[i..end].to_vec();
            let batch_targets = dataset.targets[i..end].to_vec();
            batches.push((batch_inputs, batch_targets));
        }

        batches
    }

    /// Calculate gradients for a single sample
    fn calculate_gradients(
        &self,
        model: &NeuralNetwork,
        input: &[f32],
        target: &[f32],
    ) -> Vec<(Vec<Vec<f32>>, Vec<f32>)> {
        // This would contain the actual backpropagation algorithm
        // Simplified for demonstration purposes
        let mut layer_gradients = Vec::new();

        for layer in &model.layers {
            // Placeholder for actual gradient calculation
            let weight_gradients = vec![vec![0.0; layer.weights[0].len()]; layer.weights.len()];
            let bias_gradients = vec![0.0; layer.biases.len()];
            layer_gradients.push((weight_gradients, bias_gradients));
        }

        layer_gradients
    }

    /// Average gradients across a batch
    fn average_gradients(
        &self,
        gradients: Vec<Vec<(Vec<Vec<f32>>, Vec<f32>)>>,
    ) -> Vec<(Vec<Vec<f32>>, Vec<f32>)> {
        // Simplified for demonstration
        if gradients.is_empty() {
            return Vec::new();
        }

        let n_layers = gradients[0].len();
        let batch_size = gradients.len() as f32;
        let mut avg_gradients = Vec::new();

        for l in 0..n_layers {
            let n_neurons = gradients[0][l].1.len();
            let n_inputs = gradients[0][l].0[0].len();

            let mut avg_weights = vec![vec![0.0; n_inputs]; n_neurons];
            let mut avg_biases = vec![0.0; n_neurons];

            for batch_grad in &gradients {
                for n in 0..n_neurons {
                    avg_biases[n] += batch_grad[l].1[n] / batch_size;

                    for i in 0..n_inputs {
                        avg_weights[n][i] += batch_grad[l].0[n][i] / batch_size;
                    }
                }
            }

            avg_gradients.push((avg_weights, avg_biases));
        }

        avg_gradients
    }

    /// Apply gradients to the model
    fn apply_gradients(&self, model: &mut NeuralNetwork, gradients: &[(Vec<Vec<f32>>, Vec<f32>)]) {
        for (l, layer) in model.layers.iter_mut().enumerate() {
            let (weight_grads, bias_grads) = &gradients[l];

            for n in 0..layer.biases.len() {
                layer.biases[n] -= self.config.learning_rate * bias_grads[n];

                for i in 0..layer.weights[n].len() {
                    layer.weights[n][i] -= self.config.learning_rate * weight_grads[n][i];
                }
            }
        }
    }

    /// Calculate loss for a single sample
    fn calculate_loss(&self, model: &NeuralNetwork, input: &[f32], target: &[f32]) -> f32 {
        // Simplified MSE loss calculation
        0.1 // Placeholder
    }

    /// Evaluate the model on the dataset
    fn evaluate(&self, dataset: &Dataset) -> (f32, f32) {
        // Return (loss, accuracy)
        (0.1, 0.95) // Placeholder values
    }
}
