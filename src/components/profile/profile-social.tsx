import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Save, X, Github, Linkedin, Twitter, Globe } from "lucide-react";

interface ProfileSocialProps {
  socialData: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  onUpdate: (data: any) => void;
}

export function ProfileSocial({ socialData, onUpdate }: ProfileSocialProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(socialData);

  const handleChange = (platform: string, value: string) => {
    setFormData((prev) => ({ ...prev, [platform]: value }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <Card className="border shadow-sm dark:shadow-md dark:shadow-black/10">
      <CardHeader className="bg-muted/10 dark:bg-muted/5 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Social Profiles</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 cursor-pointer"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-5 sm:p-6">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Github className="h-4 w-4 text-foreground" />
                GitHub
              </Label>
              <Input
                value={formData.github}
                onChange={(e) => handleChange("github", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-foreground" />
                LinkedIn
              </Label>
              <Input
                value={formData.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Twitter className="h-4 w-4 text-foreground" />
                Twitter
              </Label>
              <Input
                value={formData.twitter}
                onChange={(e) => handleChange("twitter", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4 text-foreground" />
                Website
              </Label>
              <Input
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={handleSubmit} className="cursor-pointer">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-[#333] dark:bg-[#444] flex items-center justify-center flex-shrink-0">
                <Github className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">GitHub</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {formData.github}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-[#0077B5] flex items-center justify-center flex-shrink-0">
                <Linkedin className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">LinkedIn</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {formData.linkedin}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-[#1DA1F2] flex items-center justify-center flex-shrink-0">
                <Twitter className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Twitter</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {formData.twitter}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">Website</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {formData.website}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 