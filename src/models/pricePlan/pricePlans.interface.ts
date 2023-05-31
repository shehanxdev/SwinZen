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
  banner?: string;
  frequency?: string;
  price: number;
  currency: string;
  actions: Array<string>;
  features: Array<string>;
  createdAt: string;
  updatedAt: string;
}
