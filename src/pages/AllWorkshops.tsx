import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

// Import all workshop data from various categories:
// (Removed broken import of workshopData)

// Educators workshops (copied from EducatorsWorkshops.tsx)
const EDU_WORKSHOPS = [
  {
    id: "classroom-boundaries",
    title: "Setting Healthy Classroom Boundaries",
    description: "Learn effective techniques for maintaining professional boundaries while creating a supportive classroom environment for students and protecting your mental well-being.",
    instructor: null,
    date: null,
    time: null,
    category: "Educators",
    duration: "45 minutes",
    modules: 4,
  },
  {
    id: "emotional-resilience",
    title: "Building Emotional Resilience for Educators",
    description: "Develop skills to cope with the emotional demands of teaching and bounce back from challenging classroom situations.",
    instructor: null,
    date: null,
    time: null,
    category: "Educators",
    duration: "60 minutes",
    modules: 6,
  },
  {
    id: "admin-communication",
    title: "Effective Communication with Administration",
    description: "Strategies for advocating for yourself and your students while maintaining productive relationships with school leadership.",
    instructor: null,
    date: null,
    time: null,
    category: "Educators",
    duration: "30 minutes",
    modules: 3,
  },
  {
    id: "mindful-teaching",
    title: "Mindfulness Practices for Educators",
    description: "Learn mindfulness techniques that can be integrated into your teaching day to reduce stress and increase presence in the classroom.",
    instructor: null,
    date: null,
    time: null,
    category: "Educators",
    duration: "50 minutes",
    modules: 5,
  },
  {
    id: "creative-teaching",
    title: "Rekindling Teaching Creativity",
    description: "Rediscover your passion for teaching through creative approaches that benefit both your students and your professional satisfaction.",
    instructor: null,
    date: null,
    time: null,
    category: "Educators",
    duration: "45 minutes",
    modules: 4,
  }
];

// Military workshops (copied from MilitaryWorkshops.tsx)
const MILITARY_WORKSHOPS = [
  {
    id: "1",
    title: "Combat Stress Management",
    description: "Learn effective techniques to manage stress related to combat experiences and PTSD symptoms.",
    instructor: "Col. James Wilson, Ret.",
    date: "June 15, 2025",
    time: "2:00 PM - 3:30 PM ET",
    category: "Military",
    duration: null,
    modules: null,
  },
  {
    id: "2",
    title: "Mindfulness for Veterans",
    description: "A guided introduction to mindfulness practices specifically adapted for veterans and military personnel.",
    instructor: "Dr. Sarah Miller",
    date: "June 18, 2025",
    time: "1:00 PM - 2:00 PM ET",
    category: "Military",
    duration: null,
    modules: null,
  },
  {
    id: "3",
    title: "Transitioning to Civilian Life",
    description: "Navigate the challenges of transitioning from military to civilian life with confidence and purpose.",
    instructor: "Maj. Robert Johnson, Ret.",
    date: "June 22, 2025",
    time: "3:00 PM - 4:30 PM ET",
    category: "Military",
    duration: null,
    modules: null,
  },
  {
    id: "4",
    title: "Trauma-Informed Yoga",
    description: "A gentle yoga practice designed for individuals with trauma, focusing on grounding and self-regulation.",
    instructor: "Capt. Lisa Thompson, Ret.",
    date: "June 25, 2025",
    time: "11:00 AM - 12:00 PM ET",
    category: "Military",
    duration: null,
    modules: null,
  },
  {
    id: "5",
    title: "Military Families: Communication Skills",
    description: "Strengthen communication within military families, addressing the unique challenges they face.",
    instructor: "Dr. Michael Chen",
    date: "June 28, 2025",
    time: "4:00 PM - 5:30 PM ET",
    category: "Military",
    duration: null,
    modules: null,
  },
];

// Sample Transport workshops (abbreviated for demo)
const TRANSPORT_WORKSHOPS = [
  {
    id: "stress-mng",
    title: "Stress Management for Truckers",
    description: "Learn practical techniques to manage stress on the road, including breathing exercises, mindfulness practices, and cognitive reframing strategies.",
    instructor: "Dr. Michael Reynolds",
    date: "May 15, 2025",
    time: "8:00 PM - 9:30 PM EST",
    category: "Transport",
    duration: null,
    modules: null,
  },
  {
    id: "health-road",
    title: "Health & Wellness for Transport Workers",
    description: "Comprehensive approaches to maintaining physical and mental health while working in transportation.",
    instructor: "Mark Williams, Health Coach",
    date: "May 25, 2025",
    time: "1:00 PM - 3:00 PM EST",
    category: "Transport",
    duration: null,
    modules: null,
  },
];

// Sample Chronic Illness workshops (abbreviated for demo)
const CHRONIC_WORKSHOPS = [
  {
    id: "chronic101",
    title: "Living Well with Chronic Illness",
    description: "An introductory workshop on adapting to life with chronic health conditions.",
    instructor: "Dr. Emily Chen",
    date: null,
    time: null,
    category: "Chronic Illness",
    duration: "6 weeks",
    modules: 6,
  },
  {
    id: "pain-management",
    title: "Comprehensive Pain Management",
    description: "Learn evidence-based strategies for managing chronic pain.",
    instructor: "Dr. Michael Santos",
    date: null,
    time: null,
    category: "Chronic Illness",
    duration: "4 weeks",
    modules: 8,
  },
];

// Merge all arrays into one master workshop list
const ALL_WORKSHOPS = [
  ...EDU_WORKSHOPS,
  ...MILITARY_WORKSHOPS,
  ...TRANSPORT_WORKSHOPS,
  ...CHRONIC_WORKSHOPS,
  // You can insert more as needed, e.g., Law Enforcement, Small Business, etc
];

const AllWorkshopsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Simple search filtering
  const filtered = ALL_WORKSHOPS.filter(w => 
    w.title.toLowerCase().includes(search.toLowerCase()) ||
    (w.description && w.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-2">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-zinc-800 dark:text-white">All Workshops</h1>
      <div className="mb-8 flex justify-between items-center flex-wrap gap-2">
        <input 
          className="border rounded px-4 py-2 w-full md:w-96 focus:ring-2 focus:ring-primary"
          placeholder="Search Workshops"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button variant="outline" className="mt-2 md:mt-0" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((workshop) => (
          <Card key={workshop.id}>
            <CardHeader>
              <CardTitle>{workshop.title}</CardTitle>
              <CardDescription>{workshop.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{workshop.description}</p>
              <div className="mt-3 space-y-1">
                {workshop.instructor && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" /> {workshop.instructor}
                  </div>
                )}
                {workshop.date && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" /> {workshop.date}
                  </div>
                )}
                {workshop.time && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" /> {workshop.time}
                  </div>
                )}
                {workshop.duration && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" /> {workshop.duration}
                  </div>
                )}
                {workshop.modules && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Modules: {workshop.modules}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full"
                onClick={() => navigate("/app/workshops")}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-zinc-500 mt-8">No workshops found.</p>
      )}
    </div>
  );
};

export default AllWorkshopsPage;
