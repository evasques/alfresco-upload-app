/****************************************************************************
 * Imports, variables, constants
 ***************************************************************************/

// ReactNative and external dependencies
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

// Screens
import AbstractScreen from '@screens/AbstractScreen';
import AlfrescoManager from '@managers/AlfrescoManager';

/****************************************************************************
 * Authentication screen component
 ***************************************************************************/

/**
 * Authentication component which allows the user to access the application
 * using a social network login button
 */
export default class AuthScreen extends AbstractScreen {

  /****************************************************************************
   * Component Lifecycle
   ***************************************************************************/

  /**
   * Initializes the screen state
   */
  constructor(props) {
    super(props);

    this.state = {
      username: undefined,
      password: undefined
    };
  }

  /**
   *
   */
  async componentWillMount() {
    await this.loadFontsAsync();
    this.setLoadingScreen(false);
  }

  /**
   * Renders the login screen
   */
  render() {

    if (this.state.loadingScreen) {
      return <View />;
    }


    return (
      <Container style={styles.container}>
        <Header style={styles.header} />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input />
            </Item>
            <Button onPress={this.login}><Text>Login</Text></Button>
          </Form>
        </Content>
      </Container>
    );
  }

  /****************************************************************************
   * Component functions
   ***************************************************************************/

   /**
    *
    */
   login = () => {
   }
}

/****************************************************************************
 * Styles
 ***************************************************************************/

 const styles = StyleSheet.create({
   container: {
     backgroundColor: '#ffffff'
   },
   header: {
     backgroundColor: '#ffffff',
     height: 200
   }
 });
