import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, Star, Trophy } from "lucide-react";

interface ProfileStatsProps {
  stats: {
    coursesCompleted: number;
    totalHours: number;
    averageRating: number;
    achievements: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    {
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      label: "Courses Completed",
      value: stats.coursesCompleted,
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      label: "Total Hours",
      value: stats.totalHours,
    },
    {
      icon: <Star className="h-5 w-5 text-primary" />,
      label: "Average Rating",
      value: stats.averageRating,
    },
    {
      icon: <Trophy className="h-5 w-5 text-primary" />,
      label: "Achievements",
      value: stats.achievements,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => (
        <Card key={index} className="border shadow-sm dark:shadow-md dark:shadow-black/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 