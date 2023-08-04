import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from "../config/style";
import MapView, { Polygon } from 'react-native-maps';
import GeoFencing from 'react-native-geo-fencing';
import * as geolib from 'geolib';
import colors from "../config/colors";
import Screen from '../components/Screen';
import { FlatGrid } from 'react-native-super-grid';

import areaCoordsJson from '../../jsonDocuments/areaCoordinates.json';
import badgeInfoJson from '../../jsonDocuments/badgeInfo.json';

import * as Location from "expo-location"
import { Button, color } from '@rneui/base';
import { Tab, TabView, Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

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

    findBadgeRegion()

  })();
});

//take current location and see if it is in a badge location
//function returns location name

findBadgeRegion = () => {
  let bol;

  for(let i = 0; i < Object.keys(areaCoordsJson).length; i++){
    bol = geolib.isPointInPolygon(currentLocation, areaCoordsJson[Object.keys(areaCoordsJson)[i]])
    if(bol){
        console.log("You are in " + Object.keys(areaCoordsJson)[i])
        badgeInfoJson['Badge Info'][i]['visited'] = true
      break
    }
  }

  console.log(bol)

}

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
        data={badgeInfoJson['Badge Info']}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={styles.badges}>
            <Icon name='pets' type='material' color={item.color} size={60}></Icon>
            <Text>{item.name}</Text>
          </View>
        )}
        />
      </TabView.Item>
    </TabView>
  </Screen>
);

}