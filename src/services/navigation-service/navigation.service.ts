import { CommonActions, DrawerActions } from '@react-navigation/native';
import React from 'react';

import { Route } from '@sz/constants';

interface NavigationRoute {
  route: Route;
  params?: any;
}

export class NavigationService {
  public static navigationRef: any = React.createRef();

  public static navigate(requestedRouteName: Route, params?: any) {
    let routeName = requestedRouteName;

    const navigation = NavigationService.getNavigation(routeName, params);

    NavigationService.navigationRef.current?.navigate(navigation.route, navigation.params);
  }

  public static goBack() {
    NavigationService.navigationRef.current?.goBack();
  }

  public static openDrawer() {
    NavigationService.navigationRef.current?.dispatch(DrawerActions.openDrawer());
  }

  public static closeDrawer() {
    NavigationService.navigationRef.current?.dispatch(DrawerActions.closeDrawer());
  }

  public static reset(route: Route) {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: route,
        },
      ],
    });

    NavigationService.navigationRef.current?.dispatch(resetAction);
  }

  private static getNavigation(route: Route, params?: any) {
    const routeMapping = {
      [Route.Login]: {
        navRoute: Route.AuthStack,
        navParams: {
          screen: Route.LoginStack,
          params: {
            screen: Route.Login,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },
      [Route.ForgotPassword]: {
        navRoute: Route.AuthStack,
        navParams: {
          screen: Route.LoginStack,
          params: {
            screen: Route.ForgotPassword,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },
      [Route.ResetPassword]: {
        navRoute: Route.AuthStack,
        navParams: {
          screen: Route.LoginStack,
          params: {
            screen: Route.ResetPassword,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },
      [Route.ResetPasswordEmailVerification]: {
        navRoute: Route.AuthStack,
        navParams: {
          screen: Route.LoginStack,
          params: {
            screen: Route.ResetPasswordEmailVerification,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },
      [Route.Signup]: {
        navRoute: Route.AuthStack,
        navParams: {
          screen: Route.SignupStack,
          params: {
            screen: Route.Signup,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },
      [Route.RegisterEmailVerification]: {
        navRoute: Route.AuthStack,
        navParams: {
          screen: Route.SignupStack,
          params: {
            screen: Route.RegisterEmailVerification,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },
      [Route.ProfileSettings]: {
        navRoute: Route.AccountStack,
        navParams: {
          screen: Route.ProfileStack,
          params: {
            screen: Route.ProfileSettings,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },
      [Route.ChangePassword]: {
        navRoute: Route.AccountStack,
        navParams: {
          screen: Route.ProfileStack,
          params: {
            screen: Route.ChangePassword,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },
      [Route.Notification]: {
        navRoute: Route.AccountStack,
        navParams: {
          screen: Route.Notification,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.Followers]: {
        navRoute: Route.AccountStack,
        navParams: {
          screen: Route.Followers,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.GolfTips]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.GolfTips,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.AboutSwignzenInfoOne]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.AboutSwignzenInfoOne,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.AboutSwignzenInfoTwo]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.AboutSwignzenInfoTwo,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.AboutSwignzenInfoThree]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.AboutSwignzenInfoThree,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.AboutSwignzenInfoFour]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.AboutSwignzenInfoFour,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.AboutSwignzenInfoFive]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.AboutSwignzenInfoFive,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.AboutSwignzenInfoSix]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.AboutSwignzenInfoSix,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.AboutSwignzenInfoSeven]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.AboutSwignzenInfoSeven,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.AboutSwignzenInfoEight]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.AboutSwignzenInfoEight,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoOne]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoOne,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoTwo]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoTwo,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoThree]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoThree,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoFour]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoFour,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoFive]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoFive,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoSix]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoSix,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoSeven]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoSeven,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoEight]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoEight,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoNine]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoNine,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoTen]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoTen,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoEleven]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoEleven,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoTwelve]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoTwelve,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.UsingTheAppInfoThirteen]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.UsingTheAppInfoThirteen,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.AboutUs]: {
        navRoute: Route.InfoStack,
        navParams: {
          screen: Route.AboutUs,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.ContactUs]: {
        navRoute: Route.InfoStack,
        navParams: {
          screen: Route.ContactUs,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.FAQ]: {
        navRoute: Route.InfoStack,
        navParams: {
          screen: Route.FAQ,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.PrivacyPolicy]: {
        navRoute: Route.InfoStack,
        navParams: {
          screen: Route.PrivacyPolicy,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.TermsOfUse]: {
        navRoute: Route.InfoStack,
        navParams: {
          screen: Route.TermsOfUse,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.PricePlans]: {
        navRoute: Route.PricePlansStack,
        navParams: {
          screen: Route.PricePlans,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.PlanDetails]: {
        navRoute: Route.PricePlansStack,
        navParams: {
          screen: Route.PlanDetails,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.VideosTab]: {
        navRoute: Route.MainBottomTabRoutesStack,
        navParams: {
          screen: Route.VideosTab,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.VideoSetup]: {
        navRoute: Route.MainDrawerRoutesStack,
        navParams: {
          screen: Route.MainBottomTabRoutesStack,
          params: {
            screen: Route.VideoSetup,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },
    };

    // Fixing SonarCloud issue with replacing this function instead of switch
    const getNavigationRoute = (route: Route): NavigationRoute => {
      return {
        route: routeMapping[route].navRoute,
        params: routeMapping[route].navParams,
      };
    };

    return getNavigationRoute(route);
  }
}
