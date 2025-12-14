import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Calendar, User, BookOpen, 
  MessageSquare, Heart, ThumbsUp, Share
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import HomeButton from "@/components/HomeButton";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Finding Purpose After Service",
    excerpt: "Transitioning from military to civilian life can be challenging. Here's how I found new meaning and purpose.",
    author: "Capt. Michael Rodriguez, Ret.",
    date: "June 10, 2023",
    category: "Transition",
    image: "https://images.unsplash.com/photo-1529686342540-1b43aec0df75?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Mindfulness Techniques That Helped My PTSD",
    excerpt: "How daily mindfulness practices helped me manage my PTSD symptoms and reclaim control of my life.",
    author: "Sgt. Jessica Williams, Ret.",
    date: "May 28, 2023",
    category: "Mindfulness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Supporting Your Military Spouse Through Deployment",
    excerpt: "Strategies for maintaining strong communication and supporting your spouse's mental health during deployment.",
    author: "Sarah Thompson, Military Spouse",
    date: "May 15, 2023",
    category: "Family Support",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    featured: true
  },
  {
    id: 4,
    title: "My Journey Through Military Trauma Recovery",
    excerpt: "A personal account of recovery and growth after experiencing trauma during service.",
    author: "Lt. David Wilson, Ret.",
    date: "April 30, 2023",
    category: "PTSD & Trauma",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    featured: false
  },
  {
    id: 5,
    title: "Building Resilience: Lessons From My Military Service",
    excerpt: "How the resilience skills I learned in the military continue to help me overcome civilian life challenges.",
    author: "Col. Robert Johnson, Ret.",
    date: "April 22, 2023",
    category: "Resilience",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    featured: false
  },
  {
    id: 6,
    title: "Reconnecting With Family After Deployment",
    excerpt: "Strategies that helped me rebuild connections with my family after returning from deployment.",
    author: "Maj. Thomas Brown, Ret.",
    date: "April 15, 2023",
    category: "Family Support",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    featured: false
  }
];

const MilitaryBlog = () => {
  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1929] to-[#1A365D] py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/app/military-support" className="inline-flex items-center text-[#B87333] hover:text-[#B87333]/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Military Support
            </Link>
            <HomeButton />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Military Stories & Insights</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Authentic stories from service members and veterans sharing their journeys, challenges, and victories in mental health and wellbeing.
          </p>
        </div>
      </div>
      
      {/* Featured Posts */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#B87333] mb-6">
          Featured Stories
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.filter(post => post.featured).map(post => (
            <FeaturedPostCard 
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              author={post.author}
              date={post.date}
              category={post.category}
              image={post.image}
            />
          ))}
        </div>
        
        {/* All Posts */}
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">
          All Stories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <BlogPostCard 
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              author={post.author}
              date={post.date}
              category={post.category}
              image={post.image}
            />
          ))}
        </div>
        
        {/* Share Your Story CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#B87333]/20 to-transparent p-8 rounded-lg border border-[#B87333]/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Have a Story to Share?</h3>
              <p className="text-gray-300">
                Your experiences can inspire and support others in the military community. Share your mental health journey with us.
              </p>
            </div>
            
            <Button variant="gold" size="lg">
              Submit Your Story
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#0F2942] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-4">
            These stories are shared with permission from the authors to inspire and support the military community.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              to="/app/military-support" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Military Support Home
            </Link>
            <Link 
              to="/contact" 
              className="text-[#B87333] hover:text-[#B87333]/80 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Featured Post Card Component
interface FeaturedPostCardProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ 
  id,
  title, 
  excerpt,
  author,
  date,
  category,
  image
}) => {
  return (
    <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border border-[#B87333]/30 text-white transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute top-3 left-3 bg-[#B87333] text-white text-xs font-medium py-1 px-2 rounded-full">
          {category}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-xl">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="text-gray-300 mb-4">
          {excerpt}
        </CardDescription>
        
        <div className="flex items-center text-gray-400 text-sm">
          <User className="h-3 w-3 mr-1 text-[#B87333]" />
          <span className="mr-3">{author}</span>
          <Calendar className="h-3 w-3 mr-1 text-[#B87333]" />
          <span>{date}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button variant="gold" className="w-full">
          Read Full Story
        </Button>
      </CardFooter>
    </Card>
  );
};

// Blog Post Card Component
interface BlogPostCardProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ 
  id,
  title, 
  excerpt,
  author,
  date,
  category,
  image
}) => {
  return (
    <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border border-white/10 text-white transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="bg-[#B87333]/10 text-[#B87333] text-xs font-medium py-1 px-2 rounded-full w-fit mb-2">
          {category}
        </div>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <CardDescription className="text-gray-300 mb-4">
          {excerpt}
        </CardDescription>
        
        <div className="flex items-center text-gray-400 text-sm">
          <User className="h-3 w-3 mr-1 text-[#B87333]" />
          <span className="mr-3">{author}</span>
          <Calendar className="h-3 w-3 mr-1 text-[#B87333]" />
          <span>{date}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="w-full flex items-center justify-between">
          <Button variant="bronze" size="sm" className="text-sm">
            Read More
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#B87333]">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#B87333]">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#B87333]">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MilitaryBlog;
