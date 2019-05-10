/****************************************************************************
 * Imports
 ***************************************************************************/

import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

/****************************************************************************
 * App component
 ***************************************************************************/

/**
 *
 */
export default class App extends Component {

  render() {
    return (
      <MainContainer />
    );
  }
}

/****************************************************************************
 * Navigators
 ***************************************************************************/

/**
 * Authentication navigator
 */
const AuthNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthScreen,
  App: ApplicationScreen
},
{
  initialRouteName: 'AuthLoading'
});

const MainContainer = createAppContainer(AuthNavigator);
