"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const lossData = [
  { epoch: 1, training: 2.5, validation: 2.7 },
  { epoch: 2, training: 2.1, validation: 2.3 },
  { epoch: 3, training: 1.8, validation: 2.0 },
  { epoch: 4, training: 1.5, validation: 1.8 },
  { epoch: 5, training: 1.3, validation: 1.6 },
  { epoch: 6, training: 1.1, validation: 1.4 },
  { epoch: 7, training: 0.9, validation: 1.2 },
  { epoch: 8, training: 0.8, validation: 1.1 },
  { epoch: 9, training: 0.7, validation: 1.0 },
  { epoch: 10, training: 0.6, validation: 0.9 },
]

const accuracyData = [
  { epoch: 1, training: 0.35, validation: 0.32 },
  { epoch: 2, training: 0.48, validation: 0.45 },
  { epoch: 3, training: 0.56, validation: 0.52 },
  { epoch: 4, training: 0.62, validation: 0.58 },
  { epoch: 5, training: 0.68, validation: 0.63 },
  { epoch: 6, training: 0.72, validation: 0.67 },
  { epoch: 7, training: 0.76, validation: 0.71 },
  { epoch: 8, training: 0.79, validation: 0.74 },
  { epoch: 9, training: 0.82, validation: 0.77 },
  { epoch: 10, training: 0.85, validation: 0.8 },
]

const learningRateData = [
  { epoch: 1, rate: 0.001 },
  { epoch: 2, rate: 0.001 },
  { epoch: 3, rate: 0.001 },
  { epoch: 4, rate: 0.0008 },
  { epoch: 5, rate: 0.0008 },
  { epoch: 6, rate: 0.0005 },
  { epoch: 7, rate: 0.0005 },
  { epoch: 8, rate: 0.0003 },
  { epoch: 9, rate: 0.0003 },
  { epoch: 10, rate: 0.0001 },
]

const gradientNormData = [
  { epoch: 1, norm: 1.8 },
  { epoch: 2, norm: 1.5 },
  { epoch: 3, norm: 1.3 },
  { epoch: 4, norm: 1.1 },
  { epoch: 5, norm: 0.9 },
  { epoch: 6, norm: 0.8 },
  { epoch: 7, norm: 0.7 },
  { epoch: 8, norm: 0.6 },
  { epoch: 9, norm: 0.5 },
  { epoch: 10, norm: 0.4 },
]

const confusionMatrix = [
  { name: "True Positive", value: 85 },
  { name: "False Positive", value: 7 },
  { name: "False Negative", value: 5 },
  { name: "True Negative", value: 83 },
]

const COLORS = ["#4f46e5", "#ef4444", "#f59e0b", "#10b981"]

export function TrainingMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Loss</CardTitle>
          <CardDescription>Training and validation loss over epochs</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lossData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="training" stroke="#4f46e5" name="Training Loss" />
              <Line type="monotone" dataKey="validation" stroke="#ef4444" name="Validation Loss" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Accuracy</CardTitle>
          <CardDescription>Training and validation accuracy over epochs</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accuracyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="training" stroke="#4f46e5" name="Training Accuracy" />
              <Line type="monotone" dataKey="validation" stroke="#ef4444" name="Validation Accuracy" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Learning Rate</CardTitle>
          <CardDescription>Learning rate schedule over epochs</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={learningRateData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rate" fill="#4f46e5" name="Learning Rate" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Gradient Norm</CardTitle>
          <CardDescription>Gradient norm over epochs</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gradientNormData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="norm" stroke="#4f46e5" name="Gradient Norm" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Confusion Matrix</CardTitle>
          <CardDescription>Model prediction accuracy breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={confusionMatrix}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {confusionMatrix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Metric</th>
                      <th className="px-4 py-2 text-left font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2">Accuracy</td>
                      <td className="px-4 py-2">0.85</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2">Precision</td>
                      <td className="px-4 py-2">0.92</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2">Recall</td>
                      <td className="px-4 py-2">0.94</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">F1 Score</td>
                      <td className="px-4 py-2">0.93</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="rounded-md border">
                <div className="p-4">
                  <h4 className="mb-2 font-medium">Class Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Class 0</span>
                      <span>25%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-1/4 rounded-full bg-primary"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Class 1</span>
                      <span>35%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[35%] rounded-full bg-primary"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Class 2</span>
                      <span>20%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-1/5 rounded-full bg-primary"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Class 3</span>
                      <span>20%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-1/5 rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
