
import React from "react";

const PlaceholderMiniGame = ({ title = "Feature" }) => (
  <div className="flex flex-col items-center justify-center min-h-[200px] p-8 bg-zinc-100 rounded shadow">
    <h3 className="text-xl font-bold text-zinc-700 mb-2">{title}</h3>
    <p className="text-zinc-500">Coming soon!</p>
  </div>
);

export default PlaceholderMiniGame;
