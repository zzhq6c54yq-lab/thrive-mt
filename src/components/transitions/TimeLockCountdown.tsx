import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeLockCountdownProps {
  unlockTime: Date;
}

const TimeLockCountdown: React.FC<TimeLockCountdownProps> = ({ unlockTime }) => {
  const [remaining, setRemaining] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = unlockTime.getTime() - now.getTime();
      if (diff <= 0) {
        setIsUnlocked(true);
        setRemaining('');
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setRemaining(`${hours}h ${minutes}m`);
    };

    update();
    const interval = setInterval(update, 60000); // update every minute
    return () => clearInterval(interval);
  }, [unlockTime]);

  if (isUnlocked) return null;

  return (
    <div className="flex flex-col items-center gap-2 py-4 text-center">
      <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
        <Clock className="w-6 h-6 text-amber-400" />
      </div>
      <p className="text-amber-300 font-semibold text-sm">
        Available in {remaining}
      </p>
      <p className="text-gray-500 text-xs max-w-[250px]">
        Take time to reflect on yesterday's work. This day unlocks after a 12-hour reflection period.
      </p>
    </div>
  );
};

export default TimeLockCountdown;
