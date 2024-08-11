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
import { ILoginRequest, ISubmitJokeBody } from "../types/types";
import { loginModerator } from "../api/moderate.api";
import { useRouter } from "next/navigation";

const submitJokeSchema = z.object({
  joke: z
    .string({ required_error: "Joke is required" })
    .min(1, { message: "Joke is required" }),
  type: z
    .string({ required_error: "Joke is required" })
    .min(1, { message: "Joke type is required" }),
});

const moderatorLoginSchema = z.object({
  username: z.string({ required_error: "Username is required" }).email({
    message: "Username should be an email",
  }),
  password: z.string({ required_error: "Password is required" }).min(1, {
    message: "Password is required",
  }),
});

export default function NavBar({
  isModerator = false,
}: {
  isModerator?: boolean;
}) {
  return (
    <header className="bg-background text-foreground py-4 px-6 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold" prefetch={false}>
          PunPal
        </Link>
        {!isModerator && (
          <nav className="items-center gap-4 flex">
            <AddJokeDialog />
            <ModeratorLoginDialog />
          </nav>
        )}
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

const ModeratorLoginDialog = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["login-moderator"],
    mutationFn: (data: ILoginRequest) => {
      return loginModerator(data);
    },
  });

  const form = useForm<z.infer<typeof moderatorLoginSchema>>({
    resolver: zodResolver(moderatorLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof moderatorLoginSchema>) {
    const data = await mutation.mutateAsync({
      password: values.password,
      username: values.username,
    });
    form.reset();

    localStorage.setItem("access-token", data.token);

    router.push("/moderate");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Moderator Login</Button>
      </DialogTrigger>
      <DialogContent className="absolute sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Sign in as Moderator</DialogTitle>
              <DialogDescription>
                Sign in to moderate jokes and other settings.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>Enter the username.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your password</FormDescription>
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
