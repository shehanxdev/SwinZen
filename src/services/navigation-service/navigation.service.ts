import React from 'react';

import { Route } from '@sz/constants';

export class NavigationService {
  public static navigationRef: any = React.createRef();

  public static async navigate(requestedRouteName: Route, params?: any) {
    let routeName = requestedRouteName;

    const navigation = NavigationService.getNavigation(routeName, params);

    NavigationService.navigationRef.current?.navigate(navigation.route, navigation.params);
  }

  public static goBack() {
    NavigationService.navigationRef.current?.goBack();
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
    }

    return { route: navRoute, params: navParams };
  }
}
