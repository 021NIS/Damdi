import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import { auth } from 'firebase';
import { NavigationActions } from 'react-navigation';

class Main extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: 'Damdi',
      headerRight: (
        <TouchableOpacity
          style={styles.headerRight}
          onPress={() => params.handleProfile && params.handleProfile()}
        >
          <Text style={styles.headerRightText}>Профиль</Text>
        </TouchableOpacity>
      )
    };
  };

  state = {
    isLoading: false
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleProfile: () => this.moveToProfile()
    });
  }

  moveToProfile = () => {
    const { navigate } = this.props.navigation;
    navigate('Profile');
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
    return this.state.isLoading ? (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.signOut}>
          <Text>Выйти</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: 'green'
  },
  headerRight: {
    marginRight: 25
  },
  headerRightText: {
    fontSize: 18,
    color: 'black'
  }
});

export default Main;
