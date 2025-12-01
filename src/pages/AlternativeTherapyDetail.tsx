
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Clock, BookOpen, CheckCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";

const AlternativeTherapyDetail = () => {
  const { therapyId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Therapy details data 
  const therapies = {
    "mindfulness": {
      name: "Mindfulness Meditation",
      description: "Mindfulness meditation involves focusing on the present moment without judgment. It can help reduce stress, improve focus, and enhance overall well-being.",
      image: "https://images.unsplash.com/photo-1593811167565-4672e6c8f62b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      benefits: ["Stress reduction", "Improved focus", "Emotional regulation"],
      history: "Mindfulness practices have roots in Buddhist meditation traditions dating back over 2,500 years. They were adapted for secular contexts in the late 20th century, particularly through programs like Mindfulness-Based Stress Reduction (MBSR) developed by Jon Kabat-Zinn.",
      colorClass: "from-teal-600 to-green-600",
      practiceTime: "5-30 minutes daily"
    },
    "aromatherapy": {
      name: "Aromatherapy",
      description: "Aromatherapy uses essential oils extracted from plants to promote physical and psychological well-being. It can be used to alleviate pain, improve mood, and enhance relaxation.",
      image: "https://images.unsplash.com/photo-1608571423902-ead5fac2f9cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      benefits: ["Pain relief", "Mood enhancement", "Relaxation"],
      history: "The use of aromatic plant compounds dates back thousands of years across ancient civilizations including Egypt, China, and India. Modern aromatherapy was established in the early 20th century when French chemist René-Maurice Gattefossé discovered the healing properties of lavender oil.",
      colorClass: "from-green-600 to-teal-600",
      practiceTime: "10-20 minutes as needed"
    },
    "yoga": {
      name: "Yoga",
      description: "Yoga combines physical postures, breathing techniques, and meditation to promote physical and mental health. It can improve flexibility, strength, and balance, as well as reduce stress and anxiety.",
      image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      benefits: ["Improved flexibility", "Stress reduction", "Increased strength"],
      history: "Yoga originated in ancient India over 5,000 years ago, first mentioned in the Rig Veda. It evolved through different traditions and philosophies, eventually spreading globally in the 20th century as both a spiritual practice and exercise form.",
      colorClass: "from-blue-600 to-teal-600",
      practiceTime: "15-60 minutes daily"
    },
    "music-therapy": {
      name: "Music Therapy",
      description: "Music therapy uses music to address emotional, cognitive, and social needs. It can help reduce anxiety, improve mood, and enhance communication skills.",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      benefits: ["Anxiety reduction", "Mood improvement", "Enhanced communication"],
      history: "While music has been used for healing throughout human history, modern music therapy emerged after World Wars I and II when musicians visited hospitals to play for veterans suffering physical and emotional trauma. The first music therapy degree program was established in 1944.",
      colorClass: "from-indigo-600 to-blue-600",
      practiceTime: "20-45 minutes per session"
    },
    "art-therapy": {
      name: "Art Therapy",
      description: "Art therapy uses creative art processes to promote emotional and psychological well-being. It can help individuals express themselves, explore their emotions, and improve their self-esteem.",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      benefits: ["Emotional expression", "Self-esteem improvement", "Stress reduction"],
      history: "Art therapy developed as a distinct discipline in the mid-20th century, though art has been used for healing throughout human history. Adrian Hill coined the term 'art therapy' in 1942 while recovering from tuberculosis, and the field was further developed by psychologists and artists working with war veterans and psychiatric patients.",
      colorClass: "from-purple-600 to-indigo-600",
      practiceTime: "30-60 minutes per session"
    }
  };
  
  const therapy = therapyId && therapies[therapyId] 
    ? therapies[therapyId] 
    : null;
  
  const handleStartPractice = () => {
    if (!therapyId) return;
    
    toast({
      title: "Opening guided practice",
      description: `Starting ${therapy?.name || therapyId} session`,
      duration: 2000,
    });
    
    navigate(`/app/guided-practice/${therapyId}`, {
      state: { 
        therapyId,
        therapyName: therapy?.name,
        returnPath: `/app/alternative-therapies/detail/${therapyId}`
      }
    });
  };
  
  if (!therapy) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Therapy Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the therapy you're looking for.</p>
          <Link to="/alternative-therapies">
            <Button>Return to Alternative Therapies</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${therapy.colorClass} text-white`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22 width=%2280%22 height=%2280%22><circle cx=%2240%22 cy=%2240%22 r=%2232%22 fill=%22white%22 opacity=%220.05%22/></svg>')] bg-center"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -ml-32"></div>
      
      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <Link to="/alternative-therapies" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Alternative Therapies
          </Link>
          <HomeButton />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden mb-8">
            <div className="h-64 overflow-hidden">
              <img 
                src={therapy.image} 
                alt={therapy.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8">
              <h1 className="text-4xl font-light mb-4">{therapy.name}</h1>
              
              <div className="flex items-center text-sm text-white/70 mb-6">
                <div className="flex items-center mr-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{therapy.practiceTime}</span>
                </div>
              </div>
              
              <p className="text-white/90 text-lg mb-6">
                {therapy.description}
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Key Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {therapy.benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-white/20 rounded-full px-4 py-2"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">History & Background</h3>
                <p className="text-white/80">
                  {therapy.history}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-indigo-700 hover:bg-white/90 flex-1"
                  onClick={handleStartPractice}
                >
                  <Play className="mr-2 h-4 w-4" /> 
                  Start Guided Practice
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 flex-1" 
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 mr-3" />
              <h3 className="text-xl font-medium">Community Experiences</h3>
            </div>
            
            <p className="text-white/80 italic mb-4">
              "This practice has been transformative for my daily stress management. I feel more centered and present throughout my day."
            </p>
            
            <p className="text-white/80 italic">
              "After just a few weeks of regular practice, I've noticed significant improvements in my ability to focus and stay calm in challenging situations."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternativeTherapyDetail;
