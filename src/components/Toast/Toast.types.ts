import { MessageOptions } from 'react-native-flash-message';

export type InitialToastStyleProps = Partial<
  Pick<MessageOptions, 'hideStatusBar' | 'statusBarHeight' | 'style' | 'textStyle' | 'titleStyle'>
>;

export type OtherInitialToastProps = Partial<
  Pick<MessageOptions, 'icon' | 'autoHide' | 'hideOnPress' | 'duration' | 'position'>
>;
