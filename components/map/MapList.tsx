import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Base, Typography } from "../../styles";
import { Ionicons } from '@expo/vector-icons';

import MapView from 'react-native-maps';
import { Marker, Circle } from "react-native-maps";
import * as Location from 'expo-location';

import delayModel from "../../models/delays";
import stationsModel from "../../models/stations";


export default function MapList() {
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
                <View
                    style={Base.delayCard}
                    key={index}
                    >
                <Text style={Typography.delayText}>Station: {stationname}</Text>
                <Text style={Typography.delayText}>T??g: {trainnr}</Text>
                <Text style={Typography.delayText}>Avg??ngstid: {delayAdTime}</Text>
                <Text style={Typography.delayText}>Ny avg??ngstid: {delayEsTime}</Text>
                <Text style={Typography.delayText}>F??rsening: {minutes} minuter</Text>
                </View>
            );
        } else {
            <Text>Information om avg??ng saknas</Text>
        }
    })

    const toFromMarkers = stations.map((station, index) => {
            const useLocation = stationsModel.getCoordinates(station);
            const delayser = delayModel.getDelaysList(station.LocationSignature, delayed);
            if (delayser.delay[delayser.delay.length-1] !== undefined) {
                let desc = `T??g nr: ${delayser.delay[delayser.delay.length-1].AdvertisedTrainIdent} Ny avg??ngstid: ${delayModel.getTime(delayser.delay[delayser.delay.length-1].AdvertisedTimeAtLocation, delayser.delay[delayser.delay.length-1].EstimatedTimeAtLocation).estime}`;
                let time = delayModel.getTime(delayser.delay[delayser.delay.length-1].AdvertisedTimeAtLocation, delayser.delay[delayser.delay.length-1].EstimatedTimeAtLocation).mins;
                return (<>
                    <Marker
                        key={index}
                        title={station.AdvertisedLocationName}
                        description={desc}
                        coordinate={{ longitude: parseFloat(useLocation[0]), latitude: parseFloat(useLocation[1]) }} 
                        />
                        <Circle
                            center={{
                                longitude: parseFloat(useLocation[0]),
                                latitude: parseFloat(useLocation[1]),
                            }}
                            radius={(((time) * 100) / 2) * 0.7}
                            fillColor="rgba(77, 184, 54, 0.10)"
                            strokeWidth={1}
                            strokeColor="green" 
                            />
                            </>
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
            <Text style={Typography.header2}>F??rseningar</Text>
                <View style={Base.head}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 59.3346,
                            longitude: 18.0869,
                            latitudeDelta: 7,
                            longitudeDelta: 7,
                        }}
                        testID="MapView">
                        {locationMarker}
                        {toFromMarkers}
                    </MapView>
                </View>
            <ScrollView>
            <View style={Base.infoCard} testID="infoText">
                <Text style={Typography.infoText}><Ionicons name="information-circle-outline" color="white" size={25}>        </Ionicons>I v??ntan p?? t??get</Text> 
                <Text style={Typography.delayText}>Markerat p?? kartan finner du en gr??n cirkel vid stationens pin som visar vart du hinner promenera medan du v??ntar.</Text>
                <Text></Text>
                <Text style={Typography.delayText}>Zooma in p?? kartan f??r att se markeringen.</Text>
            </View>
                {showList}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

