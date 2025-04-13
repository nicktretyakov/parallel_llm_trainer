/// Represents a simple neural network for demonstration purposes
pub struct NeuralNetwork {
    pub layers: Vec<Layer>,
    pub learning_rate: f32,
}

pub struct Layer {
    pub weights: Vec<Vec<f32>>,
    pub biases: Vec<f32>,
}

impl NeuralNetwork {
    /// Create a new neural network with specified layer sizes
    pub fn new(layer_sizes: &[usize], learning_rate: f32) -> Self {
        let mut layers = Vec::new();

        for i in 0..layer_sizes.len() - 1 {
            let input_size = layer_sizes[i];
            let output_size = layer_sizes[i + 1];

            // Initialize weights and biases
            let weights = vec![vec![0.01; input_size]; output_size];
            let biases = vec![0.0; output_size];

            layers.push(Layer { weights, biases });
        }

        NeuralNetwork {
            layers,
            learning_rate,
        }
    }

    /// Forward pass through the network
    pub fn forward(&self, input: &[f32]) -> Vec<f32> {
        let mut activations = input.to_vec();

        for layer in &self.layers {
            let mut new_activations = vec![0.0; layer.biases.len()];

            for (n, bias) in layer.biases.iter().enumerate() {
                let mut sum = *bias;

                for (i, &activation) in activations.iter().enumerate() {
                    sum += layer.weights[n][i] * activation;
                }

                // Apply activation function (ReLU for simplicity)
                new_activations[n] = if sum > 0.0 { sum } else { 0.0 };
            }

            activations = new_activations;
        }

        activations
    }
}
