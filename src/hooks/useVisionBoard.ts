import { useState, useEffect } from "react";
import { VisionItem, Reflection } from "@/data/pillars";

const STORAGE_KEY = "vision-board-data";
const REFLECTIONS_KEY = "vision-board-reflections";

interface VisionBoardData {
  items: VisionItem[];
  lastUpdated: string;
}

export function useVisionBoard() {
  const [items, setItems] = useState<VisionItem[]>([]);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: VisionBoardData = JSON.parse(stored);
      setItems(data.items);
    }

    const storedReflections = localStorage.getItem(REFLECTIONS_KEY);
    if (storedReflections) {
      setReflections(JSON.parse(storedReflections));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const data: VisionBoardData = {
        items,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(REFLECTIONS_KEY, JSON.stringify(reflections));
    }
  }, [reflections, isLoaded]);

  const addItem = (item: Omit<VisionItem, "id" | "createdAt">) => {
    const newItem: VisionItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [...prev, newItem]);
    return newItem;
  };

  const updateItem = (id: string, updates: Partial<VisionItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getItemsByPillar = (pillarId: string) => {
    return items.filter((item) => item.pillarId === pillarId);
  };

  const addReflection = (reflection: Omit<Reflection, "id">) => {
    const newReflection: Reflection = {
      ...reflection,
      id: crypto.randomUUID(),
    };
    setReflections((prev) => [newReflection, ...prev]);
    return newReflection;
  };

  const getStreak = () => {
    if (reflections.length === 0) return 0;

    const sortedDates = reflections
      .map((r) => new Date(r.date).toDateString())
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    const uniqueDates = [...new Set(sortedDates)];
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (uniqueDates[i] === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getCompletedGoals = () => {
    return items.filter((item) => item.type === "goal" && item.isCompleted).length;
  };

  const getTotalGoals = () => {
    return items.filter((item) => item.type === "goal").length;
  };

  return {
    items,
    reflections,
    isLoaded,
    addItem,
    updateItem,
    deleteItem,
    getItemsByPillar,
    addReflection,
    getStreak,
    getCompletedGoals,
    getTotalGoals,
  };
}
