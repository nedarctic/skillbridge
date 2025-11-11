export type user = {
  id: number;
  name: string;
  skill: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  bio: string;
  profile: string;
  about: string;
  services: string[];
};

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Rating {
  id: string;
  profile: string;
  score: number;
  rated_by: User;
  created_at: string; // ISO timestamp
}

export interface Review {
  id: string;
  profile: string;
  review_text: string;
  reviewed_by: User;
  created_at: string; // ISO timestamp
}

export interface Profile {
  id: string;
  user: User;
  name: string;
  skill: string;
  experience: string;
  location: string;
  bio: string;
  about: string;
  profile_image: string; // URL
  average_rating: number;
  total_reviews: number;
  services: string[];
  ratings: Rating[];
  reviews: Review[];
}
