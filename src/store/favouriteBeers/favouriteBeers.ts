import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BeerStructure, BeersStructure } from "../../types/types";

interface FavouriteBeersStore {
  favouriteBeers: BeersStructure;
  addFavouriteBeer: (beer: BeerStructure) => void;
  removeFavouriteBeer: (id: number) => void;
  getIsFavouriteBeer: (id: number) => boolean;
  toggleFavouriteBeer: (beer: BeerStructure) => void;
}

export const useFavorutiBeersStore = create<FavouriteBeersStore>()(
  persist(
    (set, get) => ({
      favouriteBeers: [],

      addFavouriteBeer: (beer: BeerStructure) =>
        set((state) => ({
          favouriteBeers: [...state.favouriteBeers, beer],
        })),

      removeFavouriteBeer: (id: number) =>
        set((state) => ({
          favouriteBeers: state.favouriteBeers.filter((beer) => beer.id !== id),
        })),

      getIsFavouriteBeer: (id: number) =>
        get().favouriteBeers.some((beer) => beer.id === id),

      toggleFavouriteBeer: (beer: BeerStructure) => {
        const isFavourite = get().getIsFavouriteBeer(beer.id);

        if (isFavourite) {
          get().removeFavouriteBeer(beer.id);
        } else {
          get().addFavouriteBeer(beer);
        }
      },
    }),
    { name: "favouriteBeers" },
  ),
);
