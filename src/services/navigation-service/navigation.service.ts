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
      // Auth Routes
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

      // Account Routes
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

      // Library Info Routes
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
      [Route.ShootingSetup]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.ShootingSetup,
          params: {
            screen: route,
            params: params,
          },
        },
      },
      [Route.LibraryInfo]: {
        navRoute: Route.LibraryInfoStack,
        navParams: {
          screen: Route.LibraryInfo,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      // Info Routes
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

      // Price Plan Routes
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

      // Bottom Tab Routes
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
      [Route.VideoUploadStack]: {
        navRoute: Route.VideoUploadStack,
        navParams: params,
      },
    };

    // Fixing SonarCloud issue with replacing this function instead of switch, maximum cases should be 30 for a switch
    const getNavigationRoute = (route: Route): NavigationRoute => {
      return {
        route: routeMapping[route].navRoute,
        params: routeMapping[route].navParams,
      };
    };

    return getNavigationRoute(route);
  }
}
