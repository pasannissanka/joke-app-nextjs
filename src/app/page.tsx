import Link from "next/link";
import AppComponent from "./component";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-background text-foreground py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="#" className="text-xl font-bold" prefetch={false}>
            PunPal
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="#"
              className="hover:text-muted-foreground"
              prefetch={false}
            >
              Add Joke
            </Link>
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
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <AppComponent />
      </main>
    </div>
  );
}
