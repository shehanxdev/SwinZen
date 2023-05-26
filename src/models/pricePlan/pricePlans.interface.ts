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
