import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from "../config/style";
import MapView from 'react-native-maps';
//import Geolocation from 'react-native-geolocation-service';
import * as Location from "expo-location"

export default function App() {


const [region, setRegion] = useState({
  latitude: 49.5079145,
  longitude: -0.0899163,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
});

const [latitude, setLatitude] = useState(null);
const [longitude, setLongitude] = useState(null);

useEffect(() => {
  (async () => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    console.log(location.coords.latitude)
    console.log(location.coords.longitude)

    setLatitude(location.coords.latitude)
    setLongitude(location.coords.longitude);
    setRegion({longitude: longitude,
               latitude: latitude,
               latitudeDelta: 0.01,
               longitudeDelta: 0.01,
              });
  })();
}, []);

onRegionChange = (region) => {
  
}

return (
  <View style={styles.container}>
    <MapView
      style={StyleSheet.absoluteFillObject}
      showsUserLocation = {true}
      initialRegion={{
        latitude: 37.785834,
        longitude: -122.406417,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
      }}
      region={region}
      onRegionChange={this.onRegionChange}
      //onRegionChangeComplete runs when the user stops dragging MapView
      onRegionChangeComplete={(region) => setRegion(region)}
    />
  </View>
);


}