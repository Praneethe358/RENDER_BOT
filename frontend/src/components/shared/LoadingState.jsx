import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingState = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Card key={idx} className="space-y-3">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-10 w-full" />
        </Card>
      ))}
    </div>
  );
};

export default LoadingState;
