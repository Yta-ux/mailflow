import { Skeleton } from "@/components/ui/skeleton";

export function AnalyzingState() {
  return (
    <div className="animate-fade-in w-full h-full flex flex-col justify-center">
      <div className="space-y-4 rounded-lg border bg-card p-6 w-full">
        <div className="flex gap-3">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
