export interface BeerStructure {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  first_brewed: string;
  abv: number;
  ibu: number;
  ebc: number;
  food_pairing: string[];
  brewers_tips: string;
}
