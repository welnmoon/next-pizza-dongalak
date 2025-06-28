"use client";

import { Api } from "@/services/api-client";
import { Story, StoryItem } from "@prisma/client";
import { useEffect, useState } from "react";
import Container from "../Container";
import { Skeleton } from "../ui/skeleton";
import { IStory } from "@/services/story";
import ReactInstaStories from "react-insta-stories";
import { X } from "lucide-react";

const Stories = () => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<IStory | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await Api.story.getAll();
        setStories(response);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  const handleStoryClick = (storyItem: IStory) => {
    setSelectedStory(storyItem);
  };

  const handleNextStory = () => {
    if (!selectedStory) return;

    const currentIndex = stories.findIndex((s) => s.id === selectedStory.id);
    const nextStory =
      stories.length > currentIndex + 1 ? stories[currentIndex + 1] : null;

    if (nextStory) {
      setSelectedStory(nextStory);
    } else {
      setSelectedStory(null);
    }
  };

  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = "hidden"; // Блокируем scroll
    } else {
      document.body.style.overflow = ""; // Возвращаем scroll
    }

    return () => {
      document.body.style.overflow = ""; // На всякий случай — при размонтировании
    };
  }, [selectedStory]);

  return (
    <Container className="flex gap-4 mb-10 overflow-x-auto scrollbar-hide">
      {stories.length === 0 &&
        Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-[250px] mb-2" />
          ))}

      {stories.map((story) => (
        <img
          onClick={() => handleStoryClick(story)}
          key={story.id}
          alt="Story Preview"
          src={story.previewImageUrl}
          className="w-[250px] h-[300px] rounded-lg"
        ></img>
      ))}

      {selectedStory && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
          <button className="absolute top-4 right-4 p-2 bg-white z-40 rounded-full">
            <X onClick={() => setSelectedStory(null)} />
          </button>
          {selectedStory.items && selectedStory.items.length > 0 && (
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <ReactInstaStories
                storyContainerStyles={{
                  borderRadius: "100px",
                }}
                key={selectedStory.id}
                onAllStoriesEnd={handleNextStory}
                stories={selectedStory.items.map((i) => ({
                  url: i.sourceUrl,
                }))}
                defaultInterval={3000}
                width={520}
                height={800}
                progressContainerStyles={{ marginTop: "10px" }}
              />
            </div>
          )}

          {selectedStory.items && selectedStory.items.length === 0 && (
            <div>
              <ReactInstaStories
                onAllStoriesEnd={() => setSelectedStory(null)}
                stories={
                  selectedStory.previewImageUrl
                    ? [{ url: selectedStory.previewImageUrl }]
                    : []
                }
                defaultInterval={3000}
                key={selectedStory.id}
                width={520}
                height={800}
                storyInnerContainerStyles={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "orange",
                }}
                storyStyles={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
                storyContainerStyles={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
                onStoryEnd={handleNextStory}
              />
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Stories;
