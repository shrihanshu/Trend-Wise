import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import UserProfile from './UserProfile';
import {
  Sheet,
  SheetTrigger,
  SheetContent
} from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-muted">
      <Link href="/" className="text-xl font-bold">TrendWise</Link>
      
      {/* Desktop User Profile and Theme Toggle */}
      <div className="hidden sm:flex items-center space-x-4">
        <UserProfile />
        <ThemeToggle />
      </div>
      
      {/* Mobile Menu */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger className="text-2xl">☰</SheetTrigger>
          <SheetContent side="left">
            <nav className="space-y-4 mt-6">
              <Link href="/" className="block py-2 hover:text-primary">Home</Link>
              <Link href="/admin" className="block py-2 hover:text-primary">Admin</Link>
              <div className="pt-4 border-t">
                <UserProfile />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}