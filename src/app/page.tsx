import Link from "next/link";
import AppComponent from "./component";
import NavBar from "./NavBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <AppComponent />
      </main>
    </div>
  );
}
