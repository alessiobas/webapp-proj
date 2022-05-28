import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Base, Typography } from "../../styles";
import { DataTable } from 'react-native-paper';

import MapView from 'react-native-maps';
import { Marker, Circle } from "react-native-maps";
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native';
import { showMessage } from "react-native-flash-message";

import delayModel from "../../models/delays";
import stationsModel from "../../models/stations";
import Delays from "../home/Delays";


export default function MapList({ navigation }) {
    // const {order} = route.params;
    // const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [delayed, setDelays] = useState([]);
    const [stations, setStations] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
    
            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    async function getStations() {
        try {
            const stations = await delayModel.getDelaysListAsync();
            setStations(stations);
        } catch(e) {
            //error
        }
    };

    async function getDelayed() {
        try {
            const delayss = await delayModel.getDelays();
            setDelays(delayss);
        } catch (e) {
            //error
        }
        
    };

    useEffect( () => {
        getStations();
        getDelayed();
    }, []);

    const showList = stations.map((station, index) => {
        const theDelay = delayModel.getDelaysList(station.LocationSignature, delayed);
        if (theDelay.delay[theDelay.delay.length-1] !== undefined) {
            let stationname = station.AdvertisedLocationName;
            let trainnr = theDelay.delay[theDelay.delay.length-1].AdvertisedTrainIdent;
            let delayAdTime = delayModel.getTime(theDelay.delay[theDelay.delay.length-1].AdvertisedTimeAtLocation, theDelay.delay[theDelay.delay.length-1].EstimatedTimeAtLocation).adtime;
            let delayEsTime = delayModel.getTime(theDelay.delay[theDelay.delay.length-1].AdvertisedTimeAtLocation, theDelay.delay[theDelay.delay.length-1].EstimatedTimeAtLocation).estime;
            let minutes = delayModel.getTime(theDelay.delay[theDelay.delay.length-1].AdvertisedTimeAtLocation, theDelay.delay[theDelay.delay.length-1].EstimatedTimeAtLocation).mins;
            return (
                <TouchableOpacity
                    style={Base.delayCard}
                    key={index}
                    onPress={() => {
                            navigation.navigate("One", {theDelay: theDelay})
                    }}>
                <Text style={Typography.delayText}>Station: {stationname}</Text>
                <Text style={Typography.delayText}>Tåg: {trainnr}</Text>
                <Text style={Typography.delayText}>Avgångstid: {delayAdTime}</Text>
                <Text style={Typography.delayText}>Ny avgångstid: {delayEsTime}</Text>
                <Text style={Typography.delayText}>Försning: {minutes} minuter</Text>
                </TouchableOpacity>
            );
        } else {
            <Text>Information om avgång saknas</Text>
        }
    })

    const toFromMarkers = stations.map((station, index) => {
            const useLocation = stationsModel.getCoordinates(station);
            const delayser = delayModel.getDelaysList(station.LocationSignature, delayed);
            if (delayser.delay[delayser.delay.length-1] !== undefined) {
                let desc = `Tåg nr: ${delayser.delay[delayser.delay.length-1].AdvertisedTrainIdent} Ny avgångstid: ${delayModel.getTime(delayser.delay[delayser.delay.length-1].AdvertisedTimeAtLocation, delayser.delay[delayser.delay.length-1].EstimatedTimeAtLocation).estime}`;
                return (
                    <Marker
                        key={index}
                        title={station.AdvertisedLocationName}
                        description={desc}
                        coordinate={{ longitude: parseFloat(useLocation[0]), latitude: parseFloat(useLocation[1]) }}
                    />
                );
            } else {
                return (
                    <Marker
                        key={index}
                        title={station.AdvertisedLocationName}
                        description="Info saknas"
                        coordinate={{ longitude: parseFloat(useLocation[0]), latitude: parseFloat(useLocation[1]) }}
                    />
                );
            }
    });

    return (
        <SafeAreaView style={Base.container}>
            <Text style={Typography.header2}>Förseningar</Text>
            <View style={Base.head}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 59.3346,
                        longitude: 18.0869,
                        latitudeDelta: 7,
                        longitudeDelta: 7,
                    }} >
                    {locationMarker}
                    {toFromMarkers}
                </MapView>
            </View>
            <ScrollView>
                {showList}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

