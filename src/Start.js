import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

class Start extends Component {
  static navigationOptions = {
    title: 'Damdi'
  };

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
