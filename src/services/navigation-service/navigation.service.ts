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
          screen: Route.Login,
          params: {
            screen: route,
            params: params,
          },
        };
        break;
      case Route.Signup:
        navRoute = Route.AuthStack;
        navParams = {
          screen: Route.Signup,
          params: {
            screen: route,
            params: params,
          },
        };
        break;
      case Route.EmailVertification:
        navRoute = Route.AuthStack;
        navParams = {
          screen: Route.EmailVertification,
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
