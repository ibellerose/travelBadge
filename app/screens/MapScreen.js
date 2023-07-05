import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from "../config/style";
import MapView from 'react-native-maps';
//import Geolocation from 'react-native-geolocation-service';
import * as Location from "expo-location"

// type Props = {};

// export default class App extends Component<Props> {

//   constructor(props) {
//     super(props);

//     this.state = {
//       latitude: 0,
//       longitude: 0
//     }
//   }



//   // componentDidMount() {
//   //   foregroundPermission = this.foregroundPermission1()
//   // }

//   // componentDidMount() {
//   //   this.watchId = navigator.geolocation.watchPosition(
//   //     (position) => {
//   //       this.setState({
//   //         latitude: position.coords.latitude,
//   //         longitude: position.coords.longitude
//   //       });
//   //     },
//   //     (error) => {
//   //       this.setState({ error: error.message })
//   //     },
//   //     { enableHighAccuracy: false, timeout: 1, maximumAge: 1, distanceFilter: 1}
//   //   )
//   // }

//   foregroundPermission1 = async () => {
//     await Location.requestForegroundPermissionsAsync()
//   }

//   render() {
   
//     const foregroundPermission = this.foregroundPermission1()

// // Location subscription in the global scope
// let locationSubscrition = null

// // Locatoin tracking inside the component
// if (foregroundPermission.granted) {
//   foregroundSubscrition = Location.watchPositionAsync(
//     {
//       // Tracking options
//       accuracy: Location.Accuracy.High,
//       distanceInterval: 10,
//     },
//     location => {
//       /* Location object example:
//         {
//           coords: {
//             accuracy: 20.100000381469727,
//             altitude: 61.80000305175781,
//             altitudeAccuracy: 1.3333333730697632,
//             heading: 288.87445068359375,
//             latitude: 36.7384213,
//             longitude: 3.3463877,
//             speed: 0.051263172179460526,
//           },
//           mocked: false,
//           timestamp: 1640286855545,
//         };
//       */
//       // Do something with location...
//     }
//   )
// }

//     return (
//       <View style={styles.container}>
//         {(this.state.latitude && this.state.longitude) ?
//           <Text>My location is: {this.state.latitude}, {this.state.longitude}</Text>
//           :
//           <Text>I don't know where you are!</Text>
//         }

//       </View>
//     );
//   }


// }

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

  // handleUserLocation = () => {
  //   navigator.geolocation.getCurrentPosition(pos => {

  //     this.map.animateToRegion({
  //       ...this.state.initialRegion,
  //       latitude: pos.coords.latitude,
  //       longitude: pos.coords.longitude
  //     })

  //     this.setState({
  //       ...this.state.initialRegion,
  //       latitude: pos.coords.latitude,
  //       longitude: pos.coords.longitude
  //     })
  //   },
  //   err => {
  //     console.log(err);
  //     alert("Something Went Wrong!")
  //   }
  //   )
  // }

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