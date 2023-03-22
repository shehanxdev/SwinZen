import { Image } from 'react-native';

type RNImageProps = React.ComponentProps<typeof Image>;

export type WithRNImageProps = Pick<RNImageProps, 'testID'>;

export interface GradientBackgroundProps extends WithRNImageProps {}
