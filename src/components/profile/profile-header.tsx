import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Coins } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  totalPoints: number;
  level: string;
}

export function ProfileHeader({ name, totalPoints, level }: ProfileHeaderProps) {
  const getCrownColor = () => {
    switch (level.toLowerCase()) {
      case "bronze":
        return "text-amber-600";
      case "silver":
        return "text-slate-400";
      case "gold":
        return "text-yellow-500";
      case "platinum":
        return "text-blue-400";
      case "diamond":
        return "text-cyan-300";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/15 dark:to-primary/10 border-b">
      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 sm:gap-6">
          <div className="relative flex flex-col items-center">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-background shadow-sm">
              <AvatarImage src="/avatars/01.png" alt="Profile" />
              <AvatarFallback className="text-xl bg-primary/5">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-1 -right-1 bg-background dark:bg-gray-800 rounded-full p-1.5 shadow-sm border border-border">
              <Crown className={`h-5 w-5 ${getCrownColor()}`} />
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start mt-1 sm:mt-3">
            <h1 className="text-xl sm:text-2xl font-bold">{name}</h1>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Coins className="h-3.5 w-3.5 text-primary" />
                <span>Total Points: {totalPoints}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 