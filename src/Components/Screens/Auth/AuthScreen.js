/****************************************************************************
 * Imports, variables, constants
 ***************************************************************************/

// ReactNative and external dependencies
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Container, Form, Item, Input, Label, Button, Text } from 'native-base';
import { AppLoading, SecureStore } from 'expo';

// Screens
import AbstractScreen from '@screens/AbstractScreen';

// Managers
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

    this.initState({
      username: undefined,
      usernameInit: true,

      password: undefined,
      passwordInit: true,

      invalid: false
    });
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

    if (this.isLoadingScreen()) {
      return <AppLoading />;
    }


    return (
      <Container style={styles.container}>
          <Image source={{ uri: alfrescoLogo }} style={styles.logo} />
          <Form>
            <Item floatingLabel error={this.isUsernameInvalid()}>
              <Label>Username</Label>
              <Input
                onChangeText={(u) => this.onUsernameChange(u)}
                value={this.state.username} />
            </Item>
            <Item floatingLabel error={this.isPasswordInvalid()}>
              <Label>Password</Label>
              <Input
                textContentType="password"
                onChangeText={(p) => this.onPasswordChange(p)}
                value={this.state.password} />
            </Item>
            <Button disabled={this.isLoginButtonDisabled()} onPress={this.login} style={styles.loginBtn}>
              <Text>Login</Text>
            </Button>
          </Form>
      </Container>
    );
  }

  /****************************************************************************
   * Component functions
   ***************************************************************************/

   /**
    * Checks if there is an username
    */
   hasUsername = () => {
     return (this.state.username || this.state.usernameInit ? true : false);
   }

   /**
    * Handles the username change by user input
    */
   onUsernameChange = (username) => {
     this.setState({
       username: username,
       usernameInit: false,
       invalid: false
     });
   }

   /**
    * Checks if the supplied username is invalid
    *
    * @return true if username is invalid, false if is valid
    */
   isUsernameInvalid = () => {
     return !this.hasUsername() || this.state.invalid === true;
   }

   /**
    * Checks if there is a password
    */
   hasPassword = () => {
     return (this.state.password || this.state.passwordInit ? true : false);
   }

   /**
    * Handles the password change by user input
    */
   onPasswordChange = (password) => {
     this.setState({
       password: password,
       passwordInit: false,
       invalid: false
     });
   }

   /**
    * Checks if the supplied password is invalid
    *
    * @return true if password is invalid, false if is valid
    */
   isPasswordInvalid = () => {
     return !this.hasPassword() || this.state.invalid === true;
   }

   /**
    * Checks wether the login button should be disabled or not
    */
   isLoginButtonDisabled = () => {
     return !this.hasUsername() || !this.hasPassword() || (this.state.usernameInit === true || this.state.passwordInit === true);
   }

   /**
    * Performs the Alfresco login using supplied credentials
    */
   login = () => {
     if (!this.isLoginButtonDisabled()) {
       const ticket = await AlfrescoManager.getTicket(this.state.username, this.state.password);
       const isTicketValid = await AlfrescoManager.isTicketValid(ticket);
     }
   }
}

/****************************************************************************
 * Styles
 ***************************************************************************/

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     width: '100%',
     backgroundColor: 'white',
     justifyContent: 'center'
   },
   logo: {
     width: 175,
     height: 175,
     alignSelf: 'center'
   },
   loginBtn: {
     marginTop: 50,
     alignSelf: 'center'
   }
 });

const alfrescoLogo = "data:image/png;base64,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";
