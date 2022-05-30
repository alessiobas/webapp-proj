import React, { useState, useEffect } from 'react';
import { View, Button, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import storage from "../../models/storage";
import favModel from '../../models/fav';
import delayModel from '../../models/delays';
import stationsModels from '../../models/stations';
import { Base, Typography } from './../../styles';
import { showMessage } from 'react-native-flash-message';
import { Picker } from "@react-native-picker/picker";

export default function FavList({ route, navigation, setIsLoggedIn }) {
    let { reload } = route.params || false;
    const [ stations, setStations ] = useState([]);
    const [ data, setData ] = useState([]);

    let collectedStations = [];

    if (reload) {
        getSavedFavs();
    }

    async function getSavedFavs() {
        const result = await favModel.showFav();

        setData(result);
    };

    async function setAllStations() {
        const allStations = await stationsModels.getStations();

        setStations(allStations);
    };

    useEffect(() => {
        setAllStations();
        getSavedFavs();
    }, []);

    for (let i=0; i < data.length; i++) {
        let nameStation = stationsModels.getStation(data[i], stations);
        collectedStations.push(nameStation);
    }

    const getFavS = collectedStations.map((stat, index) => {
        if (stat.ActivityId !== undefined) {
            return (
            <View key={index} style={Base.delayCard}>
            <Text style={Typography.delayText}>Station: {stat.AdvertisedLocationName}</Text>
            <Text style={Typography.delayText}>Tåg: {stat.AdvertisedTrainIdent}</Text>
            <Text style={Typography.delayText}>Avgångstid: {delayModel.getTime(stat.AdvertisedTimeAtLocation, stat.EstimatedTimeAtLocation).adtime}</Text>
            <Text style={Typography.delayText}>Ny avgångstid: {delayModel.getTime(stat.AdvertisedTimeAtLocation, stat.EstimatedTimeAtLocation).estime}</Text>
            <Text style={Typography.delayText}>Försening: {delayModel.getTime(stat.AdvertisedTimeAtLocation, stat.EstimatedTimeAtLocation).mins} minuter</Text>

        </View>);
        } else {
            <View key={index} style={Base.delayCard}>
            <Text style={Typography.delayText}>Station: {stationsModels.getStationByArtefact(stat, stations)}</Text>
            <Text style={Typography.delayText}>Inga förseningar</Text>
        </View>
        }
    })

    async function logOut() {
        storage.deleteToken();
        setIsLoggedIn(false);
        showMessage({
            message: "Utloggad",
            description: "Logga in igen för att se favoriter",
            type: "success"
        });
    }

    return (
        <SafeAreaView style={Base.container}>
                <Text style={Typography.header2}>Favoritstationer</Text>
                <Text></Text>
                <Text style={Typography.normal}>Eventuella förseningar till dina sparade stationer visas nedan </Text>
                <Text></Text>
                <Text style={Typography.normal}>Antal sparade stationer: {collectedStations.length}</Text>
                <ScrollView>
                {getFavS}
                </ScrollView>
            <View>
            <TouchableOpacity
                style={Base.loginButton}
                title="Addera stationer"
                onPress={async () => {
                    navigation.navigate("AddFav");
                }}
                >
            <Text style={Typography.loginBtnTxt}>Addera stationer</Text>
            </TouchableOpacity>
                <TouchableOpacity
                style={Base.registerButton}
                title="Logga ut"
                onPress={async () => {
                    await logOut();
                }}
                >
            <Text style={Typography.loginBtnTxt}>Logga ut</Text>
            </TouchableOpacity>
            <Text></Text>
            </View>
        </SafeAreaView>
    )
}