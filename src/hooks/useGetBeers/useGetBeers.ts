import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import { getBeersQuery } from "../../utils/queryKeys";
import getBeers, { GetBeersParams } from "../../api/getBeers/getBeers";
import { ApiBeersResponse, BeersStructure } from "../../types/types";
import { useMemo } from "react";

type UseGetBeersParams = GetBeersParams;
interface UseGetBeersStructure {
  beers: BeersStructure | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  isSuccess: boolean;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ApiBeersResponse | null, Error>>;
}

const useGetBeers = (params?: UseGetBeersParams): UseGetBeersStructure => {
  const { data, isLoading, isError, error, isFetching, isSuccess, refetch } =
    useQuery({
      queryKey: [getBeersQuery, params?.page, params?.abv_lt],
      queryFn: () => {
        if (params?.beer_name === null) {
          return null;
        }

        return getBeers(params);
      },
    });

  const beers = useMemo(() => {
    if (data) {
      return data
        .filter((beer) => {
          return beer.description && beer.name;
        })
        .map((beer) => ({
          name: beer.name,
          image_url: beer.image_url,
          id: beer.id,
          abv: beer.abv,
          brewers_tips: beer.brewers_tips,
          description: beer.description,
          ebc: beer.ebc,
          first_brewed: beer.first_brewed,
          food_pairing: beer.food_pairing,
          ibu: beer.ibu,
          tagline: beer.tagline,
        }));
    }
  }, [data]);

  if (data?.length && !beers?.length && isSuccess) {
    refetch();
  }

  return { beers, isLoading, isError, error, isFetching, isSuccess, refetch };
};

export default useGetBeers;
