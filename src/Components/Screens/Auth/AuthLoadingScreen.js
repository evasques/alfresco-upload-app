/****************************************************************************
 * Imports, variables, constants
 ***************************************************************************/

// ReactNative and external dependencies
import React from 'react';
import { View } from 'react-native';
import { SecureStore } from 'expo';

// Screens
import AbstractScreen from '@screens/AbstractScreen';

/****************************************************************************
 * Authentication loading component
 ***************************************************************************/

/**
 *
 */
export default class AuthLoadingScreen extends AbstractScreen {

  /****************************************************************************
   * Component Lifecycle
   ***************************************************************************/

  /**
   * Initializes the component executing required initialization
   */
  constructor(props) {
    super(props);
  }

  /**
   * Checks both login and phone number
   */
  async componentWillMount() {
    await this._checkAuthAsync();
  }

  /**
   * Renders the loading screen component
   */
  render() {
    return <View />;
  }

  /****************************************************************************
   * Component functions
   ***************************************************************************/

  /**
   *
   */
  _checkAuthAsync = async() => {

    let route = 'Auth';
    const isLoggedIn = await this._isLoggedInAsync();

    if (isLoggedIn) {
      route = 'App';
    }

    this.props.navigation.navigate(route);
  };

  /**
   *
   */
  _isLoggedInAsync = async() => {
    return true;
  }
}
