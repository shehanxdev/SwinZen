import { SortDataType, SubscriptionType, VideoStatusType, VideoType } from '@sz/constants';

import { PaginatedQuery } from '../base';

export interface VideoCatQueryData extends PaginatedQuery {
  sortBy?: SortDataType;
  name?: string;
  subscriptionType?: SubscriptionType;
}

export interface VideoCatResponse {
  results: Array<VideoCatData>;
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface VideoCatData {
  id: string;
  name: string;
  subscriptionType: SubscriptionType;
  thumbnailUrl: string;
  videos: Array<VideoData>;
  createdAt: string;
  updatedAt: string;
}

export interface VideoData {
  id: string;
  name: string;
  userId: string;
  videoType: VideoType;
  videoUrl: string;
  thumbnailUrl: string;
  status: VideoStatusType;
  failureReasons?: Array<string>;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
