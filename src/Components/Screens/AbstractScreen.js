/****************************************************************************
 * Imports, variables, constants
 ***************************************************************************/

// ReactNative and external dependencies
import React, { Component } from 'react';
import { Spinner } from 'native-base';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import { Font } from 'expo';

// Managers
import StoreManager from '@managers/StoreManager';

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
   initState = (newState) => {
     this.state = {
       ...this.state,
       ...newState
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
       'AntDesign': require("@expo/vector-icons/fonts/AntDesign.ttf")
     });
   }

   /**
    *
    */
   isLoadingScreen = () => {
     return this.state.loadingScreen;
   }

   /**
    *
    */
   isLoadingAction = () => {
     return this.state.loadingAction;
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

   /**
    * Logouts from app
    */
   logout = async (cleanStore) => {
     if (cleanStore === true) {
       await StoreManager.deleteAsync('auth');
     } else {
       const json = await StoreManager.getAsync('auth');
       let auth = json ? JSON.parse(json) : {};
       delete auth.ticket;
       delete auth.password;
       await StoreManager.setAsync('auth', JSON.stringify(auth));
     }
     this.navigate('Auth');
     return true;
   }

   /**
    * Returns the Spinner component that is shown when the loading action
    * state is true
    *
    * @param overlay true if spinner should overlay the screen
    * @param props the spinner props
    *
    * @return the spinner component
    */
   getSpinner = (overlay, props) => {

     let spinner;

     props = props ? props : {};
     overlay = overlay === false ? false : true;

     const cancelable = props.cancelable ? props.cancelable : false;
     const color = props.color ? props.color : 'white';
     const animation = props.animation ? props.animation : 'none';
     const overlayColor = props.overlayColor ? props.overlayColor : 'rgba(0, 0, 0, 0.25)';
     const animating = true;
     const visible = this.isLoadingAction();
     const textStyle = props.textStyle ? props.textStyle : {};
     const textContent = props.textContent ? props.textContent : '';
     const style = props.style ? props.style : { flex: 1 };

     if (overlay) {
       const size = props.size ? props.size : 'large';

       spinner = <SpinnerOverlay
         cancelable={cancelable}
         color={color}
         animation={animation}
         overlayColor={overlayColor}
         visible={visible}
         size={size}
         textStyle={textStyle}
         textContent={textContent} />;
     } else {
         const size = props.size ? props.size : 'small';
         spinner = <Spinner color={color} />;
     }

     return spinner;
   }
}
