import { AxiosResponse } from "axios";
import apiClient from "../apiClient";
import { beersEndpoint } from "../apiEndpoints";
import { ApiBeersResponse } from "../../types/types";

interface GetBeersParams {
  beer_name?: string;
  brewed_before?: string;
  page?: number;
  per_page?: number;
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
