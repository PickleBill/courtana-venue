import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>© 2026 Cortana · courtana.com</p>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <Link to="/events" className="hover:text-primary transition-colors">Events</Link>
        <Link to="/schedule" className="hover:text-primary transition-colors">Schedule</Link>
        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
