import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from "../config/style";
import MapView from 'react-native-maps';
//import Geolocation from '@react-native-community/geolocation';

export default function App() {


const [region, setRegion] = useState({
  latitude: 51.5079145,
  longitude: -0.0899163,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
});

// useEffect(() => {

//   Geolocation.getCurrentPosition(
//     (position) => {
//       this.setState({
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//         error: null,
//       });
//       this.mergeLot();
//     },
//     (error) => this.setState({ error: error.message }),
//     { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
//   );

// }, []);

return (
  <View style={styles.container}>
    <MapView
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      //onRegionChangeComplete runs when the user stops dragging MapView
      onRegionChangeComplete={(region) => setRegion(region)}
    />
  </View>
);


}