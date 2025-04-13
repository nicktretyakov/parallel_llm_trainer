"use client"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const gpuData = [
  { time: "14:00", usage: 65 },
  { time: "14:05", usage: 72 },
  { time: "14:10", usage: 78 },
  { time: "14:15", usage: 85 },
  { time: "14:20", usage: 82 },
  { time: "14:25", usage: 87 },
  { time: "14:30", usage: 90 },
  { time: "14:35", usage: 88 },
  { time: "14:40", usage: 85 },
  { time: "14:45", usage: 87 },
]

export function SystemStatus() {
  return (
    <div className="space-y-4">
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={gpuData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="usage" stroke="#4f46e5" name="GPU Usage %" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div>GPU 0: NVIDIA A100</div>
            <div className="font-medium">87%</div>
          </div>
          <Progress value={87} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div>GPU Memory</div>
            <div className="font-medium">42.8 GB / 80 GB</div>
          </div>
          <Progress value={53.5} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div>CPU Usage</div>
            <div className="font-medium">32%</div>
          </div>
          <Progress value={32} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div>RAM</div>
            <div className="font-medium">128 GB / 256 GB</div>
          </div>
          <Progress value={50} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div>Disk I/O</div>
            <div className="font-medium">120 MB/s</div>
          </div>
          <Progress value={40} className="h-2" />
        </div>
      </div>
    </div>
  )
}
