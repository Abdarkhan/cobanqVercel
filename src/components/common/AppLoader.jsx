import { useState, useEffect } from "react";
import Loader from "./Loader";

export default function AppLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return children;
}