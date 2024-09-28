"use client";

import { Button } from "@/components/ui/button";
import { AlignJustify, Grid2X2 } from "lucide-react";
import React from "react";

const LayoutSwitch = () => {
  const [activeView, setActiveView] = React.useState("list");

  return (
    <div>
      <Button
        variant={activeView === "grid" ? "default" : "outline"}
        size="icon"
        className="rounded-r-none"
        onClick={() => setActiveView("grid")}
      >
        <Grid2X2 className="w-4 h-4" />
      </Button>
      <Button
        variant={activeView === "list" ? "default" : "outline"}
        size="icon"
        className="rounded-l-none"
        onClick={() => setActiveView("list")}
      >
        <AlignJustify className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default LayoutSwitch;
