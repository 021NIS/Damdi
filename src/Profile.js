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
import { ImagePicker } from 'expo';

class Profile extends Component {
  static navigationOptions = {
    title: 'Damdi'
  };

  state = {
    isLoading: false,
    email: auth().currentUser.email,
    password: '',
    profileImageSource: ''
  };

  componentDidMount() {
    const { uid } = auth().currentUser;
    const storageRef = storage()
      .ref()
      .child(`images/${uid}`);
    storageRef
      .getDownloadURL()
      .then(url => {
        this.setState({ profileImageSource: url });
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  onEmailChange = event => {
    this.setState({ email: event.nativeEvent.text });
  };

  onPasswordChange = event => {
    this.setState({ password: event.nativeEvent.text });
  };

  uploadImage = async uri => {
    try {
      this.setState({ isLoading: true });
      const { uid } = auth().currentUser;
      // eslint-disable-next-line
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = storage()
        .ref()
        .child(`images/${uid}`);

      const snapshot = await ref.put(blob);
      this.setState({
        isLoading: false,
        profileImageSource: snapshot.downloadURL
      });
    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert('Ошибка', error.message, [{ text: 'OK' }], {
        cancelable: false
      });
    }
  };

  changeProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true
    });

    if (!result.cancelled) {
      this.uploadImage(result.uri);
    }
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
          underlineColorAndroid={'transparent'}
          onChange={this.onEmailChange}
        />
        <TextInput
          value={this.state.password}
          placeholder="Пароль"
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
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
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#98c807',
    borderRadius: 8
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
