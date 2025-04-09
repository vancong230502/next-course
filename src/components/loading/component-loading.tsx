export function ComponentLoading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 border-3 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
} 