"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Edit, Plus, Search, Trash2, Mail, Phone, MapPin } from "lucide-react"

// Mock data
const mockDoctors = [
  {
    id: 1,
    name: "Dr. John Smith",
    email: "john.smith@hospital.com",
    phone: "+1 (555) 123-4567",
    specialization: "Cardiology",
    experience: "15 years",
    status: "active",
    patients: 45,
    location: "Building A, Floor 2",
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    phone: "+1 (555) 234-5678",
    specialization: "Pediatrics",
    experience: "12 years",
    status: "active",
    patients: 38,
    location: "Building B, Floor 1",
  },
  {
    id: 3,
    name: "Dr. Michael Davis",
    email: "michael.davis@hospital.com",
    phone: "+1 (555) 345-6789",
    specialization: "Orthopedics",
    experience: "18 years",
    status: "active",
    patients: 52,
    location: "Building C, Floor 3",
  },
  {
    id: 4,
    name: "Dr. Emily Wilson",
    email: "emily.wilson@hospital.com",
    phone: "+1 (555) 456-7890",
    specialization: "Dermatology",
    experience: "8 years",
    status: "inactive",
    patients: 29,
    location: "Building A, Floor 1",
  },
  {
    id: 5,
    name: "Dr. Robert Brown",
    email: "robert.brown@hospital.com",
    phone: "+1 (555) 567-8901",
    specialization: "Neurology",
    experience: "20 years",
    status: "active",
    patients: 41,
    location: "Building B, Floor 3",
  },
]

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState(mockDoctors)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    location: "",
  })

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddDoctor = () => {
    const doctor = {
      id: doctors.length + 1,
      ...newDoctor,
      status: "active",
      patients: 0,
    }
    setDoctors([...doctors, doctor])
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      experience: "",
      location: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteDoctor = (id: number) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id))
  }

  const toggleDoctorStatus = (id: number) => {
    setDoctors(
      doctors.map((doctor) =>
        doctor.id === id ? { ...doctor, status: doctor.status === "active" ? "inactive" : "active" } : doctor,
      ),
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Doctors Management</h1>
              <p className="text-gray-600">Manage doctor profiles and information</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{doctors.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{doctors.filter((d) => d.status === "active").length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{new Set(doctors.map((d) => d.specialization)).size}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{doctors.reduce((sum, d) => sum + d.patients, 0)}</div>
                </CardContent>
              </Card>
            </div>

            {/* Actions Bar */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search doctors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Doctor
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Doctor</DialogTitle>
                        <DialogDescription>Enter the doctor's information to add them to the system.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={newDoctor.name}
                            onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                            placeholder="Dr. John Doe"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newDoctor.email}
                            onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                            placeholder="john.doe@hospital.com"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={newDoctor.phone}
                            onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Select
                            value={newDoctor.specialization}
                            onValueChange={(value) => setNewDoctor({ ...newDoctor, specialization: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Cardiology">Cardiology</SelectItem>
                              <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                              <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                              <SelectItem value="Dermatology">Dermatology</SelectItem>
                              <SelectItem value="Neurology">Neurology</SelectItem>
                              <SelectItem value="General Medicine">General Medicine</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="experience">Experience</Label>
                          <Input
                            id="experience"
                            value={newDoctor.experience}
                            onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
                            placeholder="10 years"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={newDoctor.location}
                            onChange={(e) => setNewDoctor({ ...newDoctor, location: e.target.value })}
                            placeholder="Building A, Floor 2"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddDoctor}>Add Doctor</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Doctors Table */}
            <Card>
              <CardHeader>
                <CardTitle>Doctors List</CardTitle>
                <CardDescription>
                  Showing {filteredDoctors.length} of {doctors.length} doctors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Patients</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDoctors.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback>
                                {doctor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{doctor.name}</div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {doctor.email}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {doctor.phone}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {doctor.location}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{doctor.specialization}</Badge>
                        </TableCell>
                        <TableCell>{doctor.experience}</TableCell>
                        <TableCell>{doctor.patients}</TableCell>
                        <TableCell>
                          <Badge variant={doctor.status === "active" ? "default" : "secondary"}>{doctor.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => toggleDoctorStatus(doctor.id)}>
                              {doctor.status === "active" ? "Deactivate" : "Activate"}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteDoctor(doctor.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
