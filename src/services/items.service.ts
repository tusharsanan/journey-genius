import { JourneyItem } from "../types/journey-item-types";

export async function fetchItemsData(
  itemValue: string,
  itemType: string
): Promise<JourneyItem[]> {
  let url = `http://localhost:3000/journeyData?title_like=${itemValue}`;

  if (itemType && itemType !== "") {
    url += `&type=${itemType}`;
  }
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error while fetching items data: " + response.statusText);
  }
  return response.json() as Promise<JourneyItem[]>;
}
