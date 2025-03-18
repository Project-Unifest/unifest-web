import React from "react";
import { Skeleton } from "@/src/shared/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/src/shared/ui/card";
import { Separator } from "@/src/shared/ui/separator";

function BoothItemSkeleton(isEnding: boolean) {
  return (
    <>
      <Card className="m-5 border-none px-0 shadow-none">
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start justify-start">
            <CardHeader className="px-0">
              <CardTitle className="px-0">
                <Skeleton className="h-6 w-40" />
              </CardTitle>
              <CardDescription className="px-0">
                <Skeleton className="h-4 w-64" />
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </div>
          <CardHeader className="flex flex-row items-center justify-start space-x-2 space-y-0 px-0">
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </CardHeader>
        </div>
        <CardFooter className="flex items-center justify-between gap-2 px-0">
          <Skeleton className="h-8 w-full flex-1 rounded-md" />
        </CardFooter>
        {isEnding && <Separator orientation="horizontal" className="w-full" />}
      </Card>
    </>
  );
}

function BoothListSkeleton() {
  return (
    <div className="my-4 space-y-2">
      {[1, 2, 3].map((item, index, array) => (
        <>
          <BoothItemSkeleton key={item} isEnding={index !== array.length - 1} />
          {/* {index !== array.length - 1 && <Separator orientation="horizontal" />} */}
        </>
      ))}
    </div>
  );
}

export default function GlobalLoadingFallback() {
  return <BoothListSkeleton />;
}
