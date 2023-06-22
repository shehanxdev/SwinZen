import { SortDataType } from '@sz/constants';

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

export interface SubscriptionQueryData {
  offset?: number;
  limit?: number;
  sortBy?: SortDataType;
}

export interface PlanQueryData {
  planId?: string;
}

export interface SubscriptionResponse {
  results: Array<SubscribedData>;
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface Subscription {
  id: string;
  planId: string;
  userId: string;
  startDate: string;
  endDate: string;
  isActive: true;
  createdAt: string;
  updatedAt: string;
}

export interface SubscribedData {
  id: string;
  userId: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  plan: Plan;
}

export interface FinalPlanData extends Plan {
  productId: string; //productID configured on play console and app store connect. Not works on Amazon related stores.
}
