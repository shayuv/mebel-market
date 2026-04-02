export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-lg bg-surface ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg, #F0EDE8 25%, #F5F2EE 50%, #F0EDE8 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-2 px-3.5 pb-3.5 pt-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="mt-1 h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}
