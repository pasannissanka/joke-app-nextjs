"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRandomJoke } from "../api/deliver.api";
import { Button } from "../components/ui/button";

export default function AppComponent() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
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
              <h1 className="text-2xl font-bold mb-4">{data.data.joke}</h1>
              <span className="text-muted-foreground">
                {data.data.type.type}
              </span>
              <Button variant={"default"} onClick={refetchRandomJoke}>
                Get Another
              </Button>
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
