"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusCircle, Clock, Users, BookOpen, DollarSign, ChevronUp, BarChart3, Calendar, GraduationCap } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const { isAdmin, isStudent } = useAuth();

  return (
    <div className="py-8">
      {isAdmin && <AdminDashboard />}
      {isStudent && <StudentDashboard />}
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="container mx-auto max-w-7xl px-4">
      {/* Header Section */}
      <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your courses and student activities
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/10">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center pt-1 text-xs text-green-500 font-medium">
              <ChevronUp className="h-3 w-3 mr-1" /> 
              <span>20% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/10">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">235</div>
            <div className="flex items-center pt-1 text-xs text-green-500 font-medium">
              <ChevronUp className="h-3 w-3 mr-1" /> 
              <span>180% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/10">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">150</div>
            <div className="flex items-center pt-1 text-xs text-green-500 font-medium">
              <ChevronUp className="h-3 w-3 mr-1" /> 
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/10">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">$12,234</div>
            <div className="flex items-center pt-1 text-xs text-green-500 font-medium">
              <ChevronUp className="h-3 w-3 mr-1" /> 
              <span>19% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Student Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 border-b pb-3 last:border-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New student enrolled</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StudentDashboard() {
  const courses = [
    { 
      id: 1, 
      title: "Introduction to React", 
      progress: 75, 
      nextLesson: "React Hooks",
      duration: "45 min",
      instructor: "John Doe"
    },
    { 
      id: 2, 
      title: "Advanced JavaScript", 
      progress: 30, 
      nextLesson: "Promises and Async/Await",
      duration: "60 min",
      instructor: "Jane Smith"
    },
    { 
      id: 3, 
      title: "CSS Fundamentals", 
      progress: 90, 
      nextLesson: "Flexbox Layout",
      duration: "30 min",
      instructor: "Mark Johnson"
    }
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Learning Dashboard</h1>
        <p className="text-muted-foreground">
          Track your progress and continue learning
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/10">
            <CardTitle className="text-sm font-medium">Courses In Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/10">
            <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/10">
            <CardTitle className="text-sm font-medium">Hours Studied</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">24.5 hours</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Section */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{course.title}</h3>
                    <Button variant="outline" size="sm" className="h-8">
                      Resume
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress: {course.progress}%</span>
                    <span className="text-muted-foreground">Instructor: {course.instructor}</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary font-medium">Next: {course.nextLesson}</span>
                    <span className="text-muted-foreground">{course.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">Course Title {i}</h3>
                    <p className="text-sm text-muted-foreground mb-3">Description of the course content and what you will learn.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">8 hours</span>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 