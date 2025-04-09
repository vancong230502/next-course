'use client';

import {
  BarChart3,
  BookOpen,
  Calendar,
  ChevronUp,
  DollarSign,
  GraduationCap,
  PlusCircle,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Courses',
      value: '12',
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      growth: '20% from last month',
    },
    {
      title: 'Total Students',
      value: '235',
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      growth: '180% from last month',
    },
    {
      title: 'Active Students',
      value: '150',
      icon: <GraduationCap className="h-4 w-4 text-muted-foreground" />,
      growth: '12% from last month',
    },
    {
      title: 'Revenue',
      value: '$12,234',
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      growth: '19% from last month',
    },
  ];

  const activities = [
    {
      title: 'New student enrolled',
      time: '2 hours ago',
    },
    {
      title: 'Course updated: JavaScript Basics',
      time: '5 hours ago',
    },
    {
      title: 'Student completed: UX Design 101',
      time: '1 day ago',
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4">
      {/* Header Section */}
      <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor your courses and student activities</p>
        </div>
        <Button className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/10">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent className="py-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center pt-1 text-xs text-green-500 font-medium">
                <ChevronUp className="h-3 w-3 mr-1" />
                <span>{stat.growth}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Student Enrollment Chart Placeholder */}
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

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {activities.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border-b pb-3 last:border-0"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
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
