import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Shield, Stethoscope, User } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">MediCare HMS</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Hospital Management
            <span className="text-blue-600"> System</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Streamline healthcare operations with our comprehensive management system for administrators, doctors, and
            patients.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Admin Control</CardTitle>
              <CardDescription>
                Complete system oversight with user management, reporting, and data analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Manage doctor and patient profiles</li>
                <li>• View all appointments and prescriptions</li>
                <li>• Generate comprehensive reports</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Stethoscope className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Doctor Dashboard</CardTitle>
              <CardDescription>
                Efficient appointment and prescription management for healthcare providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Manage appointment schedules</li>
                <li>• Create and update prescriptions</li>
                <li>• Track patient medicine intake</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <User className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Patient Portal</CardTitle>
              <CardDescription>Easy appointment booking and prescription management for patients</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Book and manage appointments</li>
                <li>• View prescription details</li>
                <li>• Medicine intake reminders</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Access</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login?role=admin">
              <Button size="lg" className="w-full sm:w-auto">
                <Shield className="mr-2 h-5 w-5" />
                Admin Login
              </Button>
            </Link>
            <Link href="/login?role=doctor">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Stethoscope className="mr-2 h-5 w-5" />
                Doctor Login
              </Button>
            </Link>
            <Link href="/login?role=patient">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <User className="mr-2 h-5 w-5" />
                Patient Login
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
