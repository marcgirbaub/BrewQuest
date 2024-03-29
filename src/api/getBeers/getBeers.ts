import { AxiosResponse } from "axios";
import apiClient from "../apiClient";
import { beersEndpoint } from "../endpoints";
import { ApiBeersResponse } from "../../types/types";

export interface GetBeersParams {
  beer_name?: string | null;
  brewed_before?: string | null;
  page?: number;
  per_page?: number;
  abv_lt?: number;
}

const getBeers = async (params?: GetBeersParams) => {
  const beers: AxiosResponse<ApiBeersResponse> = await apiClient.get(
    beersEndpoint,
    {
      params: params,
    },
  );

  return beers.data;
};

export default getBeers;
