/****************************************************************************
 * Imports, variables, constants
 ***************************************************************************/

// ReactNative and external dependencies
import React from 'react';
import { Platform, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { Permissions, ImagePicker, AppLoading } from 'expo';

// Screens
import AbstractScreen from '@screens/AbstractScreen';

// Managers
import AlfrescoManager from '@managers/AlfrescoManager';
import StoreManager from '@managers/StoreManager';

/****************************************************************************
 * Home screen component
 ***************************************************************************/

/**
 * Screen where user can upload an image/video from the phone gallery to
 * Alfresco
 */
export default class HomeScreen extends AbstractScreen {

  /****************************************************************************
   * Component Lifecycle
   ***************************************************************************/

  /**
   * Initializes the component
   */
  constructor(props) {
    super(props);
    this.initState({
      image: undefined,
			uri: undefined,
      status: undefined
    });
  }

  /**
   * Loads the fonts before rendering
   */
  async componentWillMount() {
    await this.loadFontsAsync();
    this.setLoadingScreen(false);
  }

  /**
   * Renders the upload screen
   */
  render() {

    if (this.isLoadingScreen()) {
      return <AppLoading />;
    }

    const hasImage = this.state.image != undefined;
    const status = this.state.status;

    const styles2 = StyleSheet.create({
      imageborderColor: {
        borderColor: !status ? 'black' : (status == 'error' ? 'red' : 'green')
      }
    });

    const message = !status ? '' : (status == 'error' ? 'Error uploading image' : 'Image has been uploaded');

    return (
      <Container style={styles.container}>
        {this.getSpinner()}
        <View>
          <TouchableOpacity onPress={this.chooseImage}>
            {hasImage ?
              <Image style={[styles.image, styles2.imageborderColor]} source={{ uri: this.state.uri }} /> :
              <View style={[styles.noImage, styles.image, styles2.imageborderColor]} />
            }
          </TouchableOpacity>
          <Button disabled={!hasImage} onPress={this.uploadImage} style={styles.uploadImageBtn}>
            <Text>Upload image</Text>
          </Button>
          <Text style={styles.message}>{message}</Text>
        </View>
      </Container>
    );
  }

  /****************************************************************************
   * Component functions
   ***************************************************************************/

  /**
   * Allows to pick an image/video from the gallery
   */
  chooseImage = async () => {

    let hasPermission = true;

    if (Platform.OS == 'ios') {
      const permission = await Permissions.askAsync('CAMERA_ROLL');
      hasPermission = permission.status === 'granted';
    }

    if (hasPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
				base64 : true
			});
      const imageb64 = !result.cancelled ? result.base64 : undefined;
			const uri = !result.cancelled ? result.uri : undefined;
      this.setState({
        image: imageb64,
				uri: uri,
        status: undefined
      });
    }
  }

  /**
   * Uploads the image/video to Alfresco
   */
  uploadImage = async() => {

    const upload = async () => {

      let uploaded = false;
      const json = await StoreManager.getAsync('auth');
      let auth = json ? JSON.parse(json) : {};
      let ticket = auth.ticket;
      const isTicketValid = await AlfrescoManager.isTicketValid(ticket);

      console.log('HomeScreen - uploadImage - ticket - ' + isTicketValid);

      if (!isTicketValid) {
        const username = auth.username;
        const password = auth.password;
        console.log('HomeScreen - uploadImage - credentials: ' + username + ' - ' + password);
        if (username && password) {
          ticket = await AlfrescoManager.getTicket(username, password);
        } else {
          return await this.logout(true);
        }
      }

      if (ticket) {
    		let nodeId;

        try {
          nodeId = await AlfrescoManager.uploadToAlfresco(this.state.uri,this.state.image,ticket);
          console.log('HomeScreen - uploadImage - nodeId: ' + nodeId);
          uploaded = true;
        } catch (error) {
          uploaded = false;
        }
      }

      this.setState({
        status: uploaded ? 'ok' : 'error',
        loadingAction: false
      });
    };

    this.setState({
      loadingAction: true
    }, upload);
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
  noImage: {
    backgroundColor: 'lightgray',
    borderStyle: 'dashed'
  },
  image: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderRadius: 25,
    alignSelf: 'center'
  },
  uploadImageBtn: {
    marginTop: 50,
    alignSelf: 'center'
    //backgroundColor: '#ff9901'
  },
  message: {
    marginTop: 50,
    alignSelf: 'center'
  }
});
