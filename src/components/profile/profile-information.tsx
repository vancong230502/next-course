import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Save, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface ProfileInformationProps {
  profileData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
    birthdate: string;
  };
  onUpdate: (data: any) => void;
}

export function ProfileInformation({ profileData, onUpdate }: ProfileInformationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date(profileData.birthdate));
  const [formData, setFormData] = useState(profileData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setFormData((prev) => ({
        ...prev,
        birthdate: format(newDate, "dd-MM-yyyy"),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <Card className="border shadow-sm dark:shadow-md dark:shadow-black/10 md:col-span-2">
      <CardHeader className="bg-muted/10 dark:bg-muted/5 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Personal Information</CardTitle>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled={true}
                  className="bg-muted/50 dark:bg-muted/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthdate" className="text-sm font-medium">
                  Birthday (dd-mm-yyyy)
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal cursor-pointer border-input"
                    >
                      {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="submit" className="cursor-pointer">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid gap-y-4 sm:gap-y-5 sm:gap-x-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm text-muted-foreground font-medium mb-1.5">
                Full Name
              </h3>
              <p>{formData.name}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground font-medium mb-1.5">
                Email
              </h3>
              <p>{formData.email}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground font-medium mb-1.5">
                Phone Number
              </h3>
              <p>{formData.phone}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground font-medium mb-1.5">
                Birthday (dd-mm-yyyy)
              </h3>
              <p>{formData.birthdate}</p>
            </div>
            <div className="sm:col-span-2">
              <h3 className="text-sm text-muted-foreground font-medium mb-1.5">
                Address
              </h3>
              <p>{formData.address}</p>
            </div>
            <div className="sm:col-span-2">
              <h3 className="text-sm text-muted-foreground font-medium mb-1.5">
                Bio
              </h3>
              <p>{formData.bio}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 