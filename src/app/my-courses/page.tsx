"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function MyCoursesPage() {
  const { isAuthenticated } = useAuth();

  const myCourses = [
    { 
      id: 1, 
      title: "Introduction to React", 
      progress: 75, 
      instructor: "John Doe",
      category: "Web Development",
      level: "Beginner",
      duration: "8 hours",
      lessonsCompleted: 6,
      totalLessons: 8
    },
    { 
      id: 2, 
      title: "Advanced JavaScript", 
      progress: 30, 
      instructor: "Jane Smith",
      category: "Programming",
      level: "Advanced",
      duration: "10 hours",
      lessonsCompleted: 3,
      totalLessons: 12
    },
    { 
      id: 3, 
      title: "CSS Fundamentals", 
      progress: 90, 
      instructor: "Mark Johnson",
      category: "Web Design",
      level: "Beginner",
      duration: "6 hours",
      lessonsCompleted: 9,
      totalLessons: 10
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Access Restricted</h1>
            <p className="text-muted-foreground">
              You need to be logged in to view your courses. Please sign in to continue.
            </p>
          </div>
          <Link href="/login">
            <Button size="lg" className="w-full">
              Sign in to continue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">
          Track and continue your enrolled courses
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/10">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">{myCourses.length}</div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/10">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">
              {myCourses.filter(course => course.progress > 0 && course.progress < 100).length}
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/10">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">
              {myCourses.filter(course => course.progress === 100).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="aspect-video bg-muted"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <Badge variant={course.progress === 100 ? "default" : "secondary"}>
                  {course.progress === 100 ? "Completed" : "In Progress"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {course.lessonsCompleted} of {course.totalLessons} lessons completed
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{course.level}</Badge>
                <Badge variant="outline">{course.category}</Badge>
                <Badge variant="outline">{course.duration}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-muted-foreground">Instructor: </span>
                  <span>{course.instructor}</span>
                </div>
                <Button variant="outline" size="sm">
                  Continue
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 