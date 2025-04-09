import { Button } from "@/components/ui/button";
import { Info, Coins, Trophy, Settings } from "lucide-react";

type SectionType = "information" | "points" | "settings" | "achievements";

interface ProfileNavigationProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

export function ProfileNavigation({ activeSection, onSectionChange }: ProfileNavigationProps) {
  return (
    <div className="border-b sticky top-0 z-10 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex overflow-x-auto hide-scrollbar">
          <Button
            variant="ghost"
            className={`cursor-pointer rounded-none h-12 px-4 font-medium ${
              activeSection === "information"
                ? "border-b-2 border-primary text-primary"
                : ""
            }`}
            onClick={() => onSectionChange("information")}
          >
            <Info className="h-4 w-4 mr-2" />
            Information
          </Button>
          <Button
            variant="ghost"
            className={`cursor-pointer rounded-none h-12 px-4 font-medium ${
              activeSection === "points"
                ? "border-b-2 border-primary text-primary"
                : ""
            }`}
            onClick={() => onSectionChange("points")}
          >
            <Coins className="h-4 w-4 mr-2" />
            Points
          </Button>
          <Button
            variant="ghost"
            className={`cursor-pointer rounded-none h-12 px-4 font-medium ${
              activeSection === "achievements"
                ? "border-b-2 border-primary text-primary"
                : ""
            }`}
            onClick={() => onSectionChange("achievements")}
          >
            <Trophy className="h-4 w-4 mr-2" />
            Achievements
          </Button>
          <Button
            variant="ghost"
            className={`cursor-pointer rounded-none h-12 px-4 font-medium ${
              activeSection === "settings"
                ? "border-b-2 border-primary text-primary"
                : ""
            }`}
            onClick={() => onSectionChange("settings")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
} 