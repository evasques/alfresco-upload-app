/****************************************************************************
 * Imports, variables, constants
 ***************************************************************************/

// ReactNative and external dependencies
import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Icon } from 'native-base';
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

// Screens
import AuthLoadingScreen from '@screens/Auth/AuthLoadingScreen';
import AuthScreen from '@screens/Auth/AuthScreen';
import HomeScreen from '@screens/App/HomeScreen';
import SettingsScreen from '@screens/App/SettingsScreen';

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
 * Application navigator containing the main options
 */
const AppNavigator = createBottomTabNavigator({

   // First button
   Home: {
     screen: HomeScreen,
     navigationOptions: ({ navigation }) => ({
       tabBarIcon: ({ tintColor }) => (
           <Icon name='home' type='AntDesign' style={{ color: tintColor }} />
       )
     })
   },

   // Second button
   Settings: {
     screen: SettingsScreen,
     navigationOptions: ({ navigation }) => ({
       tabBarIcon: ({ tintColor }) => (
           <Icon name='setting' type='AntDesign' style={{ color: tintColor }} />
       )
     })
   }
 },
 {
   animationEnabled: true,
   swipeEnabled: true,
   tabBarPosition: "bottom",
   tabBarOptions: {
   style: {
     ...Platform.select({
       android: {
         backgroundColor: 'white'
       }
     })
   },
   activeTintColor: 'blue',
   inactiveTintColor: '#000000',
   showLabel: false,
   showIcon: true
 }
});

/**
 * Authentication navigator
 */
const AuthNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthScreen,
  App: AppNavigator
},
{
  initialRouteName: 'AuthLoading'
});

/**
 * Main container
 */
const MainContainer = createAppContainer(AuthNavigator);
