"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, Plus, X } from "lucide-react"

// Mock data
const mockAppointments = [
  {
    id: 1,
    doctor: "Dr. John Smith",
    specialty: "Cardiology",
    date: "2024-12-26",
    time: "10:00 AM",
    type: "Follow-up",
    status: "confirmed",
    notes: "Blood pressure check and medication review",
  },
  {
    id: 2,
    doctor: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    date: "2024-12-28",
    time: "02:30 PM",
    type: "Check-up",
    status: "confirmed",
    notes: "Annual physical examination",
  },
  {
    id: 3,
    doctor: "Dr. Michael Davis",
    specialty: "Orthopedics",
    date: "2024-12-20",
    time: "09:00 AM",
    type: "Consultation",
    status: "completed",
    notes: "Knee pain evaluation - completed",
  },
  {
    id: 4,
    doctor: "Dr. Emily Wilson",
    specialty: "Dermatology",
    date: "2024-12-15",
    time: "11:30 AM",
    type: "Treatment",
    status: "completed",
    notes: "Skin condition treatment - completed",
  },
]

const availableDoctors = [
  { id: 1, name: "Dr. John Smith", specialty: "Cardiology" },
  { id: 2, name: "Dr. Sarah Johnson", specialty: "General Medicine" },
  { id: 3, name: "Dr. Michael Davis", specialty: "Orthopedics" },
  { id: 4, name: "Dr. Emily Wilson", specialty: "Dermatology" },
  { id: 5, name: "Dr. Robert Brown", specialty: "Neurology" },
]

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
]

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [newAppointment, setNewAppointment] = useState({
    doctorId: "",
    date: "",
    time: "",
    type: "consultation",
    notes: "",
  })

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "confirmed" && new Date(apt.date) >= new Date(),
  )

  const pastAppointments = appointments.filter((apt) => apt.status === "completed" || new Date(apt.date) < new Date())

  const handleBookAppointment = () => {
    const doctor = availableDoctors.find((d) => d.id.toString() === newAppointment.doctorId)
    if (!doctor || !selectedDate) return

    const appointment = {
      id: appointments.length + 1,
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: selectedDate.toISOString().split("T")[0],
      time: newAppointment.time,
      type: newAppointment.type,
      status: "confirmed" as const,
      notes: newAppointment.notes,
    }

    setAppointments([...appointments, appointment])
    setNewAppointment({
      doctorId: "",
      date: "",
      time: "",
      type: "consultation",
      notes: "",
    })
    setSelectedDate(new Date())
    setIsBookingDialogOpen(false)
  }

  const handleCancelAppointment = (id: number) => {
    setAppointments(appointments.filter((apt) => apt.id !== id))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="patient" />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
                <p className="text-gray-600">Manage your medical appointments</p>
              </div>
              <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Book New Appointment</DialogTitle>
                    <DialogDescription>Schedule an appointment with one of our doctors.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>Select Doctor</Label>
                      <Select
                        value={newAppointment.doctorId}
                        onValueChange={(value) => setNewAppointment({ ...newAppointment, doctorId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDoctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id.toString()}>
                              {doctor.name} - {doctor.specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label>Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                        className="rounded-md border"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Select Time</Label>
                      <Select
                        value={newAppointment.time}
                        onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label>Appointment Type</Label>
                      <Select
                        value={newAppointment.type}
                        onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                          <SelectItem value="check-up">Check-up</SelectItem>
                          <SelectItem value="treatment">Treatment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label>Notes (Optional)</Label>
                      <Textarea
                        placeholder="Describe your symptoms or reason for visit..."
                        value={newAppointment.notes}
                        onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleBookAppointment}>Book Appointment</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Past Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pastAppointments.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{appointments.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Appointments */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming appointments</h3>
                    <p className="mt-1 text-sm text-gray-500">Book your next appointment to get started.</p>
                  </div>
                ) : (
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
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              {new Date(appointment.date).toLocaleDateString()}
                              <Clock className="h-4 w-4 ml-3 mr-1" />
                              {appointment.time}
                            </div>
                            {appointment.notes && <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>{appointment.type}</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Past Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription>Your appointment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg opacity-75"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>{appointment.doctor.split(" ")[1][0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{appointment.doctor}</p>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {new Date(appointment.date).toLocaleDateString()}
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            {appointment.time}
                          </div>
                          {appointment.notes && <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{appointment.type}</Badge>
                        <Badge variant="secondary">{appointment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
