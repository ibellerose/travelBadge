import { StatusBar } from 'expo-status-bar';
import React, {Children} from 'react';
import {KeyboardAvoidingView} from 'react-native'
import styles from "../config/style";
import colors from "../config/colors";
import { Header } from '@rneui/themed';

import { color } from '@rneui/base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Screen({children}) {

return (
  <SafeAreaProvider>
    
    <Header 
        style={styles.headerContainer}
        centerComponent={{ text: 'Boston', style: styles.heading }}
        leftComponent={{icon: 'menu', color: colors.light}}
    />
    {children}
  </SafeAreaProvider>
);

}