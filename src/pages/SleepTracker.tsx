
import React from "react";
import Page from "@/components/Page";
import GameSleepTracker from "@/components/games/GameSleepTracker";

const SleepTracker: React.FC = () => {
  return (
    <Page title="Sleep Tracker" returnToMain>
      <div className="container mx-auto px-4 py-8">
        <GameSleepTracker />
      </div>
    </Page>
  );
};

export default SleepTracker;
