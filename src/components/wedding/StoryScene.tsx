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
      className="relative w-screen h-screen snap-start snap-always overflow-hidden flex-shrink-0"
    >
      <ChapterCard event={event} />
      <ScrollIndicator />
    </section>
  );
};

export default StoryScene;
