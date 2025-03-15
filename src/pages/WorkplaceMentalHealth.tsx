
import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { Briefcase, Building2, Users, BookOpen, GraduationCap, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Page from "@/components/Page";
import WorkplaceCrisisBar from "@/components/workplace/WorkplaceCrisisBar";
import SubmitWorkplaceResource from "@/components/workplace/SubmitWorkplaceResource";
import WorkplaceWorkshopCard from "@/components/workplace/WorkplaceWorkshopCard";
import WorkplaceGameCard from "@/components/workplace/WorkplaceGameCard";
import { useNavigate } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const WorkplaceMentalHealth = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const workshops = [
    {
      id: "workshop-1",
      title: "Building Resilience in the Workplace",
      description: "Learn strategies to develop resilience and manage stress in professional environments.",
      date: "June 15, 2023",
      attendees: 145,
      duration: "1 hour",
      level: "Beginner",
      tags: ["Stress Management", "Resilience", "Workplace Wellness"],
      image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
    },
    {
      id: "workshop-2",
      title: "Effective Communication for Team Leaders",
      description: "Develop essential communication skills for fostering a supportive and productive work environment.",
      date: "July 8, 2023",
      attendees: 89,
      duration: "90 minutes",
      level: "Intermediate",
      tags: ["Communication", "Leadership", "Team Building"],
      image: "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png"
    },
    {
      id: "workshop-3",
      title: "Promoting Work-Life Balance for Small Businesses",
      description: "Create policies and practices that support employee well-being while maintaining productivity.",
      date: "August 3, 2023",
      attendees: 112,
      duration: "2 hours",
      level: "Advanced",
      tags: ["Work-Life Balance", "Policy", "Small Business"],
      image: "/lovable-uploads/776b4638-0382-4cd8-bb25-0a7e36accaf1.png"
    }
  ];

  const games = [
    {
      id: "game-1",
      title: "Team Collaboration Challenge",
      description: "A fun team-building exercise that improves communication and collaboration skills.",
      duration: "15 minutes",
      difficulty: "Easy",
      color: "bg-green-100",
      colorText: "text-green-800",
      icon: Users
    },
    {
      id: "game-2",
      title: "Mindful Moments",
      description: "Brief mindfulness exercises designed to reduce stress during the workday.",
      duration: "5 minutes",
      difficulty: "Beginner",
      color: "bg-blue-100",
      colorText: "text-blue-800",
      icon: BrainCircuit
    },
    {
      id: "game-3",
      title: "Productivity Puzzles",
      description: "Engaging brain teasers that boost focus and problem-solving skills.",
      duration: "10 minutes",
      difficulty: "Intermediate",
      color: "bg-purple-100",
      colorText: "text-purple-800",
      icon: GraduationCap
    }
  ];

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Page title="Workplace Mental Health" showBackButton onBackClick={handleBackClick}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Workplace Mental Health Portal</h1>
          <p className="text-lg text-gray-600">
            Resources and support for creating mentally healthy work environments for businesses of all sizes.
          </p>
        </div>

        <WorkplaceCrisisBar />

        <div className="mt-8">
          <Tab.Group onChange={setSelectedTab}>
            <Tab.List className="flex rounded-xl bg-gray-100 p-1 mb-8">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-3 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow text-blue-700'
                      : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-700'
                  )
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <Building2 className="h-5 w-5" />
                  <span>Overview</span>
                </div>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-3 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow text-blue-700'
                      : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-700'
                  )
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Workshops</span>
                </div>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-3 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow text-blue-700'
                      : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-700'
                  )
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <BrainCircuit className="h-5 w-5" />
                  <span>Activities</span>
                </div>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-3 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow text-blue-700'
                      : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-700'
                  )
                }
              >
                <div className="flex items-center justify-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Resources</span>
                </div>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Why Workplace Mental Health Matters</h3>
                    <p className="mb-4">
                      Mental health in the workplace is essential for productivity, employee satisfaction, and overall business success. Organizations that prioritize mental wellbeing see reduced absenteeism, lower turnover, and increased innovation.
                    </p>
                    <p>
                      Our resources are designed to help businesses of all sizes implement effective mental health initiatives that benefit both employees and the bottom line.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold mb-4">Benefits of Our Program</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">✓</span>
                        <span>Access to expert-led workshops and training</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">✓</span>
                        <span>Interactive activities for team building and stress reduction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">✓</span>
                        <span>Resources for creating mental health policies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">✓</span>
                        <span>Crisis support and intervention strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">✓</span>
                        <span>Customizable solutions for businesses of all sizes</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-2xl font-bold mb-6">Getting Started</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="rounded-full bg-blue-100 p-3 w-fit mb-4">
                        <span className="text-2xl">1</span>
                      </div>
                      <h4 className="font-semibold mb-2">Assess Your Needs</h4>
                      <p className="text-gray-600">
                        Complete our workplace assessment to identify areas for improvement.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="rounded-full bg-blue-100 p-3 w-fit mb-4">
                        <span className="text-2xl">2</span>
                      </div>
                      <h4 className="font-semibold mb-2">Explore Resources</h4>
                      <p className="text-gray-600">
                        Browse our workshops, activities, and policy templates.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="rounded-full bg-blue-100 p-3 w-fit mb-4">
                        <span className="text-2xl">3</span>
                      </div>
                      <h4 className="font-semibold mb-2">Implement & Track</h4>
                      <p className="text-gray-600">
                        Deploy initiatives and measure their impact on your organization.
                      </p>
                    </div>
                  </div>
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Workplace Mental Health Workshops</h2>
                  <p className="text-gray-600">
                    Expert-led sessions designed to equip organizations with tools and strategies for supporting mental wellbeing.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {workshops.map((workshop) => (
                    <WorkplaceWorkshopCard
                      key={workshop.id}
                      id={workshop.id}
                      title={workshop.title}
                      description={workshop.description}
                      date={workshop.date}
                      duration={workshop.duration}
                      level={workshop.level}
                      tags={workshop.tags}
                      image={workshop.image}
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button 
                    onClick={() => navigate("/workshops")} 
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    View All Workshops
                  </Button>
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Workplace Mental Health Activities</h2>
                  <p className="text-gray-600">
                    Interactive exercises to promote team building, stress reduction, and mental wellbeing in the workplace.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {games.map((game) => (
                    <WorkplaceGameCard
                      key={game.id}
                      id={game.id}
                      title={game.title}
                      description={game.description}
                      duration={game.duration}
                      difficulty={game.difficulty}
                      color={game.color}
                      colorText={game.colorText}
                      icon={game.icon}
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button 
                    onClick={() => navigate("/games-and-quizzes")} 
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    View All Activities
                  </Button>
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Resources for Employers</h2>
                  <p className="text-gray-600">
                    Practical tools and guidance for implementing effective mental health initiatives in your organization.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-3">Policy Templates</h3>
                    <p className="text-gray-600 mb-4">
                      Customizable mental health policy templates for businesses of all sizes.
                    </p>
                    <Button variant="outline" size="sm">Download Templates</Button>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-3">Implementation Guides</h3>
                    <p className="text-gray-600 mb-4">
                      Step-by-step guidance for launching mental health initiatives.
                    </p>
                    <Button variant="outline" size="sm">View Guides</Button>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-3">Crisis Response Protocol</h3>
                    <p className="text-gray-600 mb-4">
                      Guidelines for supporting employees during mental health crises.
                    </p>
                    <Button variant="outline" size="sm">Access Protocol</Button>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-3">ROI Calculator</h3>
                    <p className="text-gray-600 mb-4">
                      Estimate the financial benefits of workplace mental health programs.
                    </p>
                    <Button variant="outline" size="sm">Use Calculator</Button>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        <SubmitWorkplaceResource />
      </div>
    </Page>
  );
};

export default WorkplaceMentalHealth;
