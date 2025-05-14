import { CircleUser, Home, Moon, Activity, Heart, BarChart3, Settings } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Sidebar() {
  return (
    <div className="hidden md:flex h-screen w-64 flex-col fixed inset-y-0 z-50 bg-zinc-950 border-r border-zinc-800">
      <div className="flex h-14 items-center border-b border-zinc-800 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <CircleUser className="h-6 w-6 text-purple-500" />
          <span>Oura Summary</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="#"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-100",
              "bg-zinc-900 text-zinc-100",
            )}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-100"
          >
            <Moon className="h-4 w-4" />
            Sleep
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-100"
          >
            <Activity className="h-4 w-4" />
            Activity
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-100"
          >
            <Heart className="h-4 w-4" />
            Readiness
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-100"
          >
            <BarChart3 className="h-4 w-4" />
            Trends
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-zinc-800">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-100"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </div>
  )
}
