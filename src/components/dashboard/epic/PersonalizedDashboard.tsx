import React from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDashboardLayout } from '@/hooks/useDashboardLayout';
import YourDaySection from './sections/YourDaySection';
import QuickAccessSection from './sections/QuickAccessSection';
import ToolkitSection from './sections/ToolkitSection';
import ProgressSection from './sections/ProgressSection';
import { DashboardData } from '@/hooks/useTodayDashboard';
import { GripVertical } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SortableSectionProps {
  id: string;
  children: React.ReactNode;
  isDragEnabled: boolean;
}

function SortableSection({ id, children, isDragEnabled }: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id, disabled: !isDragEnabled });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  
  return (
    <div ref={setNodeRef} style={style} className="relative">
      {isDragEnabled && (
        <div
          {...attributes}
          {...listeners}
          className="absolute -left-8 top-4 cursor-grab active:cursor-grabbing opacity-50 hover:opacity-100 transition-opacity z-10"
        >
          <GripVertical className="w-5 h-5 text-white" />
        </div>
      )}
      {children}
    </div>
  );
}

interface PersonalizedDashboardProps {
  dashboardData: DashboardData;
  onCheckInComplete: () => void;
  userGoals: string[];
}

export default function PersonalizedDashboard({
  dashboardData,
  onCheckInComplete,
  userGoals
}: PersonalizedDashboardProps) {
  const {
    sectionOrder,
    isLocked,
    loading,
    reorderSections
  } = useDashboardLayout();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id as string);
      const newIndex = sectionOrder.indexOf(over.id as string);
      
      const newOrder = [...sectionOrder];
      newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, active.id as string);
      
      reorderSections(newOrder);
    }
  };
  
  const sectionComponents: Record<string, React.ReactNode> = {
    'your-day': (
      <YourDaySection 
        dashboardData={dashboardData}
        onCheckInComplete={onCheckInComplete}
      />
    ),
    'quick-access': (
      <QuickAccessSection />
    ),
    'toolkit': (
      <ToolkitSection userGoals={userGoals} />
    ),
    'progress': (
      <ProgressSection dashboardData={dashboardData} />
    )
  };
  
  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 bg-white/10" />
        <Skeleton className="h-96 bg-white/10" />
        <Skeleton className="h-64 bg-white/10" />
      </div>
    );
  }
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sectionOrder}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-6">
          {sectionOrder.map((sectionId) => (
            <SortableSection
              key={sectionId}
              id={sectionId}
              isDragEnabled={!isLocked}
            >
              {sectionComponents[sectionId]}
            </SortableSection>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
