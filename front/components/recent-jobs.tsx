"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Play, Eye, RotateCcw, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const jobs = [
  {
    id: "job-1234",
    name: "LLM-Transformer-v2",
    status: "running",
    progress: 65,
    startTime: "2023-06-10T14:30:00Z",
    duration: "2h 15m",
    loss: 0.876,
    accuracy: 0.762,
  },
  {
    id: "job-1233",
    name: "LLM-Transformer-v1",
    status: "completed",
    progress: 100,
    startTime: "2023-06-09T10:15:00Z",
    duration: "4h 30m",
    loss: 0.523,
    accuracy: 0.891,
  },
  {
    id: "job-1232",
    name: "CNN-Experiment",
    status: "failed",
    progress: 45,
    startTime: "2023-06-08T09:00:00Z",
    duration: "1h 20m",
    loss: 1.234,
    accuracy: 0.456,
  },
  {
    id: "job-1231",
    name: "RNN-Test",
    status: "completed",
    progress: 100,
    startTime: "2023-06-07T16:45:00Z",
    duration: "3h 10m",
    loss: 0.678,
    accuracy: 0.823,
  },
  {
    id: "job-1230",
    name: "MLP-Baseline",
    status: "completed",
    progress: 100,
    startTime: "2023-06-06T11:30:00Z",
    duration: "2h 45m",
    loss: 0.789,
    accuracy: 0.765,
  },
]

export function RecentJobs() {
  return (
    <div className="overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left font-medium">Job Name</th>
            <th className="px-4 py-2 text-left font-medium">Status</th>
            <th className="px-4 py-2 text-left font-medium">Duration</th>
            <th className="px-4 py-2 text-left font-medium">Loss</th>
            <th className="px-4 py-2 text-left font-medium">Accuracy</th>
            <th className="px-4 py-2 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b">
              <td className="px-4 py-2">{job.name}</td>
              <td className="px-4 py-2">
                <Badge
                  variant={
                    job.status === "running" ? "default" : job.status === "completed" ? "success" : "destructive"
                  }
                >
                  {job.status}
                </Badge>
              </td>
              <td className="px-4 py-2">{job.duration}</td>
              <td className="px-4 py-2">{job.loss.toFixed(3)}</td>
              <td className="px-4 py-2">{(job.accuracy * 100).toFixed(1)}%</td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {job.status === "completed" && (
                    <Button variant="ghost" size="icon">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                  {job.status === "failed" && (
                    <Button variant="ghost" size="icon">
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Clone Job</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download Model
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete Job</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
