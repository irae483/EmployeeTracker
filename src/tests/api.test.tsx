import * as api from "../services/api/api"
import data from './json/crew.json';

describe('API calls', () => {
  const fakeFetch = jest.fn();

  beforeAll(() => {

    window.fetch = fakeFetch; //if running browser environment
  });

  beforeEach(() => {

  });
  afterEach(() => {

  });

  it("will return an empty list of jobs.",
    async (done) => {

      fakeFetch.mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => {
            return Promise.resolve([]);
          }
        });
      });
      const jobs = await api.getJobs(0, 1, [], true, true, true, null);


      expect(jobs.length).toBe(0);
      fakeFetch.mockClear();
      done();

    });

  it("will return a list of 15 crew objects.",
    async (done) => {

      fakeFetch.mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => {
            return Promise.resolve(data);
          }
        });
      });
      const crews = await api.getCrews();


      expect(crews.length).toBe(15);
      fakeFetch.mockClear();
      done();
    }
  );
});