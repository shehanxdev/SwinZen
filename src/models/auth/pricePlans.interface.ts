export interface PricePlansResponse {
  limit: number;
  page: number;
  results: Array<Plan>;
  totalPages: number;
  totalResults: number;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  banner: string | null;
  frequency: string | null;
  price: number;
  currency: string;
  features: Array<string>;
  createdAt: string;
  updatedAt: string;
}
