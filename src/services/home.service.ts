import { JourneyItem } from "../types/journey-item-types";

export async function fetchHomePageData(): Promise<JourneyItem[]> {
  const response = await fetch("http://localhost:3000/home");
  if (!response.ok) {
    throw new Error(
      "Error while fetching homepage data: " + response.statusText
    );
  }
  return response.json() as Promise<JourneyItem[]>;
}
