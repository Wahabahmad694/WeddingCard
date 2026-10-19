import { FC } from "react";
import { WeddingEvent } from "@/data/weddingData";
import ChapterCard from "./ChapterCard";
import ScrollIndicator from "./ScrollIndicator";

interface StorySceneProps {
  event: WeddingEvent;
}

const StoryScene: FC<StorySceneProps> = ({ event }) => {
  return (
    <section
      id={event.id}
      className="relative w-full min-h-[100svh] snap-start snap-always flex-shrink-0"
    >
      <ChapterCard event={event} />
      <ScrollIndicator />
    </section>
  );
};

export default StoryScene;
