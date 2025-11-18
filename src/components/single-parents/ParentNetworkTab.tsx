import React from "react";
import { Card } from "@/components/ui/card";
import { Users, Calendar, Image, ListTodo } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import NetworkErrorBoundary from "./network/NetworkErrorBoundary";
import { NetworkLoadingSkeleton } from "./network/NetworkSkeleton";

const ConnectionManager = React.lazy(() => import("./network/ConnectionManager"));
const SharedCalendar = React.lazy(() => import("./network/SharedCalendar"));
const MediaGallery = React.lazy(() => import("./network/MediaGallery"));
const ActivityManager = React.lazy(() => import("./network/ActivityManager"));

interface ParentNetworkTabProps {
  onFeatureClick: (path: string) => void;
}

const ParentNetworkTab: React.FC<ParentNetworkTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();
  const [activeSection, setActiveSection] = React.useState<'connections' | 'calendar' | 'media' | 'activities'>('connections');

  const sections = [
    { id: 'connections' as const, label: isSpanish ? "Conexiones" : "Connections", icon: Users },
    { id: 'calendar' as const, label: isSpanish ? "Calendario" : "Calendar", icon: Calendar },
    { id: 'media' as const, label: isSpanish ? "Galería" : "Gallery", icon: Image },
    { id: 'activities' as const, label: isSpanish ? "Actividades" : "Activities", icon: ListTodo }
  ];

  const renderSection = () => {
    const fallback = <NetworkLoadingSkeleton type={activeSection} />;
    
    switch (activeSection) {
      case 'connections':
        return (
          <NetworkErrorBoundary key="connections" onReset={() => setActiveSection('connections')}>
            <React.Suspense fallback={fallback}>
              <ConnectionManager />
            </React.Suspense>
          </NetworkErrorBoundary>
        );
      case 'calendar':
        return (
          <NetworkErrorBoundary key="calendar" onReset={() => setActiveSection('calendar')}>
            <React.Suspense fallback={fallback}>
              <SharedCalendar />
            </React.Suspense>
          </NetworkErrorBoundary>
        );
      case 'media':
        return (
          <NetworkErrorBoundary key="media" onReset={() => setActiveSection('media')}>
            <React.Suspense fallback={fallback}>
              <MediaGallery />
            </React.Suspense>
          </NetworkErrorBoundary>
        );
      case 'activities':
        return (
          <NetworkErrorBoundary key="activities" onReset={() => setActiveSection('activities')}>
            <React.Suspense fallback={fallback}>
              <ActivityManager />
            </React.Suspense>
          </NetworkErrorBoundary>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {isSpanish ? "Red de Padres" : "Parent Network"}
        </h2>
        <p className="text-muted-foreground">
          {isSpanish 
            ? "Conéctate y colabora con otros padres"
            : "Connect and collaborate with other parents"}
        </p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeSection === section.id 
                  ? "bg-rose-500 text-white" 
                  : "bg-card hover:bg-muted text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          );
        })}
      </div>

      <Card className="p-6 bg-card">
        {renderSection()}
      </Card>
    </div>
  );
};

export default ParentNetworkTab;
