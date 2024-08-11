"use client";

import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import {
  acceptJoke,
  fetchPendingJokes,
  rejectJoke,
} from "../../api/moderate.api";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { ISubmittedJoke } from "../../types/types";

export default function ModerationComponent() {
  const [page, setPage] = React.useState(1);

  const jokesInfiniteQuery = useInfiniteQuery({
    queryKey: ["submitted-jokes"],
    queryFn: ({ pageParam }) => fetchPendingJokes(pageParam),
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
    }, [] as ISubmittedJoke[]);
  }, [jokesInfiniteQuery.data]);

  const acceptJokeMutation = useMutation({
    mutationKey: ["accept-joke"],
    mutationFn: (jokeId: string) => {
      return acceptJoke(jokeId);
    },
    onSuccess: () => {
      jokesInfiniteQuery.refetch();
    },
  });

  const rejectJokeMutation = useMutation({
    mutationKey: ["accept-joke"],
    mutationFn: (jokeId: string) => {
      return rejectJoke(jokeId);
    },
    onSuccess: () => {
      jokesInfiniteQuery.refetch();
    },
  });

  return (
    <div className="flex flex-col items-center text-center gap-2 max-w-2xl w-full p-8">
      {jokesInfiniteQuery.isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="h-8 w-8 text-primary" />
        </div>
      ) : (
        <>
          {jokes.map((joke) => (
            <Card key={joke.id} className="w-full py-2">
              <CardContent className="py-2">
                <div className="flex flex-col gap-2">
                  <h1>{joke.joke}</h1>
                  <span className="text-sm text-muted-foreground">
                    {joke.jokeType?.type}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 py-0">
                <Button
                  onClick={() => acceptJokeMutation.mutate(joke.id)}
                  variant="outline"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => rejectJokeMutation.mutate(joke.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </CardFooter>
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
