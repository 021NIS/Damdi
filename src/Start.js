import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { auth } from 'firebase';

class Start extends Component {
  static navigationOptions = {
    title: 'Damdi'
  };

  componentDidMount() {
    const { dispatch } = this.props.navigation;
    auth().onAuthStateChanged(user => {
      if (!user) {
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'AuthStack' })]
        });
        dispatch(resetAction);
      } else {
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'MainStack' })]
        });
        dispatch(resetAction);
      }
    });
  }

  render() {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" />
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
  }
});

export default Start;
