"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRandomJoke } from "../api/deliver.api";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function AppComponent() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["jokes"],
    queryFn: () => fetchRandomJoke(),
  });

  const refetchRandomJoke = () => {
    refetch();
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="h-8 w-8 text-primary" />
        </div>
      ) : (
        <>
          {data ? (
            <div className="flex flex-col items-center text-center gap-2 max-w-2xl w-full p-8">
              <h1 className="text-2xl font-bold mb-4">{data?.data?.joke}</h1>
              <span className="text-muted-foreground">
                {data?.data?.type?.type}
              </span>
              <div className="flex gap-2 py-4">
                <Button onClick={refetchRandomJoke}>Get Another</Button>
                <Link href="/list">
                  <Button variant="link">View All</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No joke available.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
