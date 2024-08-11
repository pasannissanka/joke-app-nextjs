"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from "../components/ui/dialog";
import Link from "next/link";
import React from "react";
import { Button } from "../components/ui/button";

export default function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const openChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <header className="bg-background text-foreground py-4 px-6 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="#" className="text-xl font-bold" prefetch={false}>
          PunPal
        </Link>
        <nav className="items-center gap-4 flex">
          <AddJokeDialog
            trigger={
              <Button variant="ghost" onClick={() => setIsOpen(true)}>
                Add Joke
              </Button>
            }
          />
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

const AddJokeDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="absolute sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Jokes</DialogTitle>
          <DialogDescription>
            Submit your jokes here and make others laugh.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
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
