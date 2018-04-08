import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth, storage } from 'firebase';
import { NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';

class Profile extends Component {
  static navigationOptions = {
    title: 'Damdi'
  };

  state = {
    isLoading: false,
    email: auth().currentUser.email,
    password: '',
    profileImageSource: null
  };

  onEmailChange = event => {
    this.setState({ email: event.nativeEvent.text });
  };

  onPasswordChange = event => {
    this.setState({ password: event.nativeEvent.text });
  };

  saveImage = async imageData => {
    const { uid } = auth().currentUser;
    const storageRef = storage()
      .ref()
      .child(`images/${uid}`);
    try {
      const snapshot = await storageRef.putString(imageData, 'base64', {
        contentType: 'image/jpg'
      });
      Alert.alert('Готово', JSON.stringify(snapshot.value), [{ text: 'OK' }], {
        cancelable: false
      });
    } catch (error) {
      Alert.alert('Ошибка', error.message, [{ text: 'OK' }], {
        cancelable: false
      });
    }
  };

  changeProfileImage = () => {
    ImagePicker.showImagePicker(null, response => {
      if (response.error) {
        Alert.alert('Ошибка', response.error, [{ text: 'OK' }], {
          cancelable: false
        });
      } else if (!response.didCancel) {
        this.saveImage(response.data);
      }
    });
  };

  updateEmail = async () => {
    const { email, password } = this.state;
    try {
      this.setState({ isLoading: true });
      await auth().signInWithEmailAndPassword(
        auth().currentUser.email,
        password
      );
      await auth().currentUser.updateEmail(email);
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert('Ошибка', error.toString(), [{ text: 'OK' }], {
        cancelable: false
      });
    }
  };

  signOut = async () => {
    const { dispatch } = this.props.navigation;
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'Start' })]
    });
    try {
      await auth().signOut();
      dispatch(resetAction);
    } catch (error) {
      Alert.alert('Ошибка', error.toString(), [{ text: 'OK' }], {
        cancelable: false
      });
    }
  };

  render() {
    const { profileImageSource } = this.state;
    return this.state.isLoading ? (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity
          onPress={this.changeProfileImage}
          style={styles.profileImageContainer}
        >
          <Image
            source={{
              uri: profileImageSource
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TextInput
          value={this.state.email}
          placeholder="Email"
          style={styles.textInput}
          underlineColorAndroid="#98c807"
          onChange={this.onEmailChange}
        />
        <TextInput
          value={this.state.password}
          placeholder="Пароль"
          style={styles.textInput}
          underlineColorAndroid="#98c807"
          onChange={this.onPasswordChange}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={this.updateEmail}
        >
          <Text style={styles.primaryButtonText}>Изменить Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={this.signOut}>
          <Text style={styles.secondaryButtonText}>Выйти</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 25,
    alignItems: 'center'
  },
  profileImageContainer: {
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: 'gray'
  },
  profileImage: {
    flex: 1,
    borderRadius: 50,
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  textInput: {
    marginTop: 20,
    width: '100%'
  },
  primaryButton: {
    marginTop: 20,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#98c807'
  },
  primaryButtonText: {
    fontSize: 18,
    color: 'white'
  },
  secondaryButton: {
    marginTop: 20,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondaryButtonText: {
    fontSize: 18,
    color: 'black'
  }
});

export default Profile;
