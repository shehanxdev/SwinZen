export enum SortDataType {
  NAME = 'name:asc',
  PRICE = 'price:asc',
  DESCRIPTION = 'description:asc',
  CREATED = 'createdAt:asc',
  UPDATED = 'updatedAt:asc',
}

export enum NotificationsType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
  IN_APP = 'IN_APP',
}

export enum FilesType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export enum ScoreType {
  OVERALL = 'Overall',
  SETUP = 'Set up',
  BACKSWING = 'Back swing',
  DOWNSWING = 'Down swing',
}

export enum SubscriptionType {
  FREE = 'FREE',
  PAID = 'PAID',
}

export enum VideoStatusType {
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REJECTED = 'REJECTED',
}

export enum VideoType {
  DOWN_THE_LINE = 'Down The Line',
  FACEON = 'Face On',
  SWINGZEN_UNI = 'Swingzen-University',
}
