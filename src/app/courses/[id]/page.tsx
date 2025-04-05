"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Lock,
  Play,
  Pause,
  Clock,
  Users,
  BookOpen,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Settings,
  Subtitles,
  Expand,
  Shrink,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "@/styles/tooltip-custom.css";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  price: number;
  thumbnail: string;
  category: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    isPreview: boolean;
  }[];
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Video controls state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // 2 minutes video mock
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isVolumeTooltipOpen, setIsVolumeTooltipOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [videoQuality, setVideoQuality] = useState("1080p");
  const [settingsMenuTab, setSettingsMenuTab] = useState<"speed" | "quality" | "main">("main");
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      setIsControlsVisible(true);
      timeout = setTimeout(() => {
        if (isPlaying) {
          setIsControlsVisible(false);
        }
      }, 3000);
    };

    if (videoContainerRef.current) {
      videoContainerRef.current.addEventListener("mousemove", resetTimeout);
      videoContainerRef.current.addEventListener("mouseenter", resetTimeout);
      videoContainerRef.current.addEventListener("mouseleave", () => {
        if (isPlaying) {
          setIsControlsVisible(false);
        }
      });
    }

    resetTimeout();

    return () => {
      clearTimeout(timeout);
      if (videoContainerRef.current) {
        videoContainerRef.current.removeEventListener(
          "mousemove",
          resetTimeout
        );
        videoContainerRef.current.removeEventListener(
          "mouseenter",
          resetTimeout
        );
        videoContainerRef.current.removeEventListener("mouseleave", () => {
          if (isPlaying) {
            setIsControlsVisible(false);
          }
        });
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    // Handle clicking outside settings menu to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target as Node) &&
        // Check if the click wasn't on the settings button
        !(event.target as HTMLElement).closest('[data-settings-button="true"]')
      ) {
        setIsSettingsMenuOpen(false);
        setSettingsMenuTab("main");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mock data - replace with actual data fetching
  const course: Course = {
    id: id as string,
    title: "Advanced React Development",
    description:
      "Master React with this comprehensive course. Learn advanced concepts, best practices, and build real-world applications.",
    instructor: "John Doe",
    rating: 4.8,
    students: 1200,
    duration: "12 hours",
    level: "Advanced",
    price: 99.99,
    thumbnail: "/course-thumbnail.jpg",
    category: "Web Development",
    lessons: [
      {
        id: "1",
        title: "Introduction to Advanced React",
        duration: "45 min",
        isPreview: true,
      },
      {
        id: "2",
        title: "React Hooks Deep Dive",
        duration: "60 min",
        isPreview: false,
      },
      {
        id: "3",
        title: "State Management with Context API",
        duration: "75 min",
        isPreview: false,
      },
      {
        id: "4",
        title: "Performance Optimization",
        duration: "90 min",
        isPreview: false,
      },
    ],
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (videoContainerRef.current) {
      if (!isFullscreen) {
        if (videoContainerRef.current.requestFullscreen) {
          videoContainerRef.current.requestFullscreen();
        }
        setIsFullscreen(true);
        toast("Fullscreen Mode", {
          description: "Press ESC to exit fullscreen mode",
          duration: 3000,
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleNextLesson = () => {
    if (selectedLesson < course.lessons.length - 1) {
      setSelectedLesson(selectedLesson + 1);
    }
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Video Player */}
            <div
              ref={videoContainerRef}
              className="relative rounded-lg overflow-hidden bg-black cursor-pointer"
            >
              <div
                className={`aspect-video bg-black overflow-hidden flex items-center justify-center`}
              >
                {!isPlaying && (
                  <Play className="h-8 w-8 sm:h-8 sm:w-8 text-white opacity-50" />
                )}
              </div>
              
              {/* Fullscreen double-click handler overlay - covers only the main video area, not controls */}
              <div 
                className="absolute top-0 left-0 right-0 bottom-[76px] sm:bottom-[84px] z-10"
                onDoubleClick={toggleFullscreen}
              />

              {/* Video Controls - always visible on hover or pause */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isControlsVisible || !isPlaying ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Top gradient for video title */}
                <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-b from-black/70 to-transparent">
                  <div className="p-2 sm:p-4">
                    <h3 className="text-white text-sm sm:text-base font-medium truncate">
                      {course.lessons[selectedLesson].title}
                    </h3>
                  </div>
                </div>

                {/* Bottom controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-4">
                  {/* Progress bar */}
                  <div className="mb-2 sm:mb-4 px-1 sm:px-2">
                    <Slider
                      value={[currentTime]}
                      min={0}
                      max={duration}
                      step={1}
                      onValueChange={(values: number[]) =>
                        setCurrentTime(values[0])
                      }
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Left controls */}
                    <div className="flex items-center gap-0 sm:gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors h-7 w-7 sm:h-9 sm:w-9"
                            onClick={togglePlay}
                          >
                            {isPlaying ? (
                              <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                            ) : (
                              <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium px-3 py-2 shadow-lg rounded-md border border-slate-200 dark:border-slate-700"
                        >
                          {isPlaying ? "Pause" : "Play"}
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors h-7 w-7 sm:h-9 sm:w-9"
                            onClick={handleNextLesson}
                          >
                            <SkipForward className="h-4 w-4 sm:h-5 sm:w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium px-3 py-2 shadow-lg rounded-md border border-slate-200 dark:border-slate-700"
                        >
                          Next Lesson
                        </TooltipContent>
                      </Tooltip>

                      <div className="flex items-center gap-1 sm:gap-2 relative group">
                        <Tooltip open={isVolumeTooltipOpen}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors h-7 w-7 sm:h-9 sm:w-9"
                              onClick={toggleMute}
                              onMouseEnter={() => setIsVolumeTooltipOpen(true)}
                              onMouseLeave={() => {
                                if (!volumeTimeoutRef.current) {
                                  setIsVolumeTooltipOpen(false);
                                }
                              }}
                            >
                              {isMuted || volume === 0 ? (
                                <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                              ) : (
                                <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium px-2 py-2 shadow-lg rounded-md border border-slate-200 dark:border-slate-700 w-[105px] text-center"
                          >
                            {isMuted || volume === 0 ? "Unmute" : `Volume: ${volume}%`}
                          </TooltipContent>
                        </Tooltip>
                        
                        <div className="flex items-center w-0 overflow-hidden transition-all duration-300 group-hover:w-[60px] sm:group-hover:w-[80px] group-focus-within:w-[60px] sm:group-focus-within:w-[80px] h-8 sm:h-10">
                          <div 
                            className="relative w-[60px] sm:w-[80px]"
                            onMouseEnter={() => setIsVolumeTooltipOpen(true)}
                            onMouseLeave={() => {
                              volumeTimeoutRef.current = setTimeout(() => {
                                setIsVolumeTooltipOpen(false);
                                volumeTimeoutRef.current = null;
                              }, 500);
                            }}
                          >
                            <Slider
                              value={[isMuted ? 0 : volume]}
                              min={0}
                              max={100}
                              step={1}
                              onValueChange={(values: number[]) => {
                                setVolume(values[0]);
                                if (values[0] > 0) setIsMuted(false);
                                setIsVolumeTooltipOpen(true);
                                
                                if (volumeTimeoutRef.current) {
                                  clearTimeout(volumeTimeoutRef.current);
                                }
                                
                                volumeTimeoutRef.current = setTimeout(() => {
                                  setIsVolumeTooltipOpen(false);
                                  volumeTimeoutRef.current = null;
                                }, 1000);
                              }}
                              className="cursor-pointer w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-white text-xs sm:text-sm ml-1">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-0 sm:gap-2">
                      {/* Show Subtitles only on desktop */}
                      <div className="hidden md:block">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors h-9 w-9"
                            >
                              <Subtitles className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium px-3 py-2 shadow-lg rounded-md border border-slate-200 dark:border-slate-700"
                          >
                            Subtitles
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      <Tooltip open={isSettingsMenuOpen ? false : undefined}>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            data-settings-button="true"
                            className={`text-white hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors h-7 w-7 sm:h-9 sm:w-9 relative ${isSettingsMenuOpen ? "bg-gray-200/20 dark:bg-gray-800/40" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsSettingsMenuOpen(!isSettingsMenuOpen);
                              if (!isSettingsMenuOpen) {
                                setSettingsMenuTab("main");
                              }
                            }}
                          >
                            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium px-3 py-2 shadow-lg rounded-md border border-slate-200 dark:border-slate-700"
                        >
                          Settings
                        </TooltipContent>
                      </Tooltip>

                      {isSettingsMenuOpen && (
                        <div
                          ref={settingsMenuRef}
                          className="absolute bottom-15 right-4 sm:right-8 w-[200px] sm:w-56 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md shadow-lg border border-slate-200 dark:border-slate-700 z-50 overflow-hidden"
                        >
                          {settingsMenuTab === "main" && (
                            <div className="p-1 space-y-1">
                              <button
                                className="flex items-center justify-between w-full px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm cursor-pointer"
                                onClick={() => setSettingsMenuTab("speed")}
                              >
                                <span>Playback Speed</span>
                                <div className="flex items-center">
                                  <span className="text-xs text-slate-500 dark:text-slate-400 mr-1 sm:mr-2">
                                    {playbackSpeed}x
                                  </span>
                                  <ChevronRight className="h-4 w-4" />
                                </div>
                              </button>
                              <button
                                className="flex items-center justify-between w-full px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm cursor-pointer"
                                onClick={() => setSettingsMenuTab("quality")}
                              >
                                <span>Quality</span>
                                <div className="flex items-center">
                                  <span className="text-xs text-slate-500 dark:text-slate-400 mr-1 sm:mr-2">
                                    {videoQuality}
                                  </span>
                                  <ChevronRight className="h-4 w-4" />
                                </div>
                              </button>
                            </div>
                          )}

                          {settingsMenuTab === "speed" && (
                            <div className="p-1">
                              <button
                                className="flex items-center w-full px-1 py-2 text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm cursor-pointer"
                                onClick={() => {
                                  setSettingsMenuTab("main");
                                }}
                              >
                                <ChevronLeft className="h-4 w-4 mr-1 sm:mr-1.5 flex-shrink-0" />
                                <span className="truncate">Playback Speed</span>
                              </button>
                              <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                              <div className="max-h-[90px] overflow-y-auto">
                                {[0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0].map((speed) => (
                                  <button
                                    key={speed}
                                    className={`flex items-center justify-between w-full mb-1 px-2 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm cursor-pointer ${
                                      playbackSpeed === speed
                                        ? "bg-slate-100 dark:bg-slate-700"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setPlaybackSpeed(speed);
                                      // In a real implementation, you would change the video playback rate here
                                      setSettingsMenuTab("main");
                                    }}
                                  >
                                    <span>{speed === 1.0 ? "Normal" : `${speed}x`}</span>
                                    {playbackSpeed === speed && (
                                      <Check className="h-4 w-4 flex-shrink-0" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {settingsMenuTab === "quality" && (
                            <div className="p-1">
                              <button
                                className="flex items-center w-full px-1 py-2 text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm cursor-pointer"
                                onClick={() => {
                                  setSettingsMenuTab("main");
                                }}
                              >
                                <ChevronLeft className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="truncate">Quality</span>
                              </button>
                              <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                              <div className="max-h-[90px] overflow-y-auto">
                                {["1080p", "720p", "480p", "360p", "Auto"].map((quality) => (
                                  <button
                                    key={quality}
                                    className={`flex items-center justify-between w-full mb-1 px-2 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm cursor-pointer ${
                                      videoQuality === quality
                                        ? "bg-slate-100 dark:bg-slate-700"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setVideoQuality(quality);
                                      // In a real implementation, you would change the video quality here
                                      setSettingsMenuTab("main");
                                    }}
                                  >
                                    <span>{quality}</span>
                                    {videoQuality === quality && (
                                      <Check className="h-4 w-4 flex-shrink-0" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors h-7 w-7 sm:h-9 sm:w-9"
                            onClick={toggleFullscreen}
                          >
                            {isFullscreen ? (
                              <Shrink className="h-4 w-4 sm:h-5 sm:w-5" />
                            ) : (
                              <Expand className="h-4 w-4 sm:h-5 sm:w-5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium px-3 py-2 shadow-lg rounded-md border border-slate-200 dark:border-slate-700"
                        >
                          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold">{course.title}</h1>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">
                    ({course.students} students)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {course.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{course.level}</Badge>
                <Badge variant="secondary">{course.category}</Badge>
              </div>

              <p className="text-muted-foreground">{course.description}</p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button size="lg" className="w-full sm:flex-1">
                  {isEnrolled
                    ? "Continue Learning"
                    : `Enroll Now - $${course.price}`}
                </Button>
                {!isEnrolled && (
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Add to Wishlist
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Course Content */}
            <div className="lg:hidden">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {course.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                          selectedLesson === index
                            ? "bg-primary/10"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedLesson(index)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {lesson.duration}
                            </p>
                          </div>
                        </div>
                        {!isEnrolled && !lesson.isPreview && (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Desktop Course Content */}
          <div className="hidden lg:block lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                        selectedLesson === index
                          ? "bg-primary/10"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedLesson(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {lesson.duration}
                          </p>
                        </div>
                      </div>
                      {!isEnrolled && !lesson.isPreview && (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
