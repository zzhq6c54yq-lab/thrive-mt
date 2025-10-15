import React from 'react';
import { Button } from '@/components/ui/button';
import { SupportWallCategory } from '@/hooks/useSupportWall';
import { Sparkles, Heart, ThumbsUp, HelpCircle, BookOpen, MessageCircle } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: SupportWallCategory | 'all';
  onCategoryChange: (category: SupportWallCategory | 'all') => void;
}

const categories: { value: SupportWallCategory | 'all'; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'all', label: 'All', icon: <MessageCircle className="h-4 w-4" />, color: 'slate' },
  { value: 'celebration', label: 'Celebrations', icon: <Sparkles className="h-4 w-4" />, color: 'yellow' },
  { value: 'struggling', label: 'Struggling', icon: <Heart className="h-4 w-4" />, color: 'blue' },
  { value: 'gratitude', label: 'Gratitude', icon: <ThumbsUp className="h-4 w-4" />, color: 'green' },
  { value: 'question', label: 'Questions', icon: <HelpCircle className="h-4 w-4" />, color: 'orange' },
  { value: 'resource', label: 'Resources', icon: <BookOpen className="h-4 w-4" />, color: 'teal' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat.value}
          variant={selectedCategory === cat.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(cat.value)}
          className={`${
            selectedCategory === cat.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-card-foreground hover:bg-accent'
          }`}
        >
          {cat.icon}
          <span className="ml-2">{cat.label}</span>
        </Button>
      ))}
    </div>
  );
};
