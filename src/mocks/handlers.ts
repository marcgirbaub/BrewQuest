import { HttpResponse, http } from "msw";
import { baseURL, beersEndpoint } from "../api/apiEndpoints";
import { mockBeersResponse } from "./beerMocks";

export const handlers = [
  http.get(`${baseURL}${beersEndpoint}`, () => {
    return HttpResponse.json(mockBeersResponse);
  }),
];
