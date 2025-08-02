import { FC } from "react";

interface EventListSkeletonProps {
  count: number;
}

const EventListSkeleton: FC<EventListSkeletonProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="overflow-hidden rounded-lg shadow-sm">
          <div className="flex w-full h-[350px] flex-col gap-4">
            <div className="skeleton h-[200px] w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-36"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EventListSkeleton;
