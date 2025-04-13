"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useSidebar } from "@/components/sidebar-context"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
        <Header />
        <main className="flex-1 overflow-auto bg-muted/40 p-4">{children}</main>
      </div>
    </div>
  )
}
