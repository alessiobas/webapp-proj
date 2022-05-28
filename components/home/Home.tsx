import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../../styles';

import sea from '../../assets/sea-test.jpg';
import Delays from './Delays';
import Delay from './Delay';
import delayModel from '../../models/delays';

const Stack = createNativeStackNavigator();

export default function Home(props) {
  const [delays, setDelays] = useState([]);

  useEffect(() => {
    (async () => {
      setDelays(await delayModel.getDelays());
    })();
  }, []);

  return (
    <Stack.Navigator initialRouteName="List" screenOptions={{headerShown: false}}>
        <Stack.Screen name="List">
            { (screenProps1) => <Delays {...screenProps1} stations={props.stations} starStations={props.starStations} setStarStations={props.setStarStations} />}
        </Stack.Screen>
        <Stack.Screen name="Details">
            { (screenProps) => <Delay {...screenProps} stations={props.stations} delays={delays} starStations={props.starStations} setStarStations={props.setStarStations} isLoggedIn={props.isLoggedIn} />}
        </Stack.Screen>
    </Stack.Navigator>
);
}

const styles = StyleSheet.create({
  container: Base.container,
  header: Typography.header1,
});
