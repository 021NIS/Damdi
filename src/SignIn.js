import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from 'firebase';
import { NavigationActions } from 'react-navigation';

class SignIn extends Component {
  static navigationOptions = {
    title: 'Damdi'
  };

  state = {
    isLoading: false,
    email: '',
    password: ''
  };

  onEmailChange = event => {
    this.setState({ email: event.nativeEvent.text });
  };

  onPasswordChange = event => {
    this.setState({ password: event.nativeEvent.text });
  };

  signIn = async () => {
    const { dispatch } = this.props.navigation;
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'MainStack' })]
    });
    const { email, password } = this.state;
    try {
      this.setState({ isLoading: true });
      await auth().signInWithEmailAndPassword(email, password);
      this.setState({ isLoading: false });
      dispatch(resetAction);
    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert('Ошибка', error.toString(), [{ text: 'OK' }], {
        cancelable: false
      });
    }
  };

  moveToSignUp = () => {
    const { navigate } = this.props.navigation;
    navigate('SignUp');
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
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
        <TouchableOpacity style={styles.primaryButton} onPress={this.signIn}>
          <Text style={styles.primaryButtonText}>Войти</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={this.moveToSignUp}
        >
          <Text style={styles.secondaryButtonText}>Зарегистрироваться</Text>
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

export default SignIn;
