import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { SeedsBackground } from "./ui/seeds-background";

export default function Header() {
  return (
    <header className="relative flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b border-border">
      {/* <SeedsBackground /> */}
      <div className="flex items-center space-x-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Seed</h1>
          <p className="text-sm text-muted-foreground">
            AI Agents Evolve & Thrive
          </p>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Documentation
              </Link>
            </li>
            <li>
              <a
                href="https://eliza.network"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                Eliza & TEE
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-green-500/10 text-primary">
            ACTIVE <span className="ml-1 text-xs">9</span>
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 text-primary">
            BREEDING <span className="ml-1 text-xs">6</span>
          </Badge>
        </div>
        <Button
          variant="outline"
          className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
        >
          Connect Wallet
        </Button>
      </div>
    </header>
  );
}
