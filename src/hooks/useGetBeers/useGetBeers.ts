import { useQuery } from "@tanstack/react-query";
import { getBeersQuery } from "../../utils/queryKeys";
import getBeers from "../../api/getBeers/getBeers";
import { BeersStructure } from "../../types/types";

interface UseGetBeersParams {
  beer_name?: string;
  brewed_before?: string;
  page?: number;
  per_page?: number;
}

interface UseGetBeersStructure {
  beers: BeersStructure | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  isSuccess: boolean;
}

const useGetBeers = (params?: UseGetBeersParams): UseGetBeersStructure => {
  const { data, isLoading, isError, error, isFetching, isSuccess } = useQuery({
    queryKey: [getBeersQuery],
    queryFn: () => getBeers(params),
  });

  let beers: BeersStructure | undefined;

  if (data) {
    beers = data.map((beer) => {
      return {
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
      };
    });
  }

  return { beers, isLoading, isError, error, isFetching, isSuccess };
};

export default useGetBeers;