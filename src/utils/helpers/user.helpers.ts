import { User, UserData } from '@sz/models';

/**
 * Returns a mapped userdata according to the API reference
 *
 * @param {User} data - The user response data.
 * @returns {UserData} - The mapped user date.
 */
export function mapUserData(data: User): UserData {
  return {
    name: data.name,
    email: data.email,
    username: data.username,
    profilePicture: data.profilePicture,
    gender: data.gender,
    city: data.city,
    deviceId: data.deviceId,
    userStatus: data.userStatus,
    fcmTokens: data.fcmTokens,
  };
}
