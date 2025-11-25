import { Crown } from "lucide-react";
import { useEffect, useState } from "react";

interface VideoSessionHeaderProps {
  clientName: string;
  sessionType: string;
  therapistCredentials: string;
  connectionQuality: 1 | 2 | 3 | 4;
}

export default function VideoSessionHeader({
  clientName,
  sessionType,
  therapistCredentials,
  connectionQuality
}: VideoSessionHeaderProps) {
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getConnectionLabel = () => {
    switch (connectionQuality) {
      case 4: return 'HD';
      case 3: return 'Good';
      case 2: return 'Fair';
      case 1: return 'Poor';
    }
  };

  const getConnectionColor = () => {
    switch (connectionQuality) {
      case 4: return 'text-green-400';
      case 3: return 'text-yellow-400';
      case 2: return 'text-orange-400';
      case 1: return 'text-red-400';
    }
  };

  return (
    <div className="bg-background/95 backdrop-blur-xl border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Logo and ThriveMT */}
        <div className="flex items-center gap-3">
          <Crown className="w-6 h-6 text-[hsl(var(--primary))]" />
          <span className="text-lg font-semibold text-foreground">ThriveMT</span>
        </div>

        {/* Center: Client Info */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-foreground">
            {clientName} • {sessionType}
          </h2>
          <p className="text-sm text-muted-foreground">{therapistCredentials}</p>
        </div>

        {/* Right: Timer and Connection */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-foreground">
              {formatTime(sessionTime)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`w-1 rounded-full transition-all ${
                    bar <= connectionQuality
                      ? 'bg-[hsl(var(--primary))] h-4'
                      : 'bg-muted h-2'
                  }`}
                  style={{ height: `${bar * 4}px` }}
                />
              ))}
            </div>
            <span className={`text-sm font-medium ${getConnectionColor()}`}>
              {getConnectionLabel()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
