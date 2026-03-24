import { useState, useCallback, useEffect } from "react";
import type { LinkItem } from "@/data/links";
import { links as defaultLinks } from "@/data/links";
import defaultNews from "@/data/news.json";

// ─── Links ──────────────────────────────────────────
export interface AdminLinks {
  admin: LinkItem[];
  jobs: LinkItem[];
  cvTools: LinkItem[];
  social: LinkItem[];
  guide: { nameKey: string; url: string };
}

function loadLinks(): AdminLinks {
  const saved = localStorage.getItem("admin-links");
  if (saved) return JSON.parse(saved);
  return { ...defaultLinks };
}

export const useAdminLinks = () => {
  const [data, setData] = useState<AdminLinks>(loadLinks);

  const save = useCallback((next: AdminLinks) => {
    setData(next);
    localStorage.setItem("admin-links", JSON.stringify(next));
  }, []);

  const updatePillar = useCallback((pillar: keyof Omit<AdminLinks, "guide">, items: LinkItem[]) => {
    save({ ...data, [pillar]: items });
  }, [data, save]);

  return { linksData: data, updatePillar, saveLinks: save };
};

// ─── News ───────────────────────────────────────────
export interface NewsItem {
  id: string;
  titleKey: string;
  source: string;
  date: string;
  url: string;
  summary: string;
}

function loadNews(): NewsItem[] {
  const saved = localStorage.getItem("admin-news");
  if (saved) return JSON.parse(saved);
  return defaultNews as NewsItem[];
}

export const useAdminNews = () => {
  const [news, setNews] = useState<NewsItem[]>(loadNews);

  const save = useCallback((items: NewsItem[]) => {
    setNews(items);
    localStorage.setItem("admin-news", JSON.stringify(items));
  }, []);

  const addNews = useCallback((item: Omit<NewsItem, "id">) => {
    const newItem = { ...item, id: Date.now().toString() };
    save([newItem, ...news]);
  }, [news, save]);

  const deleteNews = useCallback((id: string) => {
    save(news.filter((n) => n.id !== id));
  }, [news, save]);

  const updateNews = useCallback((id: string, updates: Partial<NewsItem>) => {
    save(news.map((n) => (n.id === id ? { ...n, ...updates } : n)));
  }, [news, save]);

  return { news, addNews, deleteNews, updateNews };
};

// ─── Reviews ────────────────────────────────────────
export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  status: "pending" | "approved";
}

function loadReviews(): Review[] {
  const saved = localStorage.getItem("admin-reviews");
  if (saved) return JSON.parse(saved);
  return [];
}

export const useAdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(loadReviews);

  const save = useCallback((items: Review[]) => {
    setReviews(items);
    localStorage.setItem("admin-reviews", JSON.stringify(items));
  }, []);

  const addReview = useCallback((review: Omit<Review, "id" | "date" | "status">) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    save([...reviews, newReview]);
  }, [reviews, save]);

  const approveReview = useCallback((id: string) => {
    save(reviews.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r)));
  }, [reviews, save]);

  const deleteReview = useCallback((id: string) => {
    save(reviews.filter((r) => r.id !== id));
  }, [reviews, save]);

  const approvedReviews = reviews.filter((r) => r.status === "approved");
  const pendingReviews = reviews.filter((r) => r.status === "pending");

  return { reviews, approvedReviews, pendingReviews, addReview, approveReview, deleteReview };
};
