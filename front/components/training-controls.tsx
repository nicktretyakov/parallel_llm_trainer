"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pause, Play, RotateCcw, Save, Upload, Download, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function TrainingControls() {
  const { toast } = useToast()
  const [isTraining, setIsTraining] = useState(true)
  const [batchSize, setBatchSize] = useState(64)
  const [learningRate, setLearningRate] = useState([0.001])
  const [epochs, setEpochs] = useState(10)
  const [threads, setThreads] = useState(8)
  const [useAutoTuning, setUseAutoTuning] = useState(true)

  const toggleTraining = () => {
    setIsTraining(!isTraining)
    toast({
      title: isTraining ? "Training paused" : "Training resumed",
      description: isTraining
        ? "The training process has been paused. You can resume it at any time."
        : "The training process has been resumed.",
    })
  }

  const resetTraining = () => {
    toast({
      title: "Confirm Reset",
      description: "Are you sure you want to reset the training process? This will lose all progress.",
      action: (
        <Button
          variant="destructive"
          onClick={() => {
            setIsTraining(false)
            toast({
              title: "Training reset",
              description: "The training process has been reset to the initial state.",
            })
          }}
        >
          Reset
        </Button>
      ),
    })
  }

  const saveCheckpoint = () => {
    toast({
      title: "Checkpoint saved",
      description: "The current model state has been saved as a checkpoint.",
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Training Controls</CardTitle>
          <CardDescription>Manage the current training process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Current Status</h3>
              <p className="text-sm text-muted-foreground">{isTraining ? "Training in progress" : "Training paused"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={toggleTraining}>
                {isTraining ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={resetTraining}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={saveCheckpoint}>
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Progress</Label>
              <span className="text-sm">Epoch 7/10 (65%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 w-[65%] rounded-full bg-primary"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Estimated Time Remaining</Label>
              <span className="text-sm">2h 14m</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Current Loss</Label>
              <span className="text-sm">0.876</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Current Accuracy</Label>
              <span className="text-sm">76.2%</span>
            </div>
          </div>
          <div className="rounded-md border p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Potential Overfitting Detected</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Validation loss has increased for 2 consecutive epochs while training loss continues to decrease.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Export Metrics
          </Button>
          <Button className="ml-2 w-full">
            <Download className="mr-2 h-4 w-4" />
            Save Model
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Training Configuration</CardTitle>
          <CardDescription>Adjust parameters for the current training job</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="hardware">Hardware</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="batch-size">Batch Size</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="batch-size"
                    type="number"
                    value={batchSize}
                    onChange={(e) => setBatchSize(Number.parseInt(e.target.value))}
                    min={1}
                    max={512}
                  />
                  <span className="text-sm text-muted-foreground">samples</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Learning Rate</Label>
                  <span className="text-sm">{learningRate[0].toFixed(6)}</span>
                </div>
                <Slider
                  value={learningRate}
                  min={0.000001}
                  max={0.01}
                  step={0.000001}
                  onValueChange={setLearningRate}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="epochs">Epochs</Label>
                <Input
                  id="epochs"
                  type="number"
                  value={epochs}
                  onChange={(e) => setEpochs(Number.parseInt(e.target.value))}
                  min={1}
                  max={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="optimizer">Optimizer</Label>
                <Select defaultValue="adam">
                  <SelectTrigger>
                    <SelectValue placeholder="Select optimizer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sgd">SGD</SelectItem>
                    <SelectItem value="adam">Adam</SelectItem>
                    <SelectItem value="rmsprop">RMSprop</SelectItem>
                    <SelectItem value="adagrad">Adagrad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weight-decay">Weight Decay</Label>
                <Input id="weight-decay" type="number" defaultValue="0.0001" min={0} step={0.0001} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropout">Dropout Rate</Label>
                <Input id="dropout" type="number" defaultValue="0.2" min={0} max={1} step={0.1} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gradient-clip">Gradient Clipping</Label>
                <Input id="gradient-clip" type="number" defaultValue="1.0" min={0} step={0.1} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-tuning" checked={useAutoTuning} onCheckedChange={setUseAutoTuning} />
                <Label htmlFor="auto-tuning">Enable Auto-Tuning</Label>
              </div>
              <div className="rounded-md border p-4">
                <h4 className="mb-2 text-sm font-medium">Early Stopping</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patience">Patience</Label>
                    <Input id="patience" type="number" defaultValue="5" min={1} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-delta">Min Delta</Label>
                    <Input id="min-delta" type="number" defaultValue="0.001" min={0} step={0.001} />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="hardware" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="threads">Number of Threads</Label>
                <Input
                  id="threads"
                  type="number"
                  value={threads}
                  onChange={(e) => setThreads(Number.parseInt(e.target.value))}
                  min={1}
                  max={32}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="device">Device</Label>
                <Select defaultValue="gpu">
                  <SelectTrigger id="device">
                    <SelectValue placeholder="Select device" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cpu">CPU</SelectItem>
                    <SelectItem value="gpu">GPU</SelectItem>
                    <SelectItem value="multi-gpu">Multi-GPU</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="precision">Precision</Label>
                <Select defaultValue="fp32">
                  <SelectTrigger id="precision">
                    <SelectValue placeholder="Select precision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fp32">FP32 (Full Precision)</SelectItem>
                    <SelectItem value="fp16">FP16 (Mixed Precision)</SelectItem>
                    <SelectItem value="bf16">BF16 (Brain Float)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-md border p-4">
                <h4 className="mb-2 text-sm font-medium">Memory Management</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="gradient-checkpointing" defaultChecked />
                    <Label htmlFor="gradient-checkpointing">Gradient Checkpointing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="memory-efficient" defaultChecked />
                    <Label htmlFor="memory-efficient">Memory-Efficient Attention</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              toast({
                title: "Configuration applied",
                description: "The new configuration will take effect on the next epoch.",
              })
            }}
          >
            Apply Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
