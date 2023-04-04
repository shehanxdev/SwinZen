import React from 'react';
import tw from 'twrnc';

import { SubscriptionCard, Text } from '@sz/components';
import { Color, TextVariant } from '@sz/constants';

//TODO remove this file only for dev purpose
import { BaseAuthScreen } from './auth/components';

export function TestScreen() {
  return (
    <BaseAuthScreen>
      <SubscriptionCard
        // buttonColor={Color.Neutral.Sz100}
        // buttontextColor={Color.Primary.Sz600}
        //hasBorder={true}
        style={tw`mt-5`}
        title="SwinZen Free"
        subTitle={`Start your account with a stunning profile & free features`}
        price={0}
        pricingDescription="Absolutely free "
        featureList={['Has ads', 'Only 5 uploads per month', `Access to the analyzed video playback and data`]}
      />
    </BaseAuthScreen>
  );
}
