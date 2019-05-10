/****************************************************************************
 * Imports, variables, constants
 ***************************************************************************/

// ReactNative and external dependencies
import React, { Component } from 'react';
import { Font } from 'expo';

/****************************************************************************
 * Abstract screen component
 ***************************************************************************/

/**
 * Common behavior for application screens
 */
export default class AbstractScreen extends Component {

   /**
    *
    */
   constructor(props) {
     super(props);

     this.state = {
       loadingScreen: true,
       loadingAction: false
     }
   }

   /**
    *
    */
   loadFontsAsync = async () => {
     await Font.loadAsync({
       'Roboto': require("native-base/Fonts/Roboto.ttf"),
       'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf"),
       'Ionicons': require("@expo/vector-icons/fonts/Ionicons.ttf"),
       'Feather': require("@expo/vector-icons/fonts/Feather.ttf")
     });
   }

   /**
    *
    */
   setLoadingScreen = (flag) => {
     this.setState({
       loadingScreen: flag
     });
   }

   /**
    *
    */
   getProp = (name, defaultValue) => {

     let result;

     if (name) {
       if (this.props) {
         result = this.props[name];
       }

       if (result === undefined && this.props.navigation) {
         result = this.props.navigation.getParam(name);
       }

       if (result === undefined && this.props.screenProps) {
         result = this.props.screenProps[name];
       }
     }

     if (result === undefined && defaultValue) {
       result = defaultValue;
     }

     return result;
   }

   /**
    *
    */
   navigate = (route, params) => {
     const navigation = this.getProp('navigation');
     navigation.navigate(route, params);
   }
}
