/****************************************************************************
 * Imports, variables, constants
 ***************************************************************************/

// ReactNative and external dependencies
import React from 'react';
import { View } from 'react-native';
import { SecureStore } from 'expo';

// Screens
import AbstractScreen from '@screens/AbstractScreen';

// Managers
import AlfrescoManager from '@managers/AlfrescoManager';
import StoreManager from '@managers/StoreManager';

/****************************************************************************
 * Authentication loading component
 ***************************************************************************/

/**
 * Checks if the current authentication data is valid, if not, opens
 * the login screen, otherwise, opens the application
 */
export default class AuthLoadingScreen extends AbstractScreen {

  /****************************************************************************
   * Component Lifecycle
   ***************************************************************************/

  /**
   * Initializes the component
   */
  constructor(props) {
    super(props);
  }

  /**
   * Checks the authentication data before rendering
   */
  async componentWillMount() {
    await this.checkAuthAsync();
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
   * Checks current authentication, if valid, opens the main application screen
   */
  checkAuthAsync = async () => {

    let route = 'Auth';
    const hasValidTicket = await this.isTicketValidAsync();

    if (hasValidTicket) {
      route = 'App';
    }

    this.navigate(route);
  };

  /**
   * Obtains a valid ticket
   */
  isTicketValidAsync = async () => {

    let hasValidTicket = false;
    const json = await StoreManager.getAsync('auth');
    let auth = json ? JSON.parse(json) : {};
    let ticket = auth.ticket;

    if (ticket) {
      const isTicketValid = await AlfrescoManager.isTicketValid(ticket);
      if (isTicketValid) {
        hasValidTicket = true;
      } else {
        ticket = undefined;
      }
    }

    if (!ticket) {
      const username = auth.username;
      const password = auth.password;

      if (username && password) {
        try {
          ticket = await AlfrescoManager.getTicket(username, password);
          auth.ticket = ticket;
          await StoreManager.setAsync('auth', JSON.stringify(auth));
          hasValidTicket = true;
        } catch (error) {
          console.log('AuthLoadingScreen - Error obtaining ticket: ' + error);
        }
      }
    }

    return hasValidTicket;
  }
}
