import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, ScrollView, View, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../../styles';
import { Ionicons } from '@expo/vector-icons';

import sea from '../../assets/sea-test.jpg';
import Delays from './Delays';
import Delay from './Delay';
import delayModel from '../../models/delays';
import { Button } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function Home({ navigation }) {

  return (
    <ImageBackground source={sea} style={{ width: '100%', height: '100%'}}>
        <Text style={Typography.home}>Tågförseningar i Sverige</Text>
        <Button style={Base.homeButton} 
          onPress={() => 
            navigation.navigate('Trafikinfo')
        }>
          <Text style={Typography.homeButtonText}><Ionicons name="open-outline" style={{ color: 'white', fontSize: 18 }}></Ionicons>  Se förseningar...</Text>
        </Button>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: Base.container,
  header: Typography.header1,
});
