'use client';

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function UserDashboard() {
  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      progress: 75,
      nextLesson: "React Hooks",
      duration: "45 min",
      instructor: "John Doe",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      progress: 30,
      nextLesson: "Promises and Async/Await",
      duration: "60 min",
      instructor: "Jane Smith",
    },
    {
      id: 3,
      title: "CSS Fundamentals",
      progress: 90,
      nextLesson: "Flexbox Layout",
      duration: "30 min",
      instructor: "Mark Johnson",
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Learning Dashboard</h1>
        <p className="text-muted-foreground">Track your progress and continue learning</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between bg-muted/10 pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Courses In Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between bg-muted/10 pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between bg-muted/10 pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Hours Studied</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">24.5 hours</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6">
        {/* Continue Learning */}
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base">{course.title}</h3>
                    <Button variant="outline" size="sm" className="h-8">
                      Resume
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Progress: {course.progress}%</span>
                    <span>Instructor: {course.instructor}</span>
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

        {/* Recommended Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border">
                  <div className="aspect-video bg-muted" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">Course Title {i}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn the basics and advanced concepts in this course.
                    </p>
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
