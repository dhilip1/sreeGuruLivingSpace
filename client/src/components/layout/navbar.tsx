import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Moon } from "lucide-react";
import { SITE_TITLE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Courses", href: "/#courses" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.includes(path.replace("/", ""));
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Extract the section ID from the href
    const sectionId = id.replace("#", "");
    
    // If we're not on the home page, navigate to home page with hash
    if (location !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // If we're already on the home page, just scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 bg-white bg-opacity-90 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="sr-only">{SITE_TITLE}</span>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10">
                <Moon className="text-primary text-2xl" />
              </div>
              <span className="ml-3 text-xl font-medium text-primary">
                {SITE_TITLE}
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 -my-2 md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-6">
                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive(link.href)
                          ? "text-primary"
                          : "text-neutral-dark hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                      }`}
                      onClick={(e) => {
                        if (link.href.includes("#")) {
                          scrollToSection(e, link.href);
                          setIsOpen(false);
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  ))}
                  <Link href="/booking">
                    <Button className="w-full mt-4">Book Consultation</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-base font-medium ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-neutral-dark hover:text-primary transition duration-300"
                }`}
                onClick={(e) => {
                  if (link.href.includes("#")) {
                    scrollToSection(e, link.href);
                  }
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link href="/booking">
              <Button className="ml-8 whitespace-nowrap inline-flex items-center justify-center">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
