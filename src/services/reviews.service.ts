import { JourneyItem } from "../types/journey-item-types";

export async function patchReviews(
  itemId: number,
  averageRating: number
): Promise<JourneyItem> {
  let url = `http://localhost:3000/journeyData/${itemId}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ numberOfReviews: averageRating + 1 }),
  });

  if (!response.ok) {
    throw new Error(
      "Error while submitting the review: " + response.statusText
    );
  }

  return response.json() as Promise<JourneyItem>;
}
