import { useState } from "react";
import { Pillar, VisionItem } from "@/data/pillars";
import { useVisionBoard } from "@/hooks/useVisionBoard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  Plus, 
  Quote, 
  Target, 
  Image as ImageIcon,
  FileText,
  Trash2,
  Sparkles,
  CheckCircle2
} from "lucide-react";

interface PillarBoardProps {
  pillar: Pillar;
  onBack: () => void;
}

type ItemType = "text" | "quote" | "goal" | "image";

export function PillarBoard({ pillar, onBack }: PillarBoardProps) {
  const { getItemsByPillar, addItem, updateItem, deleteItem } = useVisionBoard();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<ItemType>("goal");
  const [newContent, setNewContent] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const items = getItemsByPillar(pillar.id);

  const handleAddItem = () => {
    if (!newContent.trim()) return;

    addItem({
      pillarId: pillar.id,
      type: selectedType,
      content: newContent,
      imageUrl: selectedType === "image" ? newImageUrl : undefined,
      isCompleted: false,
      progress: 0,
    });

    setNewContent("");
    setNewImageUrl("");
    setShowAddDialog(false);
  };

  const handleAddSuggestion = (suggestion: string) => {
    addItem({
      pillarId: pillar.id,
      type: "goal",
      content: suggestion,
      isCompleted: false,
      progress: 0,
    });
    setShowSuggestions(false);
  };

  const toggleGoalComplete = (item: VisionItem) => {
    updateItem(item.id, { isCompleted: !item.isCompleted });
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "quote": return <Quote className="w-4 h-4" />;
      case "goal": return <Target className="w-4 h-4" />;
      case "image": return <ImageIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

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
            <span className="hidden sm:inline">Back to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Button variant="soft" size="sm" onClick={() => setShowSuggestions(true)}>
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Suggestions</span>
            </Button>
            <Button variant="warm" size="sm" onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Item</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Pillar Header */}
        <div className="mb-8 animate-fade-up">
          <div className={`inline-flex p-4 rounded-2xl ${pillar.bgColor} mb-4`}>
            <pillar.icon className={`w-8 h-8 ${pillar.color}`} />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2">
            {pillar.name}
          </h1>
          <p className="text-muted-foreground">{pillar.description}</p>
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-16 animate-fade-up">
            <div className={`inline-flex p-6 rounded-3xl ${pillar.bgColor} mb-6`}>
              <pillar.icon className={`w-12 h-12 ${pillar.color}`} />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
              Start Your {pillar.name} Vision
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Add goals, quotes, images, and notes to visualize your dreams for this area of life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="warm" onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4" />
                Add First Item
              </Button>
              <Button variant="soft" onClick={() => setShowSuggestions(true)}>
                <Sparkles className="w-4 h-4" />
                Get Suggestions
              </Button>
            </div>
          </div>
        )}

        {/* Vision Items Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, index) => (
              <div 
                key={item.id}
                className={`vision-card group opacity-0 animate-fade-up stagger-${(index % 6) + 1} ${
                  item.isCompleted ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${pillar.bgColor}`}>
                    {getItemIcon(item.type)}
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {item.type === "image" && item.imageUrl && (
                  <img 
                    src={item.imageUrl} 
                    alt={item.content}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}

                {item.type === "quote" ? (
                  <blockquote className="italic text-foreground border-l-2 border-primary pl-4">
                    "{item.content}"
                  </blockquote>
                ) : item.type === "goal" ? (
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={item.isCompleted}
                      onCheckedChange={() => toggleGoalComplete(item)}
                      className="mt-1"
                    />
                    <p className={`text-foreground ${item.isCompleted ? "line-through text-muted-foreground" : ""}`}>
                      {item.content}
                    </p>
                  </div>
                ) : (
                  <p className="text-foreground">{item.content}</p>
                )}

                {item.isCompleted && (
                  <div className="flex items-center gap-2 mt-3 text-sage text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Completed!
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Item Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Add to {pillar.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {/* Type Selection */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { type: "goal" as ItemType, icon: Target, label: "Goal" },
                { type: "quote" as ItemType, icon: Quote, label: "Quote" },
                { type: "text" as ItemType, icon: FileText, label: "Note" },
                { type: "image" as ItemType, icon: ImageIcon, label: "Image" },
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    selectedType === type 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${selectedType === type ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>

            {/* Content Input */}
            {selectedType === "quote" || selectedType === "text" ? (
              <Textarea
                placeholder={selectedType === "quote" ? "Enter an inspiring quote..." : "Write a note..."}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
              />
            ) : (
              <Input
                placeholder={selectedType === "goal" ? "What do you want to achieve?" : "Describe your image..."}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            )}

            {selectedType === "image" && (
              <Input
                placeholder="Image URL (optional)"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
            )}

            <Button variant="warm" className="w-full" onClick={handleAddItem}>
              Add to Vision Board
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Suggestions Dialog */}
      <Dialog open={showSuggestions} onOpenChange={setShowSuggestions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Suggestions
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Here are some goal suggestions for your {pillar.name} pillar:
            </p>
            {pillar.suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleAddSuggestion(suggestion)}
                className="w-full text-left p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-foreground">{suggestion}</span>
                  <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
