import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base } from "../proj/styles";
import FlashMessage from "react-native-flash-message";

import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import Map from "./components/map/Map";
import Favorites from './components/favorites/Fav';
// import trainsModel from "./models/delays";
import authModel from "./models/auth";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoggedIn(await authModel.loggedIn());
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = routeIcons[route.name] || "alert";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(34,36,40,1)',
      },
      })}
    >
        <Tab.Screen name="Hem" component={Home} />
        <Tab.Screen name="Trafikinfo" component={Map} />
        {isLoggedIn ?
          <Tab.Screen name="Favoriter">
            {() => <Favorites setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen> :
          <Tab.Screen name="Logga in">
            {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
        }
        </Tab.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: Base.container,
});

const routeIcons = {
  "Trafikinfo": "train-outline",
  "Hem": "home-outline",
  // "Plock": "list",
  // "Inleverans": "send",
  "Logga in": "person-outline",
  "Favoriter": "person-outline",
  // "Skicka order": "map",
};