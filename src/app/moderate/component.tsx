"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import {
  acceptJoke,
  fetchPendingJokes,
  rejectJoke,
} from "../../api/moderate.api";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";

export default function ModerationComponent() {
  const [page, setPage] = React.useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pending-jokes", page],
    queryFn: () => fetchPendingJokes({ limit: 10, page }),
  });

  const acceptJokeMutation = useMutation({
    mutationKey: ["accept-joke"],
    mutationFn: (jokeId: string) => {
      return acceptJoke(jokeId);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const rejectJokeMutation = useMutation({
    mutationKey: ["accept-joke"],
    mutationFn: (jokeId: string) => {
      return rejectJoke(jokeId);
    },
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div className="flex flex-col items-center text-center gap-2 max-w-2xl w-full p-8">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="h-8 w-8 text-primary" />
        </div>
      ) : (
        <>
          {data?.data.map((joke) => (
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
        </>
      )}
    </div>
  );
}
