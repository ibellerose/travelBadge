import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from "../config/style";
import MapView, { Polygon } from 'react-native-maps';
import areaCoordsJson from '../../jsonDocuments/areaCoordinates.json';
import GeoFencing from 'react-native-geo-fencing';
import * as geolib from 'geolib';
import colors from "../config/colors";
import Screen from '../components/Screen';
import { FlatGrid } from 'react-native-super-grid';

import * as Location from "expo-location"
import { color } from '@rneui/base';
import { Tab, TabView, Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  const [items, setItems] = React.useState([
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'AMETHYST', code: '#9b59b6' },
    { name: 'WET ASPHALT', code: '#34495e' },
    { name: 'GREEN SEA', code: '#16a085' },
    { name: 'NEPHRITIS', code: '#27ae60' },
    { name: 'BELIZE HOLE', code: '#2980b9' },
    { name: 'WISTERIA', code: '#8e44ad' },
    { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
    { name: 'SUN FLOWER', code: '#f1c40f' },
    { name: 'CARROT', code: '#e67e22' },
    { name: 'ALIZARIN', code: '#e74c3c' },
    { name: 'CLOUDS', code: '#ecf0f1' },
    { name: 'CONCRETE', code: '#95a5a6' },
    { name: 'ORANGE', code: '#f39c12' },
    { name: 'PUMPKIN', code: '#d35400' },
    { name: 'POMEGRANATE', code: '#c0392b' },
    { name: 'SILVER', code: '#bdc3c7' },
    { name: 'ASBESTOS', code: '#7f8c8d' },
  ]);

const [index, setIndex] = React.useState(0);

const [region, setRegion] = useState({
  latitude: 49.5079145,
  longitude: -0.0899163,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
});

const [currentLocation, setCurrentLocation] = useState({
  latitude: 49.5079145,
  longitude: -0.0899163
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
      setCurrentLocation({longitude: location.coords.longitude,
        latitude: location.coords.latitude
      })

      if(geolib.isPointInPolygon(currentLocation, areaCoordsJson['Beacon Hill']) == true){
        //console.log("In zone")
      }
    } else {
      setRegion({longitude: 42.360132,
        latitude: -71.068747,
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
  <Screen>
    <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: colors.light,
        height: 3,
      }}
      variant="primary"
      //TODO: fix the tabs to the bottom
    >
      <Tab.Item
        title="Map"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'map', type: 'ionicon', color: colors.light }}
      />
      <Tab.Item
        title="Badges"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'medal', type: 'ionicon', color: colors.light }}
      />
    </Tab>

    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item style={{ width: '100%' }}>
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
          fillColor={colors.areaFillColor}
          strokeColor={colors.areaFillColor}
          />
        </MapView>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: colors.lightGray, width: '100%' }}>
        <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={[{ backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </View>
        )}
        />
      </TabView.Item>
    </TabView>
  </Screen>
);

}