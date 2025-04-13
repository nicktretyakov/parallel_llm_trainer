"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface NetworkGraphProps {
  zoomLevel: number
}

export function NetworkGraph({ zoomLevel }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3
      .select(svgRef.current)
      .append("g")
      .attr("transform", `scale(${zoomLevel})`)
      .attr("transform-origin", "center")

    // Define the layers
    const layers = [
      { id: "input", name: "Input", nodes: 10, x: width * 0.1 },
      { id: "hidden1", name: "Hidden 1", nodes: 8, x: width * 0.3 },
      { id: "hidden2", name: "Hidden 2", nodes: 8, x: width * 0.5 },
      { id: "hidden3", name: "Hidden 3", nodes: 8, x: width * 0.7 },
      { id: "output", name: "Output", nodes: 4, x: width * 0.9 },
    ]

    // Create all nodes
    const nodes: any[] = []
    const links: any[] = []

    layers.forEach((layer) => {
      const nodeHeight = height / (layer.nodes + 1)

      for (let i = 0; i < layer.nodes; i++) {
        nodes.push({
          id: `${layer.id}-${i}`,
          x: layer.x,
          y: nodeHeight * (i + 1),
          layer: layer.id,
        })
      }
    })

    // Create links between layers
    for (let l = 0; l < layers.length - 1; l++) {
      const sourceLayer = layers[l]
      const targetLayer = layers[l + 1]

      for (let i = 0; i < sourceLayer.nodes; i++) {
        for (let j = 0; j < targetLayer.nodes; j++) {
          links.push({
            source: `${sourceLayer.id}-${i}`,
            target: `${targetLayer.id}-${j}`,
            value: Math.random(),
          })
        }
      }
    }

    // Draw links
    svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", (d: any) => nodes.find((n) => n.id === d.source)?.x || 0)
      .attr("y1", (d: any) => nodes.find((n) => n.id === d.source)?.y || 0)
      .attr("x2", (d: any) => nodes.find((n) => n.id === d.target)?.x || 0)
      .attr("y2", (d: any) => nodes.find((n) => n.id === d.target)?.y || 0)
      .attr("stroke", "#aaa")
      .attr("stroke-width", (d: any) => Math.max(0.1, d.value) * 0.5)
      .attr("opacity", 0.2)

    // Draw nodes
    svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", (d: any) => d.x)
      .attr("cy", (d: any) => d.y)
      .attr("r", 6)
      .attr("fill", (d: any) => {
        if (d.layer === "input") return "#4f46e5"
        if (d.layer === "output") return "#16a34a"
        return "#6b7280"
      })

    // Add layer labels
    svg
      .selectAll(".layer-label")
      .data(layers)
      .enter()
      .append("text")
      .attr("class", "layer-label")
      .attr("x", (d: any) => d.x)
      .attr("y", height - 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text((d: any) => d.name)
  }, [zoomLevel])

  return <svg ref={svgRef} className="h-full w-full" />
}
