"use client";

import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import {
  acceptJoke,
  fetchPendingJokes,
  rejectJoke,
} from "../../api/moderate.api";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { fetchJokes } from "../../api/deliver.api";
import { IJoke } from "../../types/types";

export default function ListComponent() {
  const jokesInfiniteQuery = useInfiniteQuery({
    queryKey: ["jokes-all"],
    queryFn: ({ pageParam }) => fetchJokes(pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.length > 0) {
        return {
          limit: 10,
          page: pages.length + 1,
        };
      }
      return undefined;
    },
    initialPageParam: {
      limit: 10,
      page: 1,
    },
  });

  const jokes = useMemo(() => {
    const pages = jokesInfiniteQuery.data?.pages;
    if (!pages) return [];

    return pages.reduce((acc, page) => {
      return [...acc, ...page.data];
    }, [] as IJoke[]);
  }, [jokesInfiniteQuery.data]);

  return (
    <div className="flex flex-col items-center text-center gap-2 max-w-2xl w-full p-8">
      {jokesInfiniteQuery.isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="h-8 w-8 text-primary" />
        </div>
      ) : (
        <>
          {jokes?.map((joke) => (
            <Card key={joke.id} className="w-full py-2">
              <CardContent className="py-2">
                <div className="flex flex-col gap-2">
                  <h1>{joke?.joke}</h1>
                  <span className="text-sm text-muted-foreground">
                    {joke?.type?.type}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            onClick={() => {
              jokesInfiniteQuery.fetchNextPage();
            }}
          >
            Load More
          </Button>
        </>
      )}
    </div>
  );
}
