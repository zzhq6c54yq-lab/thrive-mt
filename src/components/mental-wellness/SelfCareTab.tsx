import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ToolCard from "./ToolCard";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import { toolCategories } from "@/data/toolCategories";
import { Leaf, Brain, Heart, Sparkles, Smile, Moon, Headphones, Target, Dumbbell, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";

const SelfCareTab: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Mindfulness", "Physical", "Emotional", "Sleep", "Creativity"];

  const featuredTools = [
    {
      title: "Guided Breathing",
      description: "Interactive breathing exercises designed to activate your parasympathetic nervous system and reduce stress levels instantly.",
      icon: <Leaf className="h-6 w-6 text-accent" />,
      features: ["4-7-8 Technique", "Box Breathing", "Alternate Nostril"],
      estimatedTime: "5-10 min",
      difficulty: "Easy" as const,
      featured: true,
      path: "/mental-wellness-tools/breathing"
    },
    {
      title: "Thought Reframing",
      description: "Learn to identify cognitive distortions and transform negative thought patterns into balanced perspectives using CBT principles.",
      icon: <Brain className="h-6 w-6 text-primary" />,
      features: ["Cognitive restructuring", "Pattern recognition", "Balanced thinking"],
      estimatedTime: "10-15 min",
      difficulty: "Medium" as const,
      featured: true,
      path: "/mental-wellness-tools/reframing"
    },
    {
      title: "Guided Meditation",
      description: "Develop present-moment awareness to reduce rumination, increase emotional regulation, and find inner peace.",
      icon: <Sparkles className="h-6 w-6 text-secondary" />,
      features: ["Body scan", "Loving-kindness", "Mindful awareness"],
      estimatedTime: "3-15 min",
      difficulty: "Easy" as const,
      path: "/mental-wellness-tools/meditation"
    }
  ];

  const additionalTools = [
    {
      title: "Mood Boost Activities",
      description: "Quick science-backed exercises to improve your mood in minutes through behavioral activation.",
      icon: <Smile className="h-5 w-5 text-accent" />,
      estimatedTime: "5-10 min",
      path: "/mental-wellness-tools/mood-boost"
    },
    {
      title: "Sleep Improvement",
      description: "Tools and techniques for better sleep quality including sleep hygiene and bedtime routines.",
      icon: <Moon className="h-5 w-5 text-primary" />,
      estimatedTime: "Varies",
      path: "/mental-wellness-tools/sleep"
    },
    {
      title: "Gratitude Practice",
      description: "Develop a daily gratitude habit with guided reflection exercises proven to boost well-being.",
      icon: <Heart className="h-5 w-5 text-destructive" />,
      estimatedTime: "5 min",
      path: "/journaling"
    },
    {
      title: "Relaxation Audio",
      description: "Calming sounds, binaural beats, and guided relaxation sessions for deep rest.",
      icon: <Headphones className="h-5 w-5 text-secondary" />,
      estimatedTime: "10-30 min",
      path: "/binaural-beats-therapy"
    },
    {
      title: "Goal Setting",
      description: "Set SMART mental health goals and track your progress with structured planning tools.",
      icon: <Target className="h-5 w-5 text-accent" />,
      estimatedTime: "15-20 min",
      path: "/mental-wellness-tools/goals"
    },
    {
      title: "Movement & Exercise",
      description: "Mind-body connection exercises specifically designed to support mental wellness.",
      icon: <Dumbbell className="h-5 w-5 text-primary" />,
      estimatedTime: "15-30 min",
      path: "/mental-wellness-tools/exercise"
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Systematic tension-release technique to reduce physical stress and promote deep calm.",
      icon: <Leaf className="h-5 w-5 text-accent" />,
      estimatedTime: "10-15 min",
      path: "/mental-wellness-tools/breathing"
    },
    {
      title: "Emotion Regulation Toolkit",
      description: "Learn DBT-inspired skills to manage intense emotions and reduce emotional reactivity.",
      icon: <Heart className="h-5 w-5 text-primary" />,
      estimatedTime: "10-20 min",
      path: "/mental-wellness-tools/reframing"
    },
    {
      title: "Visualization & Imagery",
      description: "Guided mental imagery exercises for stress relief, confidence building, and inner peace.",
      icon: <Sparkles className="h-5 w-5 text-secondary" />,
      estimatedTime: "8-12 min",
      path: "/mental-wellness-tools/meditation"
    }
  ];

  const filteredTools = toolCategories.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || tool.keywords.some(k => 
      k.toLowerCase().includes(activeCategory.toLowerCase())
    );
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10">
      {/* Search and Filter */}
      <div className="space-y-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* Featured Tools - Bento Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Featured Practices
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ToolCard
                {...tool}
                onStartClick={() => navigate(tool.path)}
                onLearnMoreClick={() => navigate(tool.path)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Tools - Masonry-style grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-primary" />
            More Wellness Tools
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(tool.path)}
              className="cursor-pointer group"
            >
              <div className="glass-morphism rounded-2xl border-2 border-border/50 hover:border-primary/30 p-6 h-full transition-all hover:shadow-xl">
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    {tool.estimatedTime && (
                      <span className="text-xs text-muted-foreground font-medium">
                        {tool.estimatedTime}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Tools Catalog */}
      {searchTerm && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Search Results ({filteredTools.length})
          </h2>
          
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ToolCard
                    title={tool.title}
                    description={tool.description}
                    icon={<tool.icon className="h-6 w-6 text-primary" />}
                    features={tool.features}
                    onStartClick={() => navigate("/app/mental-wellness-tools")}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No tools found matching your search.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Custom Self-Care Plan CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-morphism rounded-2xl border-2 border-primary/30 p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 -z-10"></div>
        <div className="relative z-10">
          <h3 className="font-bold text-2xl mb-3">Create Your Personal Wellness Plan</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Build a personalized routine combining these tools based on your unique needs and preferences.
            Track your progress and adjust your plan as you grow.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate("/app/mental-wellness-tools/goals")}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Build My Custom Plan
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SelfCareTab;
