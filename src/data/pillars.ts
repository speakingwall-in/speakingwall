import { Brain, Heart, Baby, Wallet, Users, Briefcase, Home, Sparkles } from "lucide-react";

export interface Pillar {
  id: string;
  name: string;
  description: string;
  icon: typeof Brain;
  color: string;
  bgColor: string;
  suggestions: string[];
}

export const pillars: Pillar[] = [
  {
    id: "mental-health",
    name: "Mental & Emotional Health",
    description: "Nurture your mind and emotional well-being",
    icon: Brain,
    color: "text-lavender",
    bgColor: "bg-lavender/20",
    suggestions: [
      "Practice mindfulness 10 mins daily",
      "Journal gratitude every morning",
      "Digital detox on weekends",
      "Monthly therapy sessions",
      "Read 1 personal development book/month",
    ],
  },
  {
    id: "physical-health",
    name: "Physical Health & Wellness",
    description: "Build strength, energy, and vitality",
    icon: Heart,
    color: "text-soft-coral",
    bgColor: "bg-soft-coral/20",
    suggestions: [
      "Exercise 4x per week",
      "Sleep 7-8 hours nightly",
      "Drink 8 glasses of water daily",
      "Meal prep on Sundays",
      "Annual health checkup",
    ],
  },
  {
    id: "parenting",
    name: "Kid's Future & Parenting",
    description: "Shape your child's bright future",
    icon: Baby,
    color: "text-sky-blue",
    bgColor: "bg-sky-blue/20",
    suggestions: [
      "Weekly one-on-one activity",
      "Start education savings fund",
      "Teach new skill monthly",
      "Daily reading together",
      "Plan memorable family trips",
    ],
  },
  {
    id: "financial",
    name: "Financial Freedom",
    description: "Build wealth and security for your family",
    icon: Wallet,
    color: "text-sage",
    bgColor: "bg-sage/20",
    suggestions: [
      "Build 6-month emergency fund",
      "Maximize retirement contributions",
      "Pay off debt systematically",
      "Diversify investments",
      "Create passive income stream",
    ],
  },
  {
    id: "relationship",
    name: "Relationship & Marriage",
    description: "Strengthen your bond and grow together",
    icon: Users,
    color: "text-dusty-rose",
    bgColor: "bg-dusty-rose/20",
    suggestions: [
      "Weekly date night ritual",
      "Daily appreciation practice",
      "Annual couple's getaway",
      "Learn communication skills",
      "Support partner's dreams",
    ],
  },
  {
    id: "career",
    name: "Career, Skills & Purpose",
    description: "Grow professionally and find meaning",
    icon: Briefcase,
    color: "text-warm-gold",
    bgColor: "bg-warm-gold/20",
    suggestions: [
      "Define 5-year career vision",
      "Learn new skill quarterly",
      "Build professional network",
      "Maintain work-life balance",
      "Seek mentorship",
    ],
  },
  {
    id: "lifestyle",
    name: "Lifestyle & Environment",
    description: "Create a beautiful life and home",
    icon: Home,
    color: "text-terracotta",
    bgColor: "bg-terracotta/20",
    suggestions: [
      "Declutter one room monthly",
      "Plan dream vacation",
      "Nurture meaningful friendships",
      "Pursue creative hobby",
      "Design peaceful home space",
    ],
  },
  {
    id: "spirituality",
    name: "Spirituality & Values",
    description: "Connect with your deeper purpose",
    icon: Sparkles,
    color: "text-primary",
    bgColor: "bg-primary/20",
    suggestions: [
      "Define core values",
      "Morning meditation practice",
      "Practice gratitude daily",
      "Volunteer monthly",
      "Reflect on life purpose",
    ],
  },
];

export interface VisionItem {
  id: string;
  pillarId: string;
  type: "text" | "image" | "quote" | "goal";
  content: string;
  imageUrl?: string;
  isCompleted?: boolean;
  progress?: number;
  targetDate?: string;
  createdAt: string;
}

export interface Reflection {
  id: string;
  date: string;
  gratitude: string[];
  wins: string[];
  improvements: string[];
  mood: number;
}
