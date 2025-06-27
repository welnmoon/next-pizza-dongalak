import { Story, StoryItem } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export type IStory = Story & {
  items: StoryItem[];
};

export const getAll = async (): Promise<IStory[]> => {
  return (await axiosInstance.get<IStory[]>(ApiRoutes.STORY)).data;
};
