import { CommonActions, DrawerActions } from '@react-navigation/native';
import React from 'react';

import { Route } from '@sz/constants';

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
    let navParams = params;

    let navRoute = route;

    switch (route) {
      case Route.Login:
        navRoute = Route.AuthStack;
        navParams = {
          screen: Route.LoginStack,
          params: {
            screen: Route.Login,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.ForgotPassword:
        navRoute = Route.AuthStack;
        navParams = {
          screen: Route.LoginStack,
          params: {
            screen: Route.ForgotPassword,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.ResetPassword:
        navRoute = Route.AuthStack;
        navParams = {
          screen: Route.LoginStack,
          params: {
            screen: Route.ResetPassword,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.ResetPasswordEmailVerification:
        navRoute = Route.AuthStack;
        navParams = {
          screen: Route.LoginStack,
          params: {
            screen: Route.ResetPasswordEmailVerification,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.Signup:
        navRoute = Route.AuthStack;
        navParams = {
          screen: Route.SignupStack,
          params: {
            screen: Route.Signup,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.RegisterEmailVerification:
        navRoute = Route.AuthStack;
        navParams = {
          screen: Route.SignupStack,
          params: {
            screen: Route.RegisterEmailVerification,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.ProfileSettings:
        navRoute = Route.AccountStack;
        navParams = {
          screen: Route.ProfileStack,
          params: {
            screen: Route.ProfileSettings,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.ChangePassword:
        navRoute = Route.AccountStack;
        navParams = {
          screen: Route.ProfileStack,
          params: {
            screen: Route.ChangePassword,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.Notification:
        navRoute = Route.AccountStack;
        navParams = {
          screen: Route.Notification,
          params: {
            screen: route,
            params: params,
          },
        };
        break;
      case Route.Followers:
        navRoute = Route.AccountStack;
        navParams = {
          screen: Route.Followers,
          params: {
            screen: route,
            params: params,
          },
        };
        break;
      case Route.AboutUs:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.AboutUs,
          params: {
            screen: route,
            params: params,
          },
        };
        break;
      case Route.ContactUs:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.ContactUs,
          params: {
            screen: route,
            params: params,
          },
        };
        break;
      case Route.FAQ:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.FAQ,
          params: {
            screen: route,
            params: params,
          },
        };
        break;
      case Route.PrivacyPolicy:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.PrivacyPolicy,
          params: {
            screen: route,
            params: params,
          },
        };
        break;
      case Route.TermsOfUse:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.TermsOfUse,
          params: {
            screen: route,
            params: params,
          },
        };
        break;
      case Route.AboutSwignzenInfoOne:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.AboutSwignzenInfoOne,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.AboutSwignzenInfoTwo:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.AboutSwignzenInfoTwo,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.AboutSwignzenInfoThree:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.AboutSwignzenInfoThree,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.AboutSwignzenInfoFour:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.AboutSwignzenInfoFour,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.AboutSwignzenInfoFive:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.AboutSwignzenInfoFive,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.AboutSwignzenInfoSix:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.AboutSwignzenInfoSix,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.AboutSwignzenInfoSeven:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.AboutSwignzenInfoSeven,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.AboutSwignzenInfoEight:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.AboutSwignzenInfoEight,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.GolfTips:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.GolfTips,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoOne:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoOne,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoTwo:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoTwo,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoThree:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoThree,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoFour:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoFour,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoFive:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoFive,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoSix:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoSix,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoSeven:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoSeven,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoEight:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoEight,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoNine:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoNine,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoTen:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoTen,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoEleven:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoEleven,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoTwelve:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoTwelve,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.UsingTheAppInfoThirteen:
        navRoute = Route.InfoStack;
        navParams = {
          screen: Route.LibraryInfoStack,
          params: {
            screen: Route.UsingTheAppInfoThirteen,
            params: {
              screen: route,
              params: params,
            },
          },
        };
        break;
      case Route.PricePlans:
        navRoute = Route.PricePlansStack;
        navParams = {
          screen: Route.PricePlans,
          params: {
            screen: route,
            params: params,
          },
        };
        break;
      case Route.PlanDetails:
        navRoute = Route.PricePlansStack;
        navParams = {
          screen: Route.PlanDetails,
          params: {
            screen: route,
            params: params,
          },
        };
        break;
    }

    return { route: navRoute, params: navParams };
  }
}
