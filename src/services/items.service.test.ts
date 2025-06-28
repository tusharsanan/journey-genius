import sinon from "sinon";
import { expect } from "chai";
import { fetchItemsData } from "./items.service";

describe("items.service", () => {
  let fetchStub: sinon.SinonStub;

  beforeEach(() => {
    fetchStub = sinon.stub(window, "fetch");
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it("fetchItemsData should fetch data from the correct URL and return JSON on success", async () => {
    const mockData = [{ id: 1, name: "Test Item" }];
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockData),
    };

    fetchStub.resolves(mockResponse as any);

    const result = await fetchItemsData("cafe", "hotel");

    expect(
      fetchStub.calledOnceWith(
        "http://localhost:3000/journeyData?title_like=cafe&type=hotel"
      )
    ).to.be.true;

    expect(result).to.deep.equal(mockData);
  });
});
