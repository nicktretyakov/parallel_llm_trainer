"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NetworkGraph } from "@/components/network-graph"

export function ModelArchitecture() {
  const [viewMode, setViewMode] = useState("graph")
  const [zoomLevel, setZoomLevel] = useState([1])

  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Model Architecture</CardTitle>
            <CardDescription>Visual representation of the neural network</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Zoom:</span>
              <Slider className="w-24" value={zoomLevel} min={0.5} max={2} step={0.1} onValueChange={setZoomLevel} />
            </div>
            <Select defaultValue="transformer">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Model Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transformer">Transformer</SelectItem>
                <SelectItem value="cnn">CNN</SelectItem>
                <SelectItem value="rnn">RNN</SelectItem>
                <SelectItem value="mlp">MLP</SelectItem>
              </SelectContent>
            </Select>
            <Tabs value={viewMode} onValueChange={setViewMode}>
              <TabsList>
                <TabsTrigger value="graph">Graph</TabsTrigger>
                <TabsTrigger value="layers">Layers</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] w-full">
          {viewMode === "graph" && <NetworkGraph zoomLevel={zoomLevel[0]} />}
          {viewMode === "layers" && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Input Layer</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Shape:</span>
                        <span className="font-mono">[batch, 784]</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-mono">float32</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Hidden Layer 1</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Units:</span>
                        <span className="font-mono">128</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Activation:</span>
                        <span className="font-mono">ReLU</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Hidden Layer 2</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Units:</span>
                        <span className="font-mono">64</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Activation:</span>
                        <span className="font-mono">ReLU</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Output Layer</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Units:</span>
                        <span className="font-mono">10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Activation:</span>
                        <span className="font-mono">Softmax</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Layer Parameters</h3>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium">Layer</th>
                        <th className="px-4 py-2 text-left font-medium">Parameters</th>
                        <th className="px-4 py-2 text-left font-medium">Output Shape</th>
                        <th className="px-4 py-2 text-left font-medium">Memory</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2">Input</td>
                        <td className="px-4 py-2">0</td>
                        <td className="px-4 py-2">[batch, 784]</td>
                        <td className="px-4 py-2">3.1 KB</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">Hidden 1</td>
                        <td className="px-4 py-2">100,480</td>
                        <td className="px-4 py-2">[batch, 128]</td>
                        <td className="px-4 py-2">392.5 KB</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">Hidden 2</td>
                        <td className="px-4 py-2">8,256</td>
                        <td className="px-4 py-2">[batch, 64]</td>
                        <td className="px-4 py-2">32.3 KB</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Output</td>
                        <td className="px-4 py-2">650</td>
                        <td className="px-4 py-2">[batch, 10]</td>
                        <td className="px-4 py-2">2.5 KB</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-t">
                        <td className="px-4 py-2 font-medium">Total</td>
                        <td className="px-4 py-2 font-medium">109,386</td>
                        <td className="px-4 py-2"></td>
                        <td className="px-4 py-2 font-medium">430.4 KB</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          )}
          {viewMode === "code" && (
            <div className="h-full overflow-auto rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>{`
# Model Architecture Definition
model = NeuralNetwork(
    layers=[
        # Input layer is implicit with size 784
        # Hidden layers
        Layer(
            weights=np.random.randn(784, 128) * 0.01,
            biases=np.zeros(128)
        ),
        Layer(
            weights=np.random.randn(128, 64) * 0.01,
            biases=np.zeros(64)
        ),
        # Output layer
        Layer(
            weights=np.random.randn(64, 10) * 0.01,
            biases=np.zeros(10)
        )
    ],
    learning_rate=0.01
)

# Training Configuration
config = TrainingConfig(
    batch_size=64,
    epochs=10,
    num_threads=8,
    learning_rate=0.005,
    validation_split=0.1
)

# Create parallel trainer
trainer = ParallelTrainer.with_config(model, config)
                `}</code>
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
