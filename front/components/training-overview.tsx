"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const trainingData = [
  { epoch: 1, loss: 2.5, accuracy: 0.35, validationLoss: 2.7, validationAccuracy: 0.32 },
  { epoch: 2, loss: 2.1, accuracy: 0.48, validationLoss: 2.3, validationAccuracy: 0.45 },
  { epoch: 3, loss: 1.8, accuracy: 0.56, validationLoss: 2.0, validationAccuracy: 0.52 },
  { epoch: 4, loss: 1.5, accuracy: 0.62, validationLoss: 1.8, validationAccuracy: 0.58 },
  { epoch: 5, loss: 1.3, accuracy: 0.68, validationLoss: 1.6, validationAccuracy: 0.63 },
  { epoch: 6, loss: 1.1, accuracy: 0.72, validationLoss: 1.4, validationAccuracy: 0.67 },
  { epoch: 7, loss: 0.9, accuracy: 0.76, validationLoss: 1.2, validationAccuracy: 0.71 },
  { epoch: 8, loss: 0.8, accuracy: 0.79, validationLoss: 1.1, validationAccuracy: 0.74 },
  { epoch: 9, loss: 0.7, accuracy: 0.82, validationLoss: 1.0, validationAccuracy: 0.77 },
  { epoch: 10, loss: 0.6, accuracy: 0.85, validationLoss: 0.9, validationAccuracy: 0.8 },
]

export function TrainingOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Training Progress</CardTitle>
          <CardDescription>Current training job: LLM-Transformer-v2</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="loss">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="loss">Loss</TabsTrigger>
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
            </TabsList>
            <TabsContent value="loss" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="loss" stroke="#8884d8" name="Training Loss" />
                  <Line type="monotone" dataKey="validationLoss" stroke="#82ca9d" name="Validation Loss" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="accuracy" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#8884d8" name="Training Accuracy" />
                  <Line type="monotone" dataKey="validationAccuracy" stroke="#82ca9d" name="Validation Accuracy" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Current Job Status</CardTitle>
          <CardDescription>LLM-Transformer-v2</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div>Progress</div>
              <div className="font-medium">65%</div>
            </div>
            <Progress value={65} />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Epoch</div>
                <div className="text-xl font-bold">7 / 10</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Batch</div>
                <div className="text-xl font-bold">342 / 500</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Loss</div>
                <div className="text-xl font-bold">0.876</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Accuracy</div>
                <div className="text-xl font-bold">76.2%</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Learning Rate</div>
                <div className="text-xl font-bold">0.0005</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Time Remaining</div>
                <div className="text-xl font-bold">2h 14m</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
