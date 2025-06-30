import { expect } from "chai";
import sinon from "sinon";
import { patchReviews } from "./reviews.service";
import { JourneyItem } from "../types/journey-item-types";

describe("patchReviews", () => {
  let fetchStub: sinon.SinonStub;

  const fakeJourneyItem: JourneyItem = {
    id: 1,
  } as JourneyItem;

  beforeEach(() => {
    fetchStub = sinon.stub(window, "fetch");
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it("should PATCH to the correct URL with correct body", async () => {
    const itemId = 42;
    const averageRating = 3;
    const expectedBody = JSON.stringify({ numberOfReviews: averageRating + 1 });

    fetchStub.resolves({
      ok: true,
      json: async () => fakeJourneyItem,
    } as Response);

    await patchReviews(itemId, averageRating);

    expect(fetchStub.calledOnce).to.be.true;
    const [url, options] = fetchStub.firstCall.args;
    expect(url).to.equal(`http://localhost:3000/journeyData/${itemId}`);
    expect(options.method).to.equal("PATCH");
    expect(options.headers["Content-Type"]).to.equal("application/json");
    expect(options.body).to.equal(expectedBody);
  });

  it("should return the parsed JourneyItem on success", async () => {
    fetchStub.resolves({
      ok: true,
      json: async () => fakeJourneyItem,
      statusText: "OK",
    } as Response);

    const result = await patchReviews(1, 2);
    expect(result).to.equal(fakeJourneyItem);
  });

  it("should throw an error if response is not ok", async () => {
    fetchStub.resolves({
      ok: false,
      statusText: "Bad Request",
      json: async () => ({}),
    } as Response);

    try {
      await patchReviews(1, 2);
      expect.fail("Expected error was not thrown");
    } catch (err: any) {
      expect(err.message).to.include("Error while submitting the review");
      expect(err.message).to.include("Bad Request");
    }
  });
});
