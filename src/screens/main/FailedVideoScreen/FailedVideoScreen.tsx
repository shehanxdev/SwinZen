import React from 'react';

import { BaseScreen } from '../../components/BaseScreen';
import { VideoUploadErrorCard } from '../components';

export function FailedVideoScreen() {
  return (
    <BaseScreen>
      <VideoUploadErrorCard isLinkAvailable={false} hasFooter={false} />
    </BaseScreen>
  );
}
