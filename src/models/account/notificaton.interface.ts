import { NotificationsType, SortDataType } from '@sz/constants';

export interface NotificationData {
  notificationType: NotificationsType;
  payload: string;
  title: string;
  isRead: boolean;
}

export interface NotificationsQueryData {
  offset?: number;
  limit?: number;
  notificationType?: NotificationsType;
  isRead?: boolean;
  sortBy?: SortDataType;
}

export interface NotificationResponse {
  results: Array<Notification>;
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface Notification {
  id: string;
  userId: string;
  notificationType: NotificationsType;
  payload: string;
  title: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
