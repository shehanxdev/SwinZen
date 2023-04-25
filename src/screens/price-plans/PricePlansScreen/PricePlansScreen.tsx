import React from 'react';
import { ScrollView, View } from 'react-native';

import { tw } from '@sz/config';

import { BasePricePlansScreen, SubscriptionCard } from '../components';

export function PricePlansScreen() {
  return (
    <BasePricePlansScreen testID="PricePlansScreenTestID">
      <ScrollView style={tw`mt-4.5 mx-6.25`}>
        <View style={tw`my-2`}>
          {/* TODO:: API integration is pending */}
          <SubscriptionCard
            title="Swinzen Free"
            subTitle="Start your account with a stunning profile & free features"
            price={0}
            pricingDescription="Absolutely free"
            featureList={['Has ads', 'Only 5 uploads per month', 'Access to the analyzed video   playback and data']}
          />
        </View>
        <View style={tw`my-2`}>
          <SubscriptionCard
            title="Monthly Plan"
            subTitle="Start your account with pro features and analyzing activities"
            price={9.99}
            pricingDescription="Paid monthly"
            featureList={['Unlimited video upload', 'analysis and playback', 'Store uploaded Video for 30 days']}
          />
        </View>
        <View style={tw`my-2`}>
          <SubscriptionCard
            title="Annual Plan"
            subTitle="Start your account with pro features and analyzing activities"
            price={99.99}
            pricingDescription="per month, paid annually"
            featureList={['Unlimited video upload', 'video analysis and playback', 'store uploaded Video for 365 days']}
          />
        </View>
      </ScrollView>
    </BasePricePlansScreen>
  );
}
