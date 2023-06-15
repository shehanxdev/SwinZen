import { Asset } from 'react-native-image-picker';

import { PreSignedResponse } from '../../models';
import { APIError, HttpServiceInstance } from '../http-service';

export class S3Service {
  static async uploadMediaToS3(preSignedData: PreSignedResponse, mediaFile: Asset) {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    const formData = new FormData();
    const fields = preSignedData.fields;

    const file = {
      uri: mediaFile.uri,
      type: mediaFile.type,
      name: mediaFile.fileName,
    };

    // To ignore last two items from the object
    const ignoreLastTwoItems = obj => Object.fromEntries(Object.entries(obj).slice(0, -2));

    Object.entries(ignoreLastTwoItems(fields)).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('Content-Type', mediaFile.type);
    formData.append('file', file);

    const response = await httpServiceInstance
      .getApiSauceInstance()
      .post(preSignedData.url, formData, { headers: { 'content-type': 'multipart/form-data' } });

    if (!response.ok) {
      throw new APIError('UNKNOWN_ERROR');
    }
  }
}
