/*
 * Common screen options that shared between different domains in mainStack
 * Since react navigation does not expose the ScreenOptions type add any options to CommonScreenPorps type
 */
type CommonScreenPorps = {
  headerTransparent: boolean;
  headerTitle: string /* header title can be  ((props: any) => React.ReactNode) as well. But it'snot required in this scenario */;
};

export const commonScreenOptions: CommonScreenPorps = {
  headerTransparent: true,
  headerTitle: '',
};
