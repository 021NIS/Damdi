import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import { database } from 'firebase';
import { MapView } from 'expo';

const { Marker } = MapView;

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
    isLoading: false,
    places: [],
    region: {
      latitude: 43.237342,
      longitude: 76.915418,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleProfile: () => this.moveToProfile()
    });
    this.loadData();
  }

  loadData = async () => {
    try {
      this.setState({ isLoading: true });
      const snapshot = await database()
        .ref('places')
        .once('value');
      this.setState({ isLoading: false });
      const places = Object.entries(snapshot.val()).map(item => ({
        id: item[0],
        ...item[1]
      }));
      this.setState({ places });
    } catch (error) {
      this.setState({ isLoading: false });
      Alert.alert('Ошибка', error.message, [{ text: 'OK' }], {
        cancelable: false
      });
    }
  };

  moveToProfile = () => {
    const { navigate } = this.props.navigation;
    navigate('Profile');
  };

  moveToPlace = place => {
    console.log(place);
    const { navigate } = this.props.navigation;
    navigate('Place', {
      place
    });
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={styles.container}>
        <MapView region={this.state.region} style={styles.map}>
          {this.state.places.map(place => (
            <Marker
              coordinate={place.location}
              title={place.name}
              description={place.description}
              onCalloutPress={() => {
                this.moveToPlace(place);
              }}
            />
          ))}
        </MapView>
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
  },
  headerRight: {
    marginRight: 25
  },
  headerRightText: {
    fontSize: 18,
    color: 'black'
  },
  map: {
    flex: 1
  }
});

export default Main;
