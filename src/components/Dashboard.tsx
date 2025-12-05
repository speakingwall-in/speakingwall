import { useState } from "react";
import { pillars, Pillar } from "@/data/pillars";
import { useVisionBoard } from "@/hooks/useVisionBoard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PillarBoard } from "./PillarBoard";
import { ReflectionDialog } from "./ReflectionDialog";
import { 
  ArrowLeft, 
  Flame, 
  Target, 
  CheckCircle2, 
  Calendar,
  Plus,
  Sparkles
} from "lucide-react";

interface DashboardProps {
  onBack: () => void;
}

export function Dashboard({ onBack }: DashboardProps) {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const [showReflection, setShowReflection] = useState(false);
  const { getStreak, getCompletedGoals, getTotalGoals, items } = useVisionBoard();

  const streak = getStreak();
  const completedGoals = getCompletedGoals();
  const totalGoals = getTotalGoals();
  const progressPercent = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  if (selectedPillar) {
    return (
      <PillarBoard 
        pillar={selectedPillar} 
        onBack={() => setSelectedPillar(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <h1 className="font-display text-xl font-semibold text-foreground">
            My Vision Board
          </h1>
          
          <Button variant="warm" size="sm" onClick={() => setShowReflection(true)}>
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Reflect</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="vision-card flex items-center gap-4 p-5">
            <div className="p-3 rounded-xl bg-terracotta/10">
              <Flame className="w-6 h-6 text-terracotta" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold text-foreground">{streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </div>

          <div className="vision-card flex items-center gap-4 p-5">
            <div className="p-3 rounded-xl bg-sage/20">
              <Target className="w-6 h-6 text-sage" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold text-foreground">{totalGoals}</p>
              <p className="text-sm text-muted-foreground">Active Goals</p>
            </div>
          </div>

          <div className="vision-card flex items-center gap-4 p-5">
            <div className="p-3 rounded-xl bg-warm-gold/20">
              <CheckCircle2 className="w-6 h-6 text-warm-gold" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold text-foreground">{completedGoals}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>

          <div className="vision-card flex items-center gap-4 p-5">
            <div className="p-3 rounded-xl bg-sky-blue/20">
              <Calendar className="w-6 h-6 text-sky-blue" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold text-foreground">{items.length}</p>
              <p className="text-sm text-muted-foreground">Vision Items</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {totalGoals > 0 && (
          <div className="mb-10 vision-card p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-medium text-foreground">Overall Progress</h3>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>
        )}

        {/* Welcome Card for New Users */}
        {items.length === 0 && (
          <div className="mb-10 rounded-2xl p-8 bg-gradient-to-br from-terracotta/5 via-transparent to-sage/5 border border-border/50 text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              Welcome to Your Vision Board!
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Select a life pillar below to start adding your dreams, goals, and inspirations. 
              Your journey to a fulfilling life begins here.
            </p>
          </div>
        )}

        {/* Pillar Grid */}
        <div className="mb-6">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
            Life Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar, index) => {
              const pillarItems = items.filter(i => i.pillarId === pillar.id);
              const pillarGoals = pillarItems.filter(i => i.type === "goal");
              const completedPillarGoals = pillarGoals.filter(i => i.isCompleted);
              
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`pillar-card text-left opacity-0 animate-fade-up stagger-${(index % 4) + 1}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${pillar.bgColor}`}>
                      <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                    </div>
                    {pillarItems.length > 0 && (
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {pillarItems.length} items
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {pillar.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {pillar.description}
                  </p>
                  
                  {pillarGoals.length > 0 && (
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{completedPillarGoals.length}/{pillarGoals.length} goals</span>
                        <span>{Math.round((completedPillarGoals.length / pillarGoals.length) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(completedPillarGoals.length / pillarGoals.length) * 100} 
                        className="h-1.5 mt-2" 
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <ReflectionDialog 
        open={showReflection} 
        onOpenChange={setShowReflection} 
      />
    </div>
  );
}
