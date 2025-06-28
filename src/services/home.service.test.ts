import sinon from "sinon";
import { expect } from "chai";
import { fetchHomePageData } from "./home.service";

describe("home.service", () => {
  let fetchStub: sinon.SinonStub;

  beforeEach(() => {
    fetchStub = sinon.stub(window, "fetch");
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it("fetchHomePageData should fetch data from the correct URL and return JSON on success", async () => {
    const mockData = [{ id: 1, name: "Test Item" }];
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockData),
    };

    fetchStub.resolves(mockResponse as any);

    const result = await fetchHomePageData();

    expect(fetchStub.calledOnceWith("http://localhost:3000/home")).to.be.true;
    expect(result).to.deep.equal(mockData);
  });

  it("fetchHomePageData should throw an error if response is not ok", async () => {
    const mockResponse = {
      ok: false,
      statusText: "Internal Server Error",
    };
    fetchStub.resolves(mockResponse as any);

    try {
      await fetchHomePageData();
      expect.fail("Expected error was not thrown");
    } catch (err: any) {
      expect(err.message).to.include("Error while fetching homepage data");
      expect(err.message).to.include("Internal Server Error");
    }
  });
});
