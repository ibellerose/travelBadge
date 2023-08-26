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
//import badgeInfoJson from '../../jsonDocuments/badgeInfo.json';

import * as Location from "expo-location"
import { Button, color, Input } from '@rneui/base';
import { Tab, TabView, Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useSelector, useDispatch } from "react-redux";
import { visitLocation } from "../redux/actions/visitAction";


export default function login() {


    const username = "";
    const password = "";

    //Two text fields
    //Submit button
    //"Have not registered" button
    return(
        <SafeAreaProvider style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Input placeholder='Username'></Input>
            <Input placeholder='Password'></Input>
            <Button title="Login"></Button>
            <Button title="Have you not registered yet?" type='clear' style={{marginTop: 50}} containerStyle={styles.noLoginButton}></Button>
            
        </SafeAreaProvider>
    )
}