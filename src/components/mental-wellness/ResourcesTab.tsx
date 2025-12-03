import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BookOpen, Video, FileText, Headphones, ExternalLink,
  Users, MessageSquare, Heart, GraduationCap, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

const ResourcesTab: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Articles", "Videos", "Podcasts", "Support Groups"];

  const educationalResources = [
    {
      title: "Understanding Anxiety",
      description: "Comprehensive guide to anxiety disorders, their symptoms, causes, and evidence-based management strategies.",
      type: "Article",
      icon: <FileText className="h-5 w-5 text-primary" />,
      duration: "10 min read",
      color: "bg-primary/10"
    },
    {
      title: "CBT Basics",
      description: "Five-part video series explaining how thoughts affect emotions and behaviors, with practical CBT exercises.",
      type: "Video",
      icon: <Video className="h-5 w-5 text-destructive" />,
      duration: "45 min total",
      color: "bg-destructive/10"
    },
    {
      title: "Building Resilience",
      description: "Practical exercises to develop psychological resilience and improve your ability to handle stress.",
      type: "Guide",
      icon: <BookOpen className="h-5 w-5 text-accent" />,
      duration: "15 min + exercises",
      color: "bg-accent/10"
    },
    {
      title: "Mindfulness in Daily Life",
      description: "Incorporating mindfulness practices into everyday activities for reduced stress and better focus.",
      type: "Podcast",
      icon: <Headphones className="h-5 w-5 text-secondary" />,
      duration: "6 episodes",
      color: "bg-secondary/10"
    }
  ];

  const supportCommunities = [
    {
      title: "Anxiety Support Forum",
      description: "A moderated community where members share experiences and coping strategies for anxiety disorders.",
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
      action: "Visit Forum"
    },
    {
      title: "Virtual Support Groups",
      description: "Weekly video meetings focused on specific mental health topics, led by trained peer supporters.",
      icon: <Users className="h-5 w-5 text-accent" />,
      action: "View Schedule"
    },
    {
      title: "Peer Support Network",
      description: "Get matched with a trained peer supporter for personalized encouragement and understanding.",
      icon: <Heart className="h-5 w-5 text-destructive" />,
      action: "Find Support"
    }
  ];

  return (
    <div className="space-y-10">
      {/* Search and Filter */}
      <div className="space-y-4">
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm}
          placeholder="Search articles, videos, and resources..."
        />
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* Educational Resources - Masonry Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          Educational Resources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationalResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full glass-morphism border-2 border-border/50 hover:border-primary/30 hover:shadow-xl transition-all group cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-xl ${resource.color} border border-primary/20 group-hover:scale-110 transition-transform`}>
                      {resource.icon}
                    </div>
                    <Badge variant="outline" className="border-primary/30">
                      {resource.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {resource.icon}
                    <span>{resource.duration}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full group/btn border-primary/20 hover:bg-primary/5"
                  >
                    {resource.type === "Video" ? "Watch" : resource.type === "Podcast" ? "Listen" : "Read"} Now
                    <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Support Communities */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Support Communities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportCommunities.map((community, index) => (
            <motion.div
              key={community.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="h-full glass-morphism border-2 border-border/50 hover:border-primary/30 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 w-fit mb-3 group-hover:scale-110 transition-transform">
                    {community.icon}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {community.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {community.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/20 hover:bg-primary/5"
                  >
                    {community.action}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Professional Help CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-morphism rounded-2xl border-2 border-primary/30 p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl -z-10"></div>
        <h3 className="font-bold text-2xl mb-3">Finding Professional Help</h3>
        <p className="text-muted-foreground mb-6 max-w-3xl">
          While self-help resources are valuable, sometimes professional support is needed. 
          Use these directories to find qualified mental health professionals in your area.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="border-2 border-primary/30 hover:bg-primary/10"
            onClick={() => navigate("/app/real-time-therapy")}
          >
            <Users className="mr-2 h-4 w-4" />
            Therapist Directory
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-primary/30 hover:bg-primary/10"
            onClick={() => navigate("/app/real-time-therapy")}
          >
            <Video className="mr-2 h-4 w-4" />
            Teletherapy Options
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-primary/30 hover:bg-primary/10"
            onClick={() => navigate("/app/crisis-support")}
          >
            <Heart className="mr-2 h-4 w-4" />
            Crisis Resources
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResourcesTab;
