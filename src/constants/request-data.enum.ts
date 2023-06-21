export enum SortDataType {
  NAME = 'name:asc',
  PRICE = 'price:asc',
  DESCRIPTION = 'description:asc',
  CREATED = 'createdAt:asc',
  UPDATED = 'updatedAt:asc',
  UPDATED_DESCEND = 'updatedAt:desc',
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
