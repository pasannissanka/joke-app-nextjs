import React from "react";
import NavBar from "../NavBar";
import ListComponent from "./component";

export default function ListPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NavBar isModerator={true} />
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <ListComponent />
      </main>
    </div>
  );
}
