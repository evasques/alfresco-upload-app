/****************************************************************************
 * Imports, variables, constants
 ***************************************************************************/

// ReactNative and external dependencies
import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

// Screens
import AbstractScreen from '@screens/AbstractScreen';

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
      </Container>
    );
  }

  /****************************************************************************
   * Component functions
   ***************************************************************************/

}

/****************************************************************************
 * Styles
 ***************************************************************************/

const styles = StyleSheet.create({
  container: {

  }
});
