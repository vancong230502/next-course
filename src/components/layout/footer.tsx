export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between px-4 gap-4 py-10 md:h-24 md:flex-row md:py-6">
          <div className="flex flex-col items-center gap-4 px-4 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                Your Name
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/yourusername/course-platform"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                GitHub
              </a>
              .
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Twitter
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 