"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "../components/ui/dialog";
import Link from "next/link";
import React from "react";
import { Button } from "../components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { fetchJokeTypes } from "../api/deliver.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { submitJoke } from "../api/submit.api";
import { ISubmitJokeBody } from "../types/types";

const submitJokeSchema = z.object({
  joke: z
    .string({ required_error: "Joke is required" })
    .min(1, { message: "Joke is required" }),
  type: z
    .string({ required_error: "Joke is required" })
    .min(1, { message: "Joke type is required" }),
});

export default function NavBar() {
  return (
    <header className="bg-background text-foreground py-4 px-6 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="#" className="text-xl font-bold" prefetch={false}>
          PunPal
        </Link>
        <nav className="items-center gap-4 flex">
          <AddJokeDialog />
          <Link
            href="#"
            className="hover:text-muted-foreground"
            prefetch={false}
          >
            Moderator Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

const AddJokeDialog = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["joke-types"],
    queryFn: () => fetchJokeTypes(),
  });

  const mutation = useMutation({
    mutationKey: ["submit-joke"],
    mutationFn: (data: ISubmitJokeBody) => {
      return submitJoke(data);
    },
  });

  const form = useForm<z.infer<typeof submitJokeSchema>>({
    resolver: zodResolver(submitJokeSchema),
    defaultValues: {
      joke: "",
      type: "",
    },
  });

  function onSubmit(values: z.infer<typeof submitJokeSchema>) {
    mutation.mutate({
      joke: values.joke,
      joke_type_id: values.type,
    });
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Add Joke</Button>
      </DialogTrigger>
      <DialogContent className="absolute sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Submit Jokes</DialogTitle>
              <DialogDescription>
                Submit your jokes here and make others laugh.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="joke"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Joke</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the joke you want to submit.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Joke type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a joke type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data && !isLoading ? (
                          data.data.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.type}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="" disabled>
                            Loading...
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage email addresses in your{" "}
                      <Link href="/examples/forms">email settings</Link>.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const ModeratorLoginDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="absolute sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
