import { useState, useEffect } from "react";
import {Link,useLocation,useNavigate} from "react-router-dom";
import { Menu, Moon } from "lucide-react";
import { SITE_TITLE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { LoginButton } from "@/components/auth/LoginButton";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Courses", href: "#courses" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
  { name: "TodayPanchangam", href: "/today-panchangam" },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollToHash } = useScrollToHash();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.includes(path.replace("/", ""));
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    console.log(`Nav clicked: ${href}`);
    
    // Handle navigation based on the link type
    if (href === "/") {
      navigate("/");
      return;
    }
    
    if (href.includes("#")) {
      // Extract just the ID part without the #
      const sectionId = href.replace(/#/g, "");
      console.log(`Scroll to section: ${sectionId}`);
      
      // If we're not on the home page, navigate to home page first
      if (location.pathname !== "/") {
        // Set a session storage flag so we know to scroll after navigation
        sessionStorage.setItem("scrollToSection", sectionId);
        navigate("/");
        return;
      }
      
      // We're on the home page, so try to find and scroll to the section
      const element = document.getElementById(sectionId);
      console.log(`Found element?`, !!element);
      
      if (element) {
        // Scroll directly to the element
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.error(`Could not find element with id: ${sectionId}`);
      }
    } else {
      // Regular link, just navigate
      navigate(href);
    }
  };
  
  // Check for a stored section to scroll to on page load
  useEffect(() => {
    const sectionToScrollTo = sessionStorage.getItem("scrollToSection");
    if (sectionToScrollTo && location.pathname === "/") {
      // Small delay to ensure the page is fully loaded
      setTimeout(() => {
        scrollToHash(sectionToScrollTo);
        sessionStorage.removeItem("scrollToSection");
      }, 800);
    }
  }, [location, scrollToHash]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link to="/" className="flex items-center">
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
                      handleNavClick(e, link.href);
                      setIsOpen(false);
                    }}
                  >
                    {link.name}
                  </a>
                ))}
                <Link to="/booking">
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
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}

          <Link to="/booking">
            <Button className="ml-8 whitespace-nowrap inline-flex items-center justify-center">
              Book Consultation
            </Button>
          </Link>
        </nav>

        <div className="ml-auto">
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
