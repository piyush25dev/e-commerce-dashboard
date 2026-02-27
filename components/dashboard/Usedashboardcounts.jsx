import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";

/**
 * Fetches document counts from multiple Firestore collections.
 * Returns { counts, loading } where counts = { projects, skills, milestones, ... }
 */
export function useDashboardCounts() {
  const [counts, setCounts] = useState({
    projects: 0,
    skills: 0,
    milestones: 0,
    about: 0,
    blog: 0,
    messages: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        // FIXED: Destructure in the SAME order as Promise.all
        const [projectsSnap, skillsSnap, milestonesSnap, aboutSnap, productsSnap, blogSnap, messagesSnap] = await Promise.all([
          getDocs(collection(db, "projects")),
          getDocs(collection(db, "skills")),
          getDocs(collection(db, "milestones")),
          getDocs(collection(db, "about")),
          getDocs(collection(db, "products")),
          getDocs(collection(db, "blog")),
          getDocs(collection(db, "messages")),
        ]);
        
        setCounts({
          projects: projectsSnap.size,
          skills: skillsSnap.size,
          milestones: milestonesSnap.size,
          products: productsSnap.size,
          about: aboutSnap.size,
          blog: blogSnap.size,
          messages: messagesSnap.size,
        });
      } catch (e) {
        console.error("Failed to fetch dashboard counts:", e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { counts, loading };
}