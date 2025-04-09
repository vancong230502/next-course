"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileNavigation } from "@/components/profile/profile-navigation";
import { ProfileInformation } from "@/components/profile/profile-information";
import { ProfileSocial } from "@/components/profile/profile-social";
import { ProfileStats } from "@/components/profile/profile-stats";
import { ProfilePoints } from "@/components/profile/profile-points";
import { ProfileAchievements } from "@/components/profile/profile-achievements";
import { ProfileSettings } from "@/components/profile/profile-settings";

type SectionType = "information" | "points" | "settings" | "achievements";

export default function ProfilePage() {
  const router = useRouter();
  const { role, user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState<SectionType>("information");

  // User information state
  const [profileData, setProfileData] = useState({
    name: user?.fullName || "Nguyen Van A",
    email: user?.email || "user@example.com",
    phone: "0987654321",
    address: "Ho Chi Minh City, Vietnam",
    bio: "I am a passionate developer with interests in web development, mobile applications, and AI.",
    birthdate: "01-01-1990",
    avaiablePoints: 500,
    totalPoints: 2000,
    level: "Gold",
    languages: ["English", "Vietnamese"],
    interests: ["Programming", "AI", "Mobile Development"],
    github: "github.com/nguyenvana",
    linkedin: "linkedin.com/in/nguyenvana",
    twitter: "twitter.com/nguyenvana",
    website: "nguyenvana.dev",
  });

  // Mock statistics data
  const statsData = {
    coursesCompleted: 12,
    totalHours: 48,
    averageRating: 4.8,
    achievements: 15,
  };

  // Mock points data
  const pointsData = {
    totalPoints: profileData.totalPoints,
    availablePoints: profileData.avaiablePoints,
    transactions: [
      {
        id: "1",
        description: "Completed Course: Introduction to Next.js",
        date: "2024-03-15",
        points: 100,
      },
      {
        id: "2",
        description: "Achievement Unlocked: First Course",
        date: "2024-03-10",
        points: 50,
      },
      {
        id: "3",
        description: "Points Redeemed: Premium Course",
        date: "2024-03-05",
        points: -200,
      },
    ],
  };

  // Mock achievements data
  const achievementsData = {
    earnedAchievements: [
      {
        id: "1",
        title: "First Course Completed",
        description: "Completed your first course on the platform",
        date: "2024-03-10",
        icon: "book" as const,
      },
      {
        id: "2",
        title: "Perfect Score",
        description: "Achieved 100% in a course assessment",
        date: "2024-03-12",
        icon: "star" as const,
      },
    ],
    nextAchievements: [
      {
        id: "1",
        title: "Course Master",
        description: "Complete 10 courses",
        progress: 8,
        total: 10,
        icon: "graduation" as const,
      },
      {
        id: "2",
        title: "Social Butterfly",
        description: "Connect with 5 other learners",
        progress: 3,
        total: 5,
        icon: "award" as const,
      },
    ],
  };

  // Mock settings data
  const settingsData = {
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public" as const,
      showEmail: false,
      showActivity: true,
    },
  };

  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.fullName || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  // Handle profile update
  const handleProfileUpdate = (data: any) => {
    setProfileData(prev => ({
      ...prev,
      ...data
    }));
  };

  // Handle social update
  const handleSocialUpdate = (data: any) => {
    setProfileData(prev => ({
      ...prev,
      ...data
    }));
  };

  // Handle settings update
  const handleSettingsUpdate = (newSettings: any) => {
    console.log("Settings updated:", newSettings);
    // Here you would typically update the settings in your backend
  };

  // Add logout handler
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!role) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Access Restricted
            </h1>
            <p className="text-muted-foreground">
              You need to be logged in to view your profile. Please sign in to
              continue.
            </p>
          </div>
          <Button
            size="lg"
            className="w-full cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Sign in to continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <ProfileHeader 
        name={profileData.name}
        totalPoints={profileData.totalPoints}
        level={profileData.level}
      />

      <ProfileNavigation 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8 space-y-6">
        <ProfileStats stats={statsData} />

        {activeSection === "information" && (
          <div className="grid gap-6 md:grid-cols-3">
            <ProfileInformation 
              profileData={profileData}
              onUpdate={handleProfileUpdate}
            />
            <ProfileSocial 
              socialData={{
                github: profileData.github,
                linkedin: profileData.linkedin,
                twitter: profileData.twitter,
                website: profileData.website,
              }}
              onUpdate={handleSocialUpdate}
            />
          </div>
        )}

        {activeSection === "points" && (
          <ProfilePoints {...pointsData} />
        )}

        {activeSection === "achievements" && (
          <ProfileAchievements {...achievementsData} />
        )}

        {activeSection === "settings" && (
          <ProfileSettings
            settings={settingsData}
            onUpdateSettings={handleSettingsUpdate}
          />
        )}
      </div>

      {/* Add CSS for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @media (prefers-color-scheme: dark) {
          body.dark {
            background-color: #09090b;
            color: #fafafa;
          }
        }
      `}</style>
    </div>
  );
}
