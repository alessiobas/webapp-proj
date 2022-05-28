import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base } from "../proj/styles";
import FlashMessage from "react-native-flash-message";

import Home from "./components/Home";
import Auth from "./components/auth/Auth";
import trainsModel from "./models/trains";
import authModel from "./models/auth";

const Tab = createBottomTabNavigator();

export default function App() {
  const [delays, setDelays] = useState([]);
  const [stations, setStations] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      setStations(await trainsModel.getStations());
    })();
  }, []);

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
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(34,36,40,1)',
      },
      })}
    >
        <Tab.Screen name="Delays">
            {() => <Home delays={delays} setDelays={setDelays} setStations={setStations} />}
        </Tab.Screen>
        {/* <Tab.Screen name="Plock">
          {() => <Pick setProducts={setProducts} allOrders={allOrders} setAllOrders={setAllOrders} />}
        </Tab.Screen>
        <Tab.Screen name="Inleverans">
          {() => <Deliveries setProducts={setProducts} />}
        </Tab.Screen> */}
        {isLoggedIn ?
          <Tab.Screen name="Faktura">
            {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen> :
          <Tab.Screen name="Logga in">
            {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
        }
        {/* <Tab.Screen name="Skicka order">
          {() => <Ship/>}
        </Tab.Screen> */}
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
  "Delays": "train-outline",
  // "Plock": "list",
  // "Inleverans": "send",
  "Logga in": "lock-closed",
  // "Faktura": "cash-outline",
  // "Skicka order": "map",
};