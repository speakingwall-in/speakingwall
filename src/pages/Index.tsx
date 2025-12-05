import { useState, useEffect } from "react";
import { Landing } from "@/components/Landing";
import { Dashboard } from "@/components/Dashboard";

const ONBOARDING_KEY = "vision-board-onboarded";

const Index = () => {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const onboarded = localStorage.getItem(ONBOARDING_KEY);
    setHasOnboarded(onboarded === "true");
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setHasOnboarded(true);
  };

  const handleBackToLanding = () => {
    setHasOnboarded(false);
  };

  // Show nothing while checking localStorage
  if (hasOnboarded === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return hasOnboarded ? (
    <Dashboard onBack={handleBackToLanding} />
  ) : (
    <Landing onGetStarted={handleGetStarted} />
  );
};

export default Index;
