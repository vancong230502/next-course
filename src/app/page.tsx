"use client";

import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

// Mock data - Thay thế bằng API call thực tế
const courses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, MongoDB and more!",
    thumbnail: "https://picsum.photos/seed/course1/800/450",
    instructor: "John Doe",
    rating: 4.8,
    price: 49.99,
    category: "Web Development",
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Master Python programming and data analysis with real-world projects",
    thumbnail: "https://picsum.photos/seed/course2/800/450",
    instructor: "Jane Smith",
    rating: 4.7,
    price: 39.99,
    category: "Data Science",
  },
  {
    id: "3",
    title: "Mobile App Development with Flutter",
    description: "Build beautiful cross-platform apps with Flutter and Dart",
    thumbnail: "https://picsum.photos/seed/course3/800/450",
    instructor: "Mike Johnson",
    rating: 4.9,
    price: 59.99,
    category: "Mobile Development",
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    description: "Learn the basics of machine learning and AI",
    thumbnail: "https://picsum.photos/seed/course4/800/450",
    instructor: "Sarah Wilson",
    rating: 4.6,
    price: 0,
    category: "AI & ML",
  },
  // Thêm nhiều khóa học khác...
];

const categories = [
  "All",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "AI & ML",
  "Design",
  "Business",
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Learn New Skills
              <br />
              <span className="text-primary">Anytime, Anywhere</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover thousands of courses taught by industry experts and start learning today.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <Button variant="ghost" className="gap-2 cursor-pointer" asChild>
              <Link href="/courses">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold">What Our Students Say</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border p-6">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="mt-4 text-muted-foreground">
                  "This platform has completely transformed my learning experience. The courses are well-structured and the instructors are amazing!"
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10" />
                  <div>
                    <div className="font-medium">Student Name</div>
                    <div className="text-sm text-muted-foreground">Web Development Student</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
