"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Activity,
  Calendar,
  Home,
  LogOut,
  Menu,
  Pill,
  Settings,
  Shield,
  Stethoscope,
  User,
  Users,
  X,
  BarChart3,
  Clock,
} from "lucide-react"

interface SidebarProps {
  role: "admin" | "doctor" | "patient"
}

const menuItems = {
  admin: [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Doctors", href: "/admin/doctors" },
    { icon: User, label: "Patients", href: "/admin/patients" },
    { icon: Calendar, label: "Appointments", href: "/admin/appointments" },
    { icon: Pill, label: "Prescriptions", href: "/admin/prescriptions" },
    { icon: BarChart3, label: "Reports", href: "/admin/reports" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ],
  doctor: [
    { icon: Home, label: "Dashboard", href: "/doctor" },
    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
    { icon: Clock, label: "Schedule", href: "/doctor/schedule" },
    { icon: Pill, label: "Prescriptions", href: "/doctor/prescriptions" },
    { icon: User, label: "Patients", href: "/doctor/patients" },
    { icon: Settings, label: "Profile", href: "/doctor/profile" },
  ],
  patient: [
    { icon: Home, label: "Dashboard", href: "/patient" },
    { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
    { icon: Pill, label: "Prescriptions", href: "/patient/prescriptions" },
    { icon: User, label: "Profile", href: "/patient/profile" },
  ],
}

export function Sidebar({ role }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const roleIcons = {
    admin: Shield,
    doctor: Stethoscope,
    patient: User,
  }

  const RoleIcon = roleIcons[role]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center px-6 py-4 border-b">
            <Activity className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">MediCare</span>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <RoleIcon className="h-10 w-10 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {menuItems[role].map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
