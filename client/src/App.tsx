import { Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Home from "./pages/home";
import BookingPage from "./pages/booking-page";
import ContactPage from "./pages/contact-page";
import CoursesPage from "./pages/courses-page";
import NotFound from "./pages/not-found";
import TodayPanchangam from "./pages/todayPanchangam-page";
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import ProtectedPage from "./pages/protected-page";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<BookingPage/>} />
      <Route path="/contact" element={<ContactPage/>} />
      <Route path="/courses" element={<CoursesPage/>} />
      <Route path="/today-panchangam" element={<TodayPanchangam />} />
      <Route path="/protected-page" element={
        <ProtectedRoute>
          <ProtectedPage />
        </ProtectedRoute>
      } />
      <Route element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
