import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

class Place extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.place.name
  });

  state = {
    isLoading: false
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {};

  render() {
    const { description } = this.props.navigation.state.params.place;
    return this.state.isLoading ? (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={styles.container}>
        <Text>{description}</Text>
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
    backgroundColor: 'white'
  }
});

export default Place;
