import { Button } from "@/components/ui/button";
import { pillars } from "@/data/pillars";
import { ArrowRight, Sparkles, Target, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface LandingProps {
  onGetStarted: () => void;
}

export function Landing({ onGetStarted }: LandingProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta/5 to-transparent" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-sage/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl animate-pulse-soft" />
        
        <div className="container relative mx-auto max-w-5xl text-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Design Your Life with Purpose
            </span>
          </div>
          
          <h1 className="animate-fade-up stagger-1 font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-6">
            Create Your{" "}
            <span className="text-gradient-warm">Vision Board</span>
            <br />
            for a Fulfilling Life
          </h1>
          
          <p className="animate-fade-up stagger-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A warm, family-focused space to visualize your dreams, track your goals, 
            and nurture growth across every area of your life.
          </p>
          
          <div className="animate-fade-up stagger-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" onClick={onGetStarted}>
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Eight Pillars of a Balanced Life
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Organize your vision across the areas that matter most to you and your family
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.id}
                className={`pillar-card opacity-0 animate-fade-up stagger-${index + 1}`}
              >
                <div className={`inline-flex p-3 rounded-xl ${pillar.bgColor} mb-4`}>
                  <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {pillar.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-2xl bg-terracotta/10 mb-4">
                <Target className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Track Your Goals</h3>
              <p className="text-muted-foreground">
                Set meaningful goals and watch your progress with visual tracking and streak rewards
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-2xl bg-sage/20 mb-4">
                <Heart className="w-8 h-8 text-sage" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Daily Reflections</h3>
              <p className="text-muted-foreground">
                Build gratitude habits and celebrate wins with guided daily reflection prompts
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-2xl bg-warm-gold/20 mb-4">
                <Sparkles className="w-8 h-8 text-warm-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">AI Suggestions</h3>
              <p className="text-muted-foreground">
                Get personalized goal suggestions based on your life stage and priorities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-3xl">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center bg-gradient-to-br from-terracotta/10 via-warm-gold/5 to-sage/10">
            <div className="absolute inset-0 bg-card/50 backdrop-blur-sm" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Ready to Design Your Best Life?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of families creating meaningful visions and achieving their dreams together.
              </p>
              <Button variant="warm" size="xl" onClick={onGetStarted}>
                Create Your Vision Board
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
