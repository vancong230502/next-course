import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Lock, Shield, Mail, Eye, EyeOff, Users, User, Globe, Key, Trash2 } from "lucide-react";
import { Input } from "../ui/input";

interface ProfileSettingsProps {
  settings: {
    notifications: {
      email: boolean;
      push: boolean;
      marketing: boolean;
    };
    privacy: {
      profileVisibility: "public" | "private" | "friends";
      showEmail: boolean;
      showActivity: boolean;
    };
  };
  onUpdateSettings: (settings: any) => void;
}

export function ProfileSettings({ settings, onUpdateSettings }: ProfileSettingsProps) {
  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    onUpdateSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const handlePrivacyChange = (key: keyof typeof settings.privacy, value: any) => {
    onUpdateSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
 {/* Account Settings Section */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card className="border shadow-sm dark:shadow-md dark:shadow-black/10">
                <CardHeader className="bg-muted/10 dark:bg-muted/5 border-b">
                  <CardTitle className="text-lg font-medium">
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="current-password"
                        className="text-sm font-medium"
                      >
                        Current Password
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="cursor-text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="new-password"
                        className="text-sm font-medium"
                      >
                        New Password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="cursor-text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="confirm-password"
                        className="text-sm font-medium"
                      >
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="cursor-text"
                      />
                    </div>
                    <div className="pt-2">
                      <Button className="cursor-pointer">
                        Update Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm dark:shadow-md dark:shadow-black/10">
                <CardHeader className="bg-muted/10 dark:bg-muted/5 border-b">
                  <CardTitle className="text-lg font-medium">
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-muted/5 dark:hover:bg-muted/10 transition-colors">
                      <div>
                        <h3 className="font-medium">Public Profile</h3>
                        <p className="text-sm text-muted-foreground">
                          Allow other users to see your profile
                        </p>
                      </div>
                      <Switch defaultChecked className="cursor-pointer" />
                    </div>

                    <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-muted/5 dark:hover:bg-muted/10 transition-colors">
                      <div>
                        <h3 className="font-medium">Learning Activity</h3>
                        <p className="text-sm text-muted-foreground">
                          Share your course progress with instructors
                        </p>
                      </div>
                      <Switch defaultChecked className="cursor-pointer" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm dark:shadow-md dark:shadow-black/10">
                <CardHeader className="bg-muted/10 dark:bg-muted/5 border-b">
                  <CardTitle className="text-lg font-medium">
                    Account Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Sign Out</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Sign out from your account on this device.
                      </p>
                      <Button 
                        variant="destructive" 
                        className="cursor-pointer"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border shadow-sm dark:shadow-md dark:shadow-black/10">
                <CardHeader className="bg-muted/10 dark:bg-muted/5 border-b">
                  <CardTitle className="text-lg font-medium">
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-muted/5 dark:hover:bg-muted/10 transition-colors">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive email about course updates
                        </p>
                      </div>
                      <Switch defaultChecked className="cursor-pointer" />
                    </div>

                    <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-muted/5 dark:hover:bg-muted/10 transition-colors">
                      <div>
                        <h3 className="font-medium">Course Reminders</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive reminders for enrollment and deadlines
                        </p>
                      </div>
                      <Switch defaultChecked className="cursor-pointer" />
                    </div>

                    <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-muted/5 dark:hover:bg-muted/10 transition-colors">
                      <div>
                        <h3 className="font-medium">New Course Alerts</h3>
                        <p className="text-sm text-muted-foreground">
                          Get notified when new courses are available
                        </p>
                      </div>
                      <Switch className="cursor-pointer" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </div>

  );
} 