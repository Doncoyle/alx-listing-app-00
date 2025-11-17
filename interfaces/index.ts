export interface PropertyAddress {
  state: string;
  city: string;
  country: string;
}

export interface PropertyOffers {
  bed: string;
  shower: string;
  occupants: string;
}

export interface PropertyProps {
  name: string;
  address: PropertyAddress;
  rating: number;
  category: string[];
  price: number;
  offers: PropertyOffers;
  image: string;
  discount: string;
}

