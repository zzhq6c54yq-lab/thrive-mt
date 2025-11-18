import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface Tool {
  name: string;
  path: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  tools: Tool[];
}

interface ToolCategoryCardProps {
  category: Category;
  isExpanded: boolean;
  onToggle: () => void;
  onToolClick: (path: string) => void;
}

export default function ToolCategoryCard({
  category,
  isExpanded,
  onToggle,
  onToolClick,
}: ToolCategoryCardProps) {
  const Icon = category.icon;

  return (
    <div className="bg-gray-900/50 rounded-lg border border-gray-700/50 overflow-hidden">
      {/* Category Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
            category.color
          )}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-white">{category.name}</h3>
            <p className="text-xs text-gray-400">{category.tools.length} tools available</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Expanded Tools */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-700/50"
          >
            <div className="p-4 space-y-2">
              {category.tools.map((tool, index) => (
                <motion.div
                  key={tool.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors group"
                >
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">{tool.name}</p>
                    <p className="text-xs text-gray-400">{tool.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToolClick(tool.path)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Open
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
