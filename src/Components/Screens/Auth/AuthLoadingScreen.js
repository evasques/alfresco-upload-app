/****************************************************************************
 * Imports
 ***************************************************************************/

import React from 'react';
import { View } from 'react-native';
import { SecureStore } from 'expo';

/****************************************************************************
 * Authentication loading component
 ***************************************************************************/

/**
 *
 */
export default class AuthLoadingScreen extends BaseScreen {

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

    this._navigate(route);
  };

  /**
   *
   */
  _isLoggedInAsync = async() => {
  }
}
