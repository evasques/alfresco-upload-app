/****************************************************************************
 * Imports, variables, constants
 ***************************************************************************/

// ReactNative and external dependencies
import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base';

// Screens
import AbstractScreen from '@screens/AbstractScreen';

// Managers
import StoreManager from '@managers/StoreManager';

/****************************************************************************
 * Settings screen component
 ***************************************************************************/

/**
 *
 */
export default class SettingsScreen extends AbstractScreen {

  /****************************************************************************
   * Component Lifecycle
   ***************************************************************************/

  /**
   *
   */
  constructor(props) {
    super(props);
  }

  /**
   * Renders the settings screen
   */
  render() {
    return (
      <Container style={styles.container}>
        <Button  onPress={this.saveSettings} style={styles.saveSettingsBtn}>
          <Text>Save Settings</Text>
        </Button>
        <Button onPress={this.logoutApp} style={styles.logoutBtn}>
          <Text>Logout</Text>
        </Button>
      </Container>
    );
  }

  /****************************************************************************
   * Component functions
   ***************************************************************************/

   /**
    * Logouts from the app
    */
   logoutApp = async () => {
     return await this.logout();
   }
}

/****************************************************************************
 * Styles
 ***************************************************************************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveSettingsBtn: {
    marginTop: 50,
    alignSelf: 'center'
  },
  logoutBtn: {
    marginTop: 50,
    alignSelf: 'center'
  }
});
