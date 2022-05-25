import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import sea from '../assets/sea-test.jpg';
import Delays from '../components/Delays';
import { Base, Typography } from '../styles';

export default function Home({route, delays, setDelays}) {
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.header}>Tågförseningar</Text>
        <Image source={sea} style={{width: 320, height: 240 }} />
        <Delays delays={delays} setDelays={setDelays}/>
        <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: Base.container,
  header: Typography.header1,
});
