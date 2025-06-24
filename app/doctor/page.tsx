"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Pill, User, Users, CheckCircle, AlertCircle } from "lucide-react"

// Mock data
const mockStats = {
  todayAppointments: 8,
  totalPatients: 45,
  activePrescriptions: 23,
  completedToday: 5,
}

const todayAppointments = [
  { id: 1, patient: "John Doe", time: "09:00 AM", type: "Consultation", status: "upcoming" },
  { id: 2, patient: "Jane Wilson", time: "10:30 AM", type: "Follow-up", status: "completed" },
  { id: 3, patient: "Mike Brown", time: "02:00 PM", type: "Check-up", status: "upcoming" },
  { id: 4, patient: "Sarah Lee", time: "03:30 PM", type: "Consultation", status: "upcoming" },
]

const recentPatients = [
  { id: 1, name: "John Doe", lastVisit: "Today", condition: "Hypertension", status: "stable" },
  { id: 2, name: "Jane Wilson", lastVisit: "Yesterday", condition: "Diabetes", status: "monitoring" },
  { id: 3, name: "Mike Brown", lastVisit: "2 days ago", condition: "Asthma", status: "stable" },
  { id: 4, name: "Sarah Lee", lastVisit: "3 days ago", condition: "Migraine", status: "improving" },
]

const medicineIntakeAlerts = [
  { id: 1, patient: "John Doe", medicine: "Lisinopril", status: "missed", time: "8:00 AM" },
  { id: 2, patient: "Jane Wilson", medicine: "Metformin", status: "taken", time: "9:00 AM" },
  { id: 3, patient: "Mike Brown", medicine: "Albuterol", status: "missed", time: "12:00 PM" },
]

export default function DoctorDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "doctor") {
      router.push("/login")
      return
    }

    setUser(parsedUser)
  }, [router])

  if (!user) return null

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="doctor" />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.todayAppointments}</div>
                  <p className="text-xs text-muted-foreground">Scheduled for today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalPatients}</div>
                  <p className="text-xs text-muted-foreground">Under your care</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
                  <Pill className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.activePrescriptions}</div>
                  <p className="text-xs text-muted-foreground">Currently active</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.completedToday}</div>
                  <p className="text-xs text-muted-foreground">Appointments completed</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule and Medicine Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Today's Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your appointments for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{appointment.patient}</p>
                            <p className="text-sm text-gray-600">
                              {appointment.time} • {appointment.type}
                            </p>
                          </div>
                        </div>
                        <Badge variant={appointment.status === "completed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Full Schedule
                  </Button>
                </CardContent>
              </Card>

              {/* Medicine Intake Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Medicine Intake Alerts</CardTitle>
                  <CardDescription>Patient medication status updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medicineIntakeAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {alert.status === "taken" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          <div>
                            <p className="font-medium">{alert.patient}</p>
                            <p className="text-sm text-gray-600">
                              {alert.medicine} • {alert.time}
                            </p>
                          </div>
                        </div>
                        <Badge variant={alert.status === "taken" ? "default" : "destructive"}>{alert.status}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Patients */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
                <CardDescription>Patients you've seen recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-gray-600">
                            {patient.condition} • Last visit: {patient.lastVisit}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          patient.status === "stable"
                            ? "default"
                            : patient.status === "improving"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Patients
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    New Appointment
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Pill className="h-6 w-6 mb-2" />
                    Write Prescription
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <User className="h-6 w-6 mb-2" />
                    Patient Records
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Clock className="h-6 w-6 mb-2" />
                    Update Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
