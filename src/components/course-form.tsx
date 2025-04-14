import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseFormProps {
  course?: Course | null;
  onClose: () => void;
  onSuccess: (course: Course) => void;
}

export function CourseForm({ course, onClose, onSuccess }: CourseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    price: course?.price || 0,
    imageUrl: course?.imageUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = course
        ? `http://127.0.0.1:8000/courses/${course.id}`
        : "http://127.0.0.1:8000/courses";
      const method = course ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save course");
      }

      const savedCourse = await response.json();
      onSuccess(savedCourse);
    } catch (error) {
      console.error("Error saving course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {course ? "Chỉnh sửa khóa học" : "Thêm khóa học mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Giá</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL hình ảnh</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Đang lưu..." : course ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 