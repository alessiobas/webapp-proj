import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import sea from '../assets/sea-test.jpg';
import Delays from '../components/Delays';
import { Base, Typography } from '../styles';

export default function Home({route, delays, setDelays, setStations}) {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Tågförseningar</Text>
        <Image source={sea} style={{width: 320, height: 240 }} />
        <Delays delays={delays} setDelays={setDelays} setStations={setStations}/>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: Base.container,
  header: Typography.header1,
});
