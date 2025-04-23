# Parallel LLM Trainer

A high-performance, Rust-based framework for **parallel training** of Large Language Models (LLMs) with optional GPU acceleration and a web-based monitoring dashboard.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Architecture & Workflow](#architecture--workflow)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Usage](#usage)
   - [CLI Training](#cli-training)
   - [Running the Dashboard](#running-the-dashboard)
8. [Code Structure](#code-structure)
9. [Module Reference](#module-reference)
10. [CLI Options](#cli-options)
11. [Benchmarks & Testing](#benchmarks--testing)
12. [Contributing](#contributing)
13. [License](#license)

---

## Overview

`parallel_llm_trainer` is a Rust library and CLI tool designed to accelerate the training of large language models by distributing workload **across CPU cores** (via Rayon) or **across GPUs** (via the `tch` / Torch bindings). It also includes a TypeScript/Next.js frontend for real-time monitoring of training progress, loss curves, and system utilization.

## Features

- ⚡ **Data Parallelism**: Split batches across CPU cores using Rayon.
- 🚀 **GPU Support** (optional): Harness NVIDIA GPUs via `tch` (Torch) bindings.
- 📊 **Real-Time Dashboard**: Interactive Next.js UI shows training metrics, GPU/CPU usage, and logs.
- 🔄 **Configurable Workflows**: Pluggable dataset loading, customizable neural architectures, and checkpointing.
- 💾 **Serialization**: Save and load model checkpoints in JSON or Torch formats.
- 🧪 **Benchmarking**: Built-in Criterion benchmarks for performance profiling.

## Architecture & Workflow

```text
+----------------------+      +----------------------+      +----------------------+
|  Dataset Loader      | ---> |  Trainer (Rust)      | ---> |  Model Checkpoints   |
|  (dataset.rs)        |      |  (trainer.rs)        |      |  & Logs              |
+----------------------+      +------+----+----------+      +----------------------+
                                        |
                                        v
                           +-------------------------+
                           | Monitoring Server (Rust)|
                           | exposes HTTP/WS metrics |
                           +-----------+-------------+
                                       |
                                       v
                    +-------------------------------------+
                    | Dashboard (Next.js, front/app)      |
                    +-------------------------------------+
```

1. **Load**: `dataset.rs` reads text corpora, tokenizes, and yields batched tensors.
2. **Train**: `trainer.rs` orchestrates forward/backward passes using `ndarray` (CPU) or `tch` (GPU), and averages gradients in parallel.
3. **Checkpoint**: Periodically serialize model weights and optimizer state.
4. **Monitor**: Metrics (loss, accuracy, throughput) are served over HTTP/WS.
5. **Dashboard**: Frontend visualizes metrics and offers controls (pause, resume, adjust hyperparameters).

## Prerequisites

- **Rust** toolchain (1.60+)
- **Node.js** (16+) / **pnpm** or **npm**
- **CUDA** & **libtorch** installed (for GPU / `tch` feature)
- `protoc` (if extending with protobuf metrics)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nicktretyakov/parallel_llm_trainer.git
   cd parallel_llm_trainer
   ```

2. **Build Rust backend**
   ```bash
   # CPU-only
   cargo build --release

   # CPU + Async + GPU support
   cargo build --release --features full
   ```

3. **Install Dashboard dependencies**
   ```bash
   cd front
   pnpm install        # or npm install
   ```

## Configuration

Environment variables (or `.env` in project root):

| Variable               | Description                               | Default         |
|------------------------|-------------------------------------------|-----------------|
| `TRAIN_DATA_PATH`      | Path to training corpus                   | `./data/train`  |
| `EVAL_DATA_PATH`       | Path to evaluation corpus                 | `./data/eval`   |
| `EPOCHS`               | Number of training epochs                 | `10`            |
| `BATCH_SIZE`           | Batch size per device                     | `32`            |
| `LEARNING_RATE`        | Initial learning rate                     | `1e-3`          |
| `METRICS_SERVER_ADDR`  | Host:port for metrics API                 | `127.0.0.1:8081`|
| `CHECKPOINT_DIR`       | Directory to save model checkpoints       | `./checkpoints` |

Enable optional features in **Cargo.toml** or via CLI flags (see [CLI Options](#cli-options)).

## Usage

### CLI Training

Run a standard CPU training:
```bash
cargo run --release -- \
  --train-path ./data/train.txt \
  --eval-path ./data/eval.txt \
  --epochs 5 \
  --batch-size 16
```

For GPU-accelerated training (requires `tch` feature):
```bash
cargo run --release --features torch -- \
  --train-path ./data/train.txt --gpu 0 --epochs 3
```

### Running the Dashboard

1. **Start metrics server** (bundled with trainer when `--serve-metrics` flag is set).
2. **Launch Frontend**:
   ```bash
   cd front
   pnpm dev
   ```
3. Navigate to `http://localhost:3000` to view live metrics.

## Code Structure

```text
parallel_llm_trainer/
├── Cargo.toml             # Project metadata & feature flags
├── src/
│   ├── main.rs            # CLI entrypoint & arguments parsing
│   ├── dataset.rs         # Corpus loading & batching
│   ├── neural_network.rs  # Model definitions & forward/backward
│   ├── trainer.rs         # Parallel training loops & checkpointing
│   └── lib.rs             # Shared types & utilities
│
└── front/                 # Next.js dashboard
    ├── app/               # Pages & API routes
    ├── components/        # React components (charts, controls)
    ├── hooks/             # Custom React hooks for WS polling
    ├── public/            # Static assets
    └── styles/            # Tailwind CSS config
```

## Module Reference

- **dataset.rs**: Implements `Dataset` trait, supports text and binary formats, tokenization via `ndarray`.
- **neural_network.rs**: Defines `TransformerLM` and helper layers; supports CPU (`ndarray`) & GPU (`tch::Tensor`).
- **trainer.rs**: Exposes `Trainer` struct: methods `train_epoch()`, `evaluate()`, and `save_checkpoint()`.
- **main.rs**: Parses CLI args (using `clap`), initializes logger, constructs `Trainer`, and runs training or metrics server.

## CLI Options

```text
Usage: parallel_llm_trainer [OPTIONS]

Options:
  --train-path <FILE>         Training data path (required)
  --eval-path <FILE>          Evaluation data path
  --epochs <N>                Number of epochs [default: 10]
  --batch-size <SIZE>         Batch size per thread [default: 32]
  --learning-rate <LR>        Learning rate [default: 1e-3]
  --gpu <ID>                  GPU device ID (requires --features torch)
  --serve-metrics             Enable HTTP & WebSocket metrics server
  --checkpoint-dir <DIR>      Directory for saving checkpoints
  -h, --help                  Print help information

Feature Flags:
  --features async            Enable async I/O (Tokio)
  --features torch            Enable GPU support via `tch`
```

## Benchmarks & Testing

- **Benchmarks**: `criterion` suite under `benches/`; run with:
  ```bash
  cargo bench
  ```
- **Unit Tests**: `cargo test`; uses `mockall` & `tempfile` for isolated testing.

## Contributing

Contributions welcome! Please follow these guidelines:

1. **Fork** the repository.
2. **Create a branch**: `feature/my-feature` or `bugfix/issue-123`.
3. **Write tests** for new functionality.
4. **Ensure benchmarks** and formatting: `cargo fmt`, `cargo clippy`.
5. **Submit a PR** and describe changes clearly.

---

## License

This project is dual-licensed under **MIT** or **Apache-2.0**. See [LICENSE](./LICENSE) for details.

