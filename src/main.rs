use parallel_llm_trainer::{Dataset, NeuralNetwork, ParallelTrainer, TrainingConfig};

fn main() {
    // Create a simple neural network with 3 layers
    let model = NeuralNetwork::new(&[784, 128, 10], 0.01);

    // Create a dataset (in a real application, you would load this from files)
    let inputs = vec![vec![0.0; 784]; 1000]; // 1000 samples with 784 features each
    let targets = vec![vec![0.0; 10]; 1000]; // 1000 samples with 10 classes each
    let dataset = Dataset::new(inputs, targets);

    // Create a custom training configuration
    let config = TrainingConfig {
        batch_size: 64,
        epochs: 5,
        num_threads: 8,
        learning_rate: 0.005,
        validation_split: 0.1,
    };

    // Create a trainer with custom configuration
    let trainer = ParallelTrainer::with_config(model, config);

    // Train the model
    match trainer.train(&dataset) {
        Ok(metrics) => {
            println!("Training completed successfully!");
            println!("Final loss: {:.6}", metrics.loss);
            println!("Final accuracy: {:.2}%", metrics.accuracy * 100.0);
            println!("Training time: {:?}", metrics.training_time);
        }
        Err(e) => {
            eprintln!("Training failed: {:?}", e);
        }
    }
}
