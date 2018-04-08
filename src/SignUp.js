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

class SignUp extends Component {
  static navigationOptions = {
    title: 'Damdi'
  };

  state = {
    isLoading: false,
    email: '',
    password: '',
    repeatPassword: ''
  };

  onEmailChange = event => {
    this.setState({ email: event.nativeEvent.text });
  };

  onPasswordChange = event => {
    this.setState({ password: event.nativeEvent.text });
  };

  onRepeatPasswordChange = event => {
    this.setState({ repeatPassword: event.nativeEvent.text });
  };

  validation = () => {
    const { email, password, repeatPassword } = this.state;
    if (email === '' || password === '' || repeatPassword === '') {
      return { isCorrect: false, message: 'Все поля обязательны' };
    }
    if (password !== repeatPassword) {
      return { isCorrect: false, message: 'Пароли не совпадают' };
    }
    return { isCorrect: true, message: '' };
  };

  signUp = async () => {
    const { dispatch } = this.props.navigation;
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'MainStack' })]
    });
    const { email, password } = this.state;
    const { isCorrect, message } = this.validation();
    if (!isCorrect) {
      Alert.alert('Ошибка', message, [{ text: 'OK' }], {
        cancelable: false
      });
    } else {
      try {
        this.setState({ isLoading: true });
        await auth().createUserWithEmailAndPassword(email, password);
        this.setState({ isLoading: false });
        dispatch(resetAction);
      } catch (error) {
        this.setState({ isLoading: false });
        Alert.alert('Ошибка', error.toString(), [{ text: 'OK' }], {
          cancelable: false
        });
      }
    }
  };

  moveToSignIn = () => {
    const { goBack } = this.props.navigation;
    goBack();
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
        <TextInput
          value={this.state.repeatPassword}
          placeholder="Повторите пароль"
          style={styles.textInput}
          underlineColorAndroid="#98c807"
          onChange={this.onRepeatPasswordChange}
          secureTextEntry
        />
        <TouchableOpacity style={styles.primaryButton} onPress={this.signUp}>
          <Text style={styles.primaryButtonText}>Зарегистрироваться</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={this.moveToSignIn}
        >
          <Text style={styles.secondaryButtonText}>Войти</Text>
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

export default SignUp;
