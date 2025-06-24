"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Pill, Bell, CheckCircle, AlertCircle, Plus } from "lucide-react"

// Mock data
const mockStats = {
  upcomingAppointments: 2,
  activePrescriptions: 3,
  medicineCompliance: 85,
  nextAppointment: "Tomorrow",
}

const upcomingAppointments = [
  { id: 1, doctor: "Dr. Smith", specialty: "Cardiology", date: "Tomorrow", time: "10:00 AM", type: "Follow-up" },
  { id: 2, doctor: "Dr. Johnson", specialty: "General", date: "Dec 28", time: "02:30 PM", type: "Check-up" },
]

const activePrescriptions = [
  {
    id: 1,
    medicine: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    nextDose: "8:00 AM",
    progress: 75,
    doctor: "Dr. Smith",
  },
  {
    id: 2,
    medicine: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    nextDose: "6:00 PM",
    progress: 90,
    doctor: "Dr. Johnson",
  },
  {
    id: 3,
    medicine: "Vitamin D",
    dosage: "1000 IU",
    frequency: "Once daily",
    nextDose: "9:00 AM",
    progress: 60,
    doctor: "Dr. Smith",
  },
]

const medicineReminders = [
  { id: 1, medicine: "Lisinopril", time: "8:00 AM", status: "taken" },
  { id: 2, medicine: "Metformin", time: "12:00 PM", status: "taken" },
  { id: 3, medicine: "Metformin", time: "6:00 PM", status: "pending" },
  { id: 4, medicine: "Vitamin D", time: "9:00 AM", status: "missed" },
]

const recentVisits = [
  { id: 1, doctor: "Dr. Smith", date: "Dec 15, 2024", type: "Consultation", notes: "Blood pressure check" },
  { id: 2, doctor: "Dr. Johnson", date: "Dec 10, 2024", type: "Follow-up", notes: "Diabetes monitoring" },
  { id: 3, doctor: "Dr. Wilson", date: "Dec 5, 2024", type: "Check-up", notes: "Annual physical" },
]

export default function PatientDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "patient") {
      router.push("/login")
      return
    }

    setUser(parsedUser)
  }, [router])

  const markMedicineTaken = (medicineId: number) => {
    // In a real app, this would update the backend
    console.log(`Marked medicine ${medicineId} as taken`)
  }

  if (!user) return null

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="patient" />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.upcomingAppointments}</div>
                  <p className="text-xs text-muted-foreground">Next: {mockStats.nextAppointment}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
                  <Pill className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.activePrescriptions}</div>
                  <p className="text-xs text-muted-foreground">Currently taking</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Medicine Compliance</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.medicineCompliance}%</div>
                  <Progress value={mockStats.medicineCompliance} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Pending reminders</p>
                </CardContent>
              </Card>
            </div>

            {/* Appointments and Medicine Reminders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled medical appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>{appointment.doctor.split(" ")[1][0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{appointment.doctor}</p>
                            <p className="text-sm text-gray-600">{appointment.specialty}</p>
                            <p className="text-sm text-gray-600">
                              {appointment.date} at {appointment.time}
                            </p>
                          </div>
                        </div>
                        <Badge>{appointment.type}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Book New Appointment
                  </Button>
                </CardContent>
              </Card>

              {/* Medicine Reminders */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Medicine</CardTitle>
                  <CardDescription>Your medication schedule for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medicineReminders.map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {reminder.status === "taken" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : reminder.status === "missed" ? (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-blue-500" />
                          )}
                          <div>
                            <p className="font-medium">{reminder.medicine}</p>
                            <p className="text-sm text-gray-600">{reminder.time}</p>
                          </div>
                        </div>
                        {reminder.status === "pending" && (
                          <Button size="sm" onClick={() => markMedicineTaken(reminder.id)}>
                            Mark Taken
                          </Button>
                        )}
                        {reminder.status !== "pending" && (
                          <Badge
                            variant={
                              reminder.status === "taken"
                                ? "default"
                                : reminder.status === "missed"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {reminder.status}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Reminders
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Active Prescriptions */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Active Prescriptions</CardTitle>
                <CardDescription>Your current medications and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activePrescriptions.map((prescription) => (
                    <div key={prescription.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{prescription.medicine}</h3>
                        <Badge variant="outline">{prescription.dosage}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{prescription.frequency}</p>
                      <p className="text-sm text-gray-600 mb-3">Next dose: {prescription.nextDose}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{prescription.progress}%</span>
                        </div>
                        <Progress value={prescription.progress} />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Prescribed by {prescription.doctor}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Visits */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Visits</CardTitle>
                <CardDescription>Your recent medical appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentVisits.map((visit) => (
                    <div key={visit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>{visit.doctor.split(" ")[1][0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{visit.doctor}</p>
                          <p className="text-sm text-gray-600">
                            {visit.date} • {visit.type}
                          </p>
                          <p className="text-sm text-gray-500">{visit.notes}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Visits
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
