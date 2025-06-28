export interface Review {
  id: number;
  user: {
    id: number;
    name: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export interface Location {
  address: string;
  city: string;
  country: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  features: string;
}

export interface JourneyItem {
  id: number;
  title: string;
  description: string;
  type: string;
  image: string;
  location: Location;
  averageRating: number;
  numberOfReviews: number;
  categories: string[];
  reviews: Review[];
  contactInfo: ContactInfo;
}
