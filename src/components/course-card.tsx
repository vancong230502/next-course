import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  rating: number;
  price: number;
  category: string;
}

export function CourseCard({
  id,
  title,
  description,
  thumbnail,
  instructor,
  rating,
  price,
  category,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} className="cursor-pointer">
      <div className="group h-full rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full cursor-pointer object-cover transition-transform group-hover:scale-105"
          />
          <Badge className="absolute right-2 top-2 cursor-default">{category}</Badge>
        </div>
        <div className="flex h-[calc(100%-12rem)] flex-col p-4">
          <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">By {instructor}</p>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
            {description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <div className="text-lg font-bold">
              {price === 0 ? "Free" : `$${price}`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 