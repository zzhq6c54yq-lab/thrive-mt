import React from "react";
import { Users, MessageSquare, VideoIcon, UserRound, Clock, Heart, Activity, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTranslation from "@/hooks/useTranslation";
import ResourceCard from "./ResourceCard";
import { motion } from "framer-motion";

interface CommunitiesTabProps {
  onFeatureClick: (path: string) => void;
}

const CommunitiesTab: React.FC<CommunitiesTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  
  const communityOptions = [
    {
      id: "general-community",
      title: isSpanish ? "Comunidad General" : "General Community",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      description: isSpanish 
        ? "Conecta con la comunidad general de apoyo para el cáncer"
        : "Connect with the general cancer support community",
      path: "general-community",
      activeUsers: 86,
      newPosts: 12
    },
    {
      id: "cancer-type-communities",
      title: isSpanish ? "Comunidades por Tipo de Cáncer" : "Cancer Type Communities",
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      description: isSpanish 
        ? "Encuentra grupos específicos para tu tipo de cáncer"
        : "Find specific groups for your type of cancer",
      path: "cancer-type-communities",
      activeUsers: 124,
      newPosts: 18
    },
    {
      id: "virtual-meetings",
      title: isSpanish ? "Reuniones Virtuales" : "Virtual Meetings",
      icon: <VideoIcon className="h-5 w-5 text-blue-500" />,
      description: isSpanish 
        ? "Calendario de próximas reuniones virtuales y eventos"
        : "Calendar of upcoming virtual meetings and events",
      path: "virtual-meetings",
      upcomingEvents: 5
    },
    {
      id: "one-on-one",
      title: isSpanish ? "Conexiones Individuales" : "One-on-One Connections",
      icon: <UserRound className="h-5 w-5 text-blue-500" />,
      description: isSpanish 
        ? "Conecta individualmente con compañeros de apoyo"
        : "Connect individually with support companions",
      path: "one-on-one",
      availableNow: 8
    }
  ];
  
  const specialCommunities = [
    {
      id: "young-adults",
      title: isSpanish ? "Adultos Jóvenes" : "Young Adults",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      path: "young-adults"
    },
    {
      id: "metastatic",
      title: isSpanish ? "Cáncer Metastásico" : "Metastatic Cancer",
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      path: "metastatic"
    },
    {
      id: "caregivers-circle",
      title: isSpanish ? "Círculo de Cuidadores" : "Caregivers Circle",
      icon: <Heart className="h-5 w-5 text-blue-500" />,
      path: "caregivers-circle"
    },
    {
      id: "survivorship-community",
      title: isSpanish ? "Comunidad de Sobrevivientes" : "Survivorship Community",
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      path: "survivorship-community"
    }
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-3">
          {isSpanish ? "Comunidades de Apoyo" : "Support Communities"}
        </h2>
        <p className="text-muted-foreground">
          {isSpanish 
            ? "Conéctate con otros afectados por el cáncer para compartir experiencias y apoyo." 
            : "Connect with others affected by cancer to share experiences and support."}
        </p>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {communityOptions.map(community => {
          const badges = [];
          if (community.activeUsers) badges.push({ label: isSpanish ? "activos" : "active", value: community.activeUsers, icon: <Users className="w-3 h-3" /> });
          if (community.newPosts) badges.push({ label: isSpanish ? "nuevos" : "new", value: community.newPosts, icon: <MessageSquare className="w-3 h-3" /> });
          if (community.upcomingEvents) badges.push({ label: isSpanish ? "próximos" : "upcoming", value: community.upcomingEvents, icon: <CalendarIcon className="w-3 h-3" /> });
          if (community.availableNow) badges.push({ label: isSpanish ? "disponibles" : "available", value: community.availableNow, icon: <UserRound className="w-3 h-3" /> });
          
          return (
            <motion.div key={community.id} variants={item}>
              <ResourceCard
                title={community.title}
                description={community.description}
                icon={community.icon}
                onClick={() => onFeatureClick(community.path)}
                buttonText={isSpanish ? "Unirse" : "Join"}
                colorTheme="blue"
                badges={badges}
              />
            </motion.div>
          );
        })}
      </motion.div>
      
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-5">
        <h3 className="font-medium text-blue-600 dark:text-blue-400 mb-4">
          {isSpanish ? "Comunidades Especializadas" : "Specialized Communities"}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {specialCommunities.map(community => (
            <Button 
              key={community.id}
              variant="outline" 
              className="border-blue-300 text-blue-600 dark:border-blue-800 dark:text-blue-400 justify-start"
              onClick={() => onFeatureClick(community.path)}
            >
              {community.icon}
              <span className="ml-2">{community.title}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => onFeatureClick("cancer-support/create-group")}
        >
          <Users className="mr-2 h-4 w-4" />
          {isSpanish ? "Crear un Nuevo Grupo" : "Create a New Group"}
        </Button>
      </div>
    </div>
  );
};

export default CommunitiesTab;
