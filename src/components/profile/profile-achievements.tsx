import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, Medal, GraduationCap, Award } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: "book" | "star" | "medal";
}

interface NextAchievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: "graduation" | "award";
}

interface ProfileAchievementsProps {
  earnedAchievements: Achievement[];
  nextAchievements: NextAchievement[];
}

export function ProfileAchievements({ earnedAchievements, nextAchievements }: ProfileAchievementsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "book":
        return <BookOpen className="h-6 w-6 text-primary" />;
      case "star":
        return <Star className="h-6 w-6 text-primary" />;
      case "medal":
        return <Medal className="h-6 w-6 text-primary" />;
      case "graduation":
        return <GraduationCap className="h-6 w-6 text-muted-foreground" />;
      case "award":
        return <Award className="h-6 w-6 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card className="border shadow-sm dark:shadow-md dark:shadow-black/10">
          <CardHeader className="bg-muted/10 dark:bg-muted/5 border-b">
            <CardTitle className="text-lg font-medium">
              Earned Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {earnedAchievements.map((achievement) => (
                <div key={achievement.id} className="p-4 sm:p-5 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/5 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                    {getIcon(achievement.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="font-medium">{achievement.title}</h3>
                      <Badge
                        variant="outline"
                        className="text-xs sm:text-xs self-start sm:self-auto"
                      >
                        {achievement.date}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="border shadow-sm dark:shadow-md dark:shadow-black/10">
          <CardHeader className="bg-muted/10 dark:bg-muted/5 border-b">
            <CardTitle className="text-lg font-medium">
              Next Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {nextAchievements.map((achievement) => (
                <div key={achievement.id} className="p-4 sm:p-5 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted/40 dark:bg-muted/20 flex items-center justify-center flex-shrink-0">
                    {getIcon(achievement.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h3 className="font-medium">{achievement.title}</h3>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((achievement.progress / achievement.total) * 100)}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-muted dark:bg-muted/50 rounded-full h-2 overflow-hidden mb-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
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