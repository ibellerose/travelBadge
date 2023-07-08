import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from "../config/style";
import MapView, { Polygon } from 'react-native-maps';
import areaCoordsJson from '../../jsonDocuments/areaCoordinates.json'

import * as Location from "expo-location"

console.log("Beacon Hill: " + areaCoordsJson["Beacon Hill"])

export default function App() {

const [region, setRegion] = useState({
  latitude: 49.5079145,
  longitude: -0.0899163,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
});

useEffect(() => {
  (async () => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    if(location.coords.latitude != null && location.coords.longitude != null){
      setRegion({longitude: location.coords.longitude,
                 latitude: location.coords.latitude,
                 latitudeDelta: 0.01,
                 longitudeDelta: 0.01,
      });
    }

  })();
});

onRegionChange = (region) => {
  this.setRegion({ region });
}

return (
  <View style={styles.container}>
    
    <MapView
      style={StyleSheet.absoluteFillObject}
      showsUserLocation = {true}
      initialRegion={
        region
      }
      region={region}
    >
    <Polygon
      coordinates={areaCoordsJson['Beacon Hill']}
    fillColor='rgba(90,200,10,0.3)'
    strokeColor='rgba(90,200,10,0.3)'
    />
    </MapView>

  </View>
);

}