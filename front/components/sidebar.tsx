"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Brain, Database, FileText, GitBranch, LayoutDashboard, Settings, Cpu, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/sidebar-context"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  submenu?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Models",
    href: "/models",
    icon: Brain,
    submenu: [
      { title: "Model Library", href: "/models/library" },
      { title: "Architecture", href: "/models/architecture" },
      { title: "Checkpoints", href: "/models/checkpoints" },
    ],
  },
  {
    title: "Training",
    href: "/training",
    icon: Cpu,
    submenu: [
      { title: "Jobs", href: "/training/jobs" },
      { title: "Configuration", href: "/training/configuration" },
      { title: "Hyperparameters", href: "/training/hyperparameters" },
    ],
  },
  {
    title: "Datasets",
    href: "/datasets",
    icon: Database,
    submenu: [
      { title: "Browse", href: "/datasets/browse" },
      { title: "Upload", href: "/datasets/upload" },
      { title: "Preprocessing", href: "/datasets/preprocessing" },
    ],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    submenu: [
      { title: "Performance", href: "/analytics/performance" },
      { title: "Metrics", href: "/analytics/metrics" },
      { title: "Comparisons", href: "/analytics/comparisons" },
    ],
  },
  {
    title: "Experiments",
    href: "/experiments",
    icon: GitBranch,
  },
  {
    title: "Logs",
    href: "/logs",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    submenu: [
      { title: "General", href: "/settings/general" },
      { title: "Hardware", href: "/settings/hardware" },
      { title: "API", href: "/settings/api" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen } = useSidebar()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background transition-all duration-300",
          isOpen ? "w-64" : "w-20",
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            {isOpen && <span className="text-xl font-bold">LLM Trainer</span>}
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                {item.submenu ? (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "flex w-full items-center justify-start gap-3 px-3 py-2",
                            pathname.startsWith(item.href) && "bg-muted font-medium",
                            !isOpen && "justify-center px-2",
                          )}
                          onClick={() => toggleSubmenu(item.title)}
                        >
                          <item.icon className="h-5 w-5" />
                          {isOpen && (
                            <>
                              <span className="flex-1">{item.title}</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  openSubmenu === item.title && "rotate-180",
                                )}
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </>
                          )}
                        </Button>
                      </TooltipTrigger>
                      {!isOpen && <TooltipContent side="right">{item.title}</TooltipContent>}
                    </Tooltip>
                    {isOpen && openSubmenu === item.title && (
                      <ul className="mt-1 space-y-1 pl-10">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.title}>
                            <Link
                              href={subitem.href}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm hover:bg-muted",
                                pathname === subitem.href && "bg-muted font-medium",
                              )}
                            >
                              {subitem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted",
                          pathname === item.href && "bg-muted font-medium",
                          !isOpen && "justify-center px-2",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {isOpen && <span>{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {!isOpen && <TooltipContent side="right">{item.title}</TooltipContent>}
                  </Tooltip>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            {isOpen && (
              <div className="flex-1 truncate">
                <div className="text-sm font-medium">Admin User</div>
                <div className="text-xs text-muted-foreground">admin@example.com</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
