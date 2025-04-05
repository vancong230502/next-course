"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Star, Clock, Users, BookOpen, ArrowRight, Search, Filter, SlidersHorizontal, X, Trash2 } from "lucide-react";
import { 
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  originalPrice: number;
  duration: string;
  level: string;
  category: string;
  tags: string[];
  image: string;
};

// Define price ranges
type PriceRange = {
  id: string;
  label: string;
  min: number;
  max: number;
}

const priceRanges: PriceRange[] = [
  { id: 'free', label: 'Free', min: 0, max: 0 },
  { id: 'under-50', label: 'Under $50', min: 0.01, max: 50 },
  { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
  { id: '100-150', label: '$100 - $150', min: 100, max: 150 },
  { id: 'over-150', label: 'Over $150', min: 150, max: Infinity }
];

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Design",
  "Marketing",
  "Business",
  "Photography",
];

const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sortOption, setSortOption] = useState("default");

  // Mock data for courses
  const allCourses: Course[] = [
    {
      id: "1",
      title: "Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, React, Node and MongoDB to become a full-stack web developer.",
      instructor: "John Doe",
      rating: 4.8,
      students: 12500,
      price: 89.99,
      originalPrice: 199.99,
      duration: "42 hours",
      level: "All Levels",
      category: "Web Development",
      tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      image: "https://placehold.co/600x400/3498db/ffffff",
    },
    {
      id: "2",
      title: "Advanced JavaScript Concepts",
      description: "Deep dive into advanced JavaScript concepts like closures, prototypes, and asynchronous programming.",
      instructor: "Jane Smith",
      rating: 4.9,
      students: 8300,
      price: 69.99,
      originalPrice: 129.99,
      duration: "24 hours",
      level: "Advanced",
      category: "Web Development",
      tags: ["JavaScript", "ES6", "Async/Await", "Functional Programming"],
      image: "https://placehold.co/600x400/e74c3c/ffffff",
    },
    {
      id: "3",
      title: "UI/UX Design Fundamentals",
      description: "Master the principles of user interface and user experience design for digital products.",
      instructor: "Sarah Johnson",
      rating: 4.7,
      students: 6200,
      price: 59.99,
      originalPrice: 149.99,
      duration: "18 hours",
      level: "Beginner",
      category: "Design",
      tags: ["UI", "UX", "Figma", "Wireframing", "Prototyping"],
      image: "https://placehold.co/600x400/9b59b6/ffffff",
    },
    {
      id: "4",
      title: "Machine Learning with Python",
      description: "Learn the fundamentals of machine learning and implement algorithms using Python.",
      instructor: "Michael Chen",
      rating: 4.6,
      students: 4800,
      price: 79.99,
      originalPrice: 169.99,
      duration: "32 hours",
      level: "Intermediate",
      category: "Data Science",
      tags: ["Python", "Machine Learning", "Neural Networks", "Data Science"],
      image: "https://placehold.co/600x400/27ae60/ffffff",
    },
    {
      id: "5",
      title: "iOS App Development with Swift",
      description: "Build iOS apps from scratch using Swift and Xcode.",
      instructor: "Emily Davis",
      rating: 4.7,
      students: 5300,
      price: 99.99,
      originalPrice: 179.99,
      duration: "38 hours",
      level: "Intermediate",
      category: "Mobile Development",
      tags: ["iOS", "Swift", "Xcode", "Mobile Development"],
      image: "https://placehold.co/600x400/f39c12/ffffff",
    },
    {
      id: "6",
      title: "Digital Marketing Mastery",
      description: "Comprehensive guide to online marketing strategies and techniques.",
      instructor: "Robert Wilson",
      rating: 4.5,
      students: 7800,
      price: 49.99,
      originalPrice: 129.99,
      duration: "22 hours",
      level: "All Levels",
      category: "Marketing",
      tags: ["SEO", "Social Media", "Content Marketing", "Analytics"],
      image: "https://placehold.co/600x400/1abc9c/ffffff",
    },
    {
      id: "7",
      title: "Photography Masterclass",
      description: "Learn professional photography techniques from composition to post-processing.",
      instructor: "Lisa Brown",
      rating: 4.8,
      students: 9200,
      price: 69.99,
      originalPrice: 149.99,
      duration: "26 hours",
      level: "Beginner",
      category: "Photography",
      tags: ["Photography", "Lighting", "Composition", "Editing"],
      image: "https://placehold.co/600x400/e67e22/ffffff",
    },
    {
      id: "8",
      title: "Entrepreneurship: Start Your Business",
      description: "Step-by-step guide to launching and growing a successful business.",
      instructor: "David Thompson",
      rating: 4.6,
      students: 6500,
      price: 79.99,
      originalPrice: 159.99,
      duration: "28 hours",
      level: "All Levels",
      category: "Business",
      tags: ["Entrepreneurship", "Business Plan", "Marketing", "Finance"],
      image: "https://placehold.co/600x400/34495e/ffffff",
    },
    {
      id: "9",
      title: "Free Introduction to Programming",
      description: "A free course to get started with programming basics.",
      instructor: "Alex Johnson",
      rating: 4.3,
      students: 15200,
      price: 0,
      originalPrice: 49.99,
      duration: "6 hours",
      level: "Beginner",
      category: "Web Development",
      tags: ["Programming", "Basics", "Free"],
      image: "https://placehold.co/600x400/7f8c8d/ffffff",
    },
    {
      id: "10",
      title: "Advanced Data Science",
      description: "Deep exploration of advanced data science techniques and big data.",
      instructor: "Emma Watson",
      rating: 4.9,
      students: 3200,
      price: 199.99,
      originalPrice: 299.99,
      duration: "48 hours",
      level: "Advanced",
      category: "Data Science",
      tags: ["Big Data", "Machine Learning", "Statistics", "Python"],
      image: "https://placehold.co/600x400/16a085/ffffff",
    },
  ];

  // Helper function to check if course price is within selected price ranges
  const matchesPriceRanges = (price: number, selectedRanges: string[]) => {
    if (selectedRanges.length === 0) return true;
    
    return selectedRanges.some(rangeId => {
      const range = priceRanges.find(r => r.id === rangeId);
      if (!range) return false;
      return price >= range.min && price <= range.max;
    });
  };

  // Filter courses based on search query, price ranges, categories, and levels
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPrice = matchesPriceRanges(course.price, selectedPriceRanges);

    const matchesCategory = selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);

    const matchesLevel = selectedLevels.length === 0 ||
      selectedLevels.includes(course.level);

    return matchesSearch && matchesPrice && matchesCategory && matchesLevel;
  });

  // Sort courses based on selected option
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "name-a-z":
        return a.title.localeCompare(b.title);
      case "name-z-a":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Get active filter count
  const activeFilterCount = selectedPriceRanges.length + selectedCategories.length + selectedLevels.length;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    setSearchQuery(query);
  };

  const handlePriceRangeChange = (rangeId: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(rangeId)
        ? prev.filter(r => r !== rangeId)
        : [...prev, rangeId]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const clearFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSearchQuery("");
  };

  return (
    <div className="container mx-auto max-w-7xl py-4 sm:py-6 md:py-8 px-4">
      {/* Header - Show search results if query exists */}
      {searchQuery && (
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Kết quả tìm kiếm cho từ khoá '{searchQuery}'
          </h1>
        </div>
      )}

      {/* Filters Section */}
      <div className="mb-6 md:mb-8 flex flex-col gap-4 sm:gap-6 md:flex-row">
        {/* Mobile Filter Button */}
        <div className="md:hidden flex items-center gap-2 w-full">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1 flex items-center justify-center h-9 px-3 gap-2 cursor-pointer">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[75%] sm:w-[65%] overflow-y-auto p-0">
              <SheetHeader className="p-6 pb-2">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-left text-sm">Filter Courses</SheetTitle>
                  <SheetClose className="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary cursor-pointer">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </div>
                <SheetDescription className="text-left">
                  Refine your search results
                </SheetDescription>
              </SheetHeader>
              <div className="px-6 py-4 space-y-6 border-t">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Price Range</h3>
                  <div className="space-y-3 pl-1">
                    {priceRanges.map((range) => (
                      <div key={range.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={`mobile-price-${range.id}`}
                          checked={selectedPriceRanges.includes(range.id)}
                          onCheckedChange={() => handlePriceRangeChange(range.id)}
                          className="h-4 w-4 cursor-pointer"
                        />
                        <Label
                          htmlFor={`mobile-price-${range.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {range.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Categories</h3>
                  <div className="grid grid-cols-1 gap-3 pl-1">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-3">
                        <Checkbox
                          id={`mobile-category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                          className="h-4 w-4 cursor-pointer"
                        />
                        <Label
                          htmlFor={`mobile-category-${category}`}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Level</h3>
                  <div className="grid grid-cols-1 gap-3 pl-1">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center space-x-3">
                        <Checkbox
                          id={`mobile-level-${level}`}
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={() => handleLevelChange(level)}
                          className="h-4 w-4 cursor-pointer"
                        />
                        <Label
                          htmlFor={`mobile-level-${level}`}
                          className="text-sm cursor-pointer"
                        >
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="">
                  <Button variant="outline" 
                    className="w-full h-9 text-sm font-medium flex justify-center items-center cursor-pointer" 
                    onClick={() => {
                      clearFilters();
                    }}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Mobile Sort */}
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="flex-1 h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="w-[230px]" position="popper" side="bottom" align="end">
              <SelectItem value="default">Sort by: Default</SelectItem>
              <SelectItem value="price-low-high">Sort by price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Sort by price: High to Low</SelectItem>
              <SelectItem value="name-a-z">Sort by name: A to Z</SelectItem>
              <SelectItem value="name-z-a">Sort by name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Applied Filters (Mobile only) */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:hidden">
          {selectedLevels.map(level => (
            <Badge key={`filter-${level}`} variant="secondary" className="flex items-center py-1 px-2 gap-1 whitespace-nowrap">
              {level}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleLevelChange(level)}
              />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="text-xs h-7 px-2 cursor-pointer" onClick={clearFilters}>
            Clear all {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
          </Button>
        </div>
      </div>

      {/* Main Content with Sidebar and Courses */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-8">
        {/* Sidebar Filters (Desktop only) */}
        <div className="hidden md:block">
          <div className="space-y-6 sticky top-8 w-full px-2">
            <h3 className="text-lg font-medium mb-4">Search Filters</h3>

            <Accordion type="multiple" defaultValue={["price", "category", "level"]} className="w-full">
              <AccordionItem value="price">
                <AccordionTrigger className="py-3 text-sm font-medium cursor-pointer">Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-2 py-2">
                    {priceRanges.map((range) => (
                      <div key={range.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={`price-${range.id}`}
                          checked={selectedPriceRanges.includes(range.id)}
                          onCheckedChange={() => handlePriceRangeChange(range.id)}
                          className="h-4 w-4 cursor-pointer"
                        />
                        <Label
                          htmlFor={`price-${range.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {range.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="category">
                <AccordionTrigger className="py-3 text-sm font-medium cursor-pointer">Category</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-2 py-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-3">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                          className="h-4 w-4 cursor-pointer"
                        />
                        <Label
                          htmlFor={`category-${category}`}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="level">
                <AccordionTrigger className="py-3 text-sm font-medium cursor-pointer">Level</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-2 py-2">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center space-x-3">
                        <Checkbox
                          id={`level-${level}`}
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={() => handleLevelChange(level)}
                          className="h-4 w-4 cursor-pointer"
                        />
                        <Label
                          htmlFor={`level-${level}`}
                          className="text-sm cursor-pointer"
                        >
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button 
              variant="outline" 
              size="default" 
              className="w-full mt-2 text-sm font-medium cursor-pointer flex items-center justify-center" 
              onClick={clearFilters}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        <div>
          {/* Result count and sorting */}
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
            </div>
            
            {/* Desktop Sort */}
            <div className="hidden md:block">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="w-[230px]" position="popper" side="bottom" align="end">
                  <SelectItem value="default">Sort by: Default</SelectItem>
                  <SelectItem value="price-low-high">Sort by price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Sort by price: High to Low</SelectItem>
                  <SelectItem value="name-a-z">Sort by name: A to Z</SelectItem>
                  <SelectItem value="name-z-a">Sort by name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        
          {filteredCourses.length === 0 ? (
            <div className="text-center py-10 bg-muted/30 rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-2">No courses found</h2>
              <p className="text-sm text-muted-foreground mb-5">Try adjusting your search or filter criteria</p>
              <Button 
                variant="outline" 
                size="default" 
                className="font-medium flex justify-center items-center mx-auto cursor-pointer" 
                onClick={clearFilters}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sortedCourses.map((course) => (
                <Link href={`/courses/${course.id}`} key={course.id} className="block transition-transform hover:-translate-y-1 duration-300 cursor-pointer">
                  <Card className="h-full overflow-hidden flex flex-col border-muted/60 hover:border-primary/20 transition-colors">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardHeader className="pb-2 pt-3 px-3 sm:px-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="line-clamp-2 text-base sm:text-lg">{course.title}</CardTitle>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">by {course.instructor}</p>
                    </CardHeader>
                    <CardContent className="py-2 px-3 sm:px-4 flex-grow">
                      <div className="flex items-center text-xs sm:text-sm mb-2">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-medium mr-1">{course.rating}</span>
                        <span className="text-muted-foreground">({course.students.toLocaleString()})</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                          {course.level}
                        </Badge>
                        <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                          {course.category}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-2">
                        <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">{course.description}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-3 pb-3 px-3 sm:px-4">
                      <div className="flex w-full justify-between items-center">
                        <div>
                          {course.price === 0 ? (
                            <p className="text-base sm:text-lg font-bold text-green-600">Free</p>
                          ) : (
                            <>
                              <p className="text-base sm:text-lg font-bold">${course.price.toFixed(2)}</p>
                              <p className="text-xs sm:text-sm text-muted-foreground line-through">${course.originalPrice.toFixed(2)}</p>
                            </>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="ml-2 h-8 p-0 sm:px-2 text-xs sm:text-sm cursor-pointer">
                          View
                          <ArrowRight className="ml-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 