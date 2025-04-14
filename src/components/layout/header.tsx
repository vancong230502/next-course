"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "../../store/auth-store";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  LogIn,
  LogOut,
  User,
  LayoutDashboard,
  Bookmark,
  GraduationCap,
  ShieldCheck,
  Search,
  X,
  Menu,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useLoading } from "@/hooks/use-loading";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, user, logout } = useAuthStore();
  const { startLoading } = useLoading();
  const [showSearch, setShowSearch] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.fullName) return "U";

    const names = user.fullName.trim().split(" ");
    if (names.length === 0) return "U";

    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Lắng nghe phím tắt Ctrl+K hoặc Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleLogoutAndRedirect = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleNavigation = (path: string) => {
    startLoading();
    router.push(path);
  };
  const NavItems = ({ mobile = false, onItemClick = () => {} }) => (
    <>
      <Link
        href="/courses"
        className={`text-base font-medium transition-colors hover:text-primary cursor-pointer relative ${
          pathname === "/courses"
            ? "text-primary after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-primary"
            : "text-muted-foreground"
        } ${mobile ? "flex items-center py-3 border-b border-b-muted" : ""}`}
        onClick={onItemClick}
      >
        <span className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Courses
        </span>
      </Link>

      <Link
        href="/donate"
        className={`text-base font-medium transition-colors hover:text-primary cursor-pointer relative ${
          pathname === "/donate"
            ? "text-primary after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-primary"
            : "text-muted-foreground"
        } ${mobile ? "flex items-center py-3 border-b border-b-muted" : ""}`}
        onClick={onItemClick}
      >
        <span className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Donate
        </span>
      </Link>

      <Link
        href="/policy"
        className={`text-base font-medium transition-colors hover:text-primary cursor-pointer relative ${
          pathname === "/policy"
            ? "text-primary after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-primary"
            : "text-muted-foreground"
        } ${mobile ? "flex items-center py-3 border-b border-b-muted" : ""}`}
        onClick={onItemClick}
      >
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          Policy
        </span>
      </Link>
    </>
  );

  // Lấy giá trị user trực tiếp từ localStorage nếu store không hoạt động
  const [localUser, setLocalUser] = useState<any>(null);
  const [localRole, setLocalRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const parsedData = JSON.parse(authStorage);
        if (parsedData.state && parsedData.state.user) {
          setLocalUser(parsedData.state.user);
          setLocalRole(parsedData.state.role);
          console.log("Local user data from localStorage:", parsedData.state);
        }
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-xl font-semibold transition-colors hover:text-primary cursor-pointer flex items-center space-x-2 relative ${
                pathname === "/"
                  ? "text-primary after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-primary"
                  : "text-muted-foreground"
              }`}
            >
              <span className="font-bold">Studiac</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <NavItems />
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <ThemeToggle />
            {user?.role === "USER" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 cursor-pointer p-0 hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <Avatar className="h-8 w-8">
                      {user?.picture ? (
                        <AvatarImage src={user?.picture} alt={user?.email} />
                      ) : (
                        <AvatarFallback className="bg-transparent">
                          <User className="h-4 w-4 text-foreground" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {user?.fullName || user?.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.role === "USER" ? (
                          <span className="flex items-center">
                            <ShieldCheck className="mr-1 h-3 w-3 text-blue-500" />
                            USER
                          </span>
                        ) : (
                          "User"
                        )}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleNavigation("/dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleNavigation("/my-courses")}
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    My Courses
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleNavigation("/profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogoutAndRedirect}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 cursor-pointer p-0 hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-transparent">
                        <User className="h-4 w-4 text-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push("/login")}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push("/register")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Register
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-8 w-8"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0">
                <SheetHeader className="border-b p-4">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 p-0 rounded-full"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>
                <div className="flex flex-col px-4 py-2">
                  <NavItems
                    mobile={true}
                    onItemClick={() => setMobileMenuOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Search courses</DialogTitle>
          </DialogHeader>
          <div className="border-b p-4 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="pl-8 bg-background focus-visible:ring-0 focus-visible:ring-offset-0 border-none shadow-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="absolute right-0 top-0 h-9 w-9 px-0 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </form>
          </div>
          <div className="p-4 pt-2 max-h-[50vh] overflow-y-auto">
            <h4 className="mb-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Popular topics
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                "JavaScript",
                "React",
                "Python",
                "Web Development",
                "UI/UX",
                "Mobile Development",
                "Data Science",
                "Machine Learning",
              ].map((term) => (
                <div
                  key={term}
                  className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-muted cursor-pointer"
                  onClick={() => {
                    router.push(`/courses?search=${encodeURIComponent(term)}`);
                    setSearchOpen(false);
                  }}
                >
                  <Search className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{term}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
