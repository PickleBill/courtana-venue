import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import VenuePreview from "./pages/VenuePreview";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Partners from "./pages/Partners";
import Schedule from "./pages/Schedule";
import About from "./pages/About";
import Discovery from "./pages/Discovery";
import NotFound from "./pages/NotFound";
import VenueDetail from "./pages/VenueDetail";
import Investor from "./pages/Investor";
import PlayerShowcase from "./pages/PlayerShowcase";
import SeeMore from "./pages/SeeMore";
import Exclusive from "./pages/Exclusive";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Existing routes — managed by Lovable */}
          <Route path="/" element={<VenuePreview />} />
          <Route path="/see-more" element={<SeeMore />} />
          <Route path="/exclusive" element={<Exclusive />} />
          <Route path="/plan" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/about" element={<About />} />
          <Route path="/discovery/:slug?" element={<Discovery />} />

          {/* Stakeholder routes — data shells */}
          <Route path="/venue/:slug" element={<VenueDetail />} />
          <Route path="/investor" element={<Investor />} />
          <Route path="/player" element={<PlayerShowcase />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
