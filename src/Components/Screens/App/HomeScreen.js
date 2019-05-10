/****************************************************************************
 * Imports, variables, constants
 ***************************************************************************/

// ReactNative and external dependencies
import React from 'react';
import { Platform, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';
import { Permissions, ImagePicker, AppLoading } from 'expo';

// Screens
import AbstractScreen from '@screens/AbstractScreen';

//Managers
import AlfrescoManager from '@managers/AlfrescoManager';

/****************************************************************************
 * Home screen component
 ***************************************************************************/

/**
 *
 */
export default class HomeScreen extends AbstractScreen {

  /****************************************************************************
   * Component Lifecycle
   ***************************************************************************/

  /**
   *
   */
  constructor(props) {
    super(props);
    this.initState({
      image: undefined,
			uri: undefined
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
   * Renders the home screen
   */
  render() {

    if (this.isLoadingScreen()) {
      return <AppLoading />;
    }

    const hasImage = this.state.image != undefined;

    return (
      <Container style={styles.container}>
        <View>
          <TouchableOpacity onPress={this.chooseImage}>
            {hasImage ?
              <Image style={styles.image} source={{ uri: this.state.uri }} /> :
              <View style={[styles.noImage, styles.image]} />
            }
          </TouchableOpacity>
          <Button disabled={!hasImage} onPress={this.uploadImage} style={styles.uploadImageBtn}>
            <Text>Upload image</Text>
          </Button>
        </View>
      </Container>
    );
  }

  /****************************************************************************
   * Component functions
   ***************************************************************************/

  /**
   *
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
				uri: uri
      });
    }
  }

  /**
   *
   */
  uploadImage = async() => {
		const ticket = await AlfrescoManager.getTicket("test","test");
		const isTicketValid = await AlfrescoManager.isTicketValid(ticket);
		const nodeId = await AlfrescoManager.uploadToAlfresco(this.state.uri,this.state.image,ticket);
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
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: 'black'
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 25,
    alignSelf: 'center'
  },
  uploadImageBtn: {
    marginTop: 50,
    alignSelf: 'center'
  }
});
