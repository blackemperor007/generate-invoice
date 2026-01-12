import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <header>
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Logo/>
          <Button>
            Commencer
          </Button>
        </div>
      </header>
    </main>
  );
}
