import React, { useState, useEffect } from 'react';
import { View, Button, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import storage from "../../models/storage";
import favModel from '../../models/fav';
import delayModel from '../../models/delays';
import stationsModels from '../../models/stations';
import { Base, Typography } from './../../styles';
import { showMessage } from 'react-native-flash-message';
import { Picker } from "@react-native-picker/picker";

export default function FavList({ route, navigation, setIsLoggedIn }) {
    let { reload } = route.params || false;
    const [ favStations, setFavStations ] = useState<Object>([]);
    const [ stations, setStations ] = useState([]);
    const [ selStations, setSelStations ] = useState([]);
    // const [refreshing, setRefreshing] = useState(false);

    // let collectedStations = [];

    if (reload) {
        userData();
        stationsList();
    }

    // const onRefresh = async() => {
    //     setFavStations(await favModel.showFav());
    // }

    async function userData() {
        setFavStations(await favModel.showFav());
    };

    async function stationsList() {
        const stationsList = await stationsModels.getStations();
        setStations(stationsList);
    };

    async function setFav(artefact) {
        await favModel.addFav(artefact);
    }

    useEffect(() => {
        userData();
        stationsList();
    }, []);

    const stationsNames = stations.map((station, index) => {
        return (
            <Picker.Item 
                key={index}
                label={station.AdvertisedLocationName}
                value={station.LocationSignature}
            />
        )
    })

    const getFavS = favStations.map((stat, index) => {
        return (<View key={index} style={Base.delayCard}>
            <Text style={Typography.delayText}>Station: {stat.AdvertisedLocationName}</Text>
            <Text style={Typography.delayText}>Tåg: {stat.AdvertisedTrainIdent}</Text>
            <Text style={Typography.delayText}>Avgångstid: {delayModel.getTime(stat.AdvertisedTimeAtLocation, stat.EstimatedTimeAtLocation).adtime}</Text>
            <Text style={Typography.delayText}>Ny avgångstid: {delayModel.getTime(stat.AdvertisedTimeAtLocation, stat.EstimatedTimeAtLocation).estime}</Text>
            <Text style={Typography.delayText}>Försening: {delayModel.getTime(stat.AdvertisedTimeAtLocation, stat.EstimatedTimeAtLocation).mins} minuter</Text>

        </View>);
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
            <View>
                <Text style={Typography.header2}>Favoritstationer</Text>
                <Text style={Typography.normal}>Addera station till favoriter</Text>
                <Picker
                selectedValue={selStations}
                onValueChange={(itemValue) => {
                    setSelStations( itemValue )
                }}
                itemStyle={{ color: 'white', borderColor: 'white'}}>
                {stationsNames}
                </Picker>
                <Button
                title="Addera station"
                onPress={() => {
                    setFav(selStations);
                    navigation.navigate("FavList", { reload: true });
                }}
                />
                <Text></Text>
                <Text style={Typography.normal}>Eventuella förseningar till dina sparade stationer visas nedan </Text>
                <ScrollView>
                {getFavS}
                </ScrollView>
            </View>
            <View>
                <Button
                title="Logga ut"
                onPress={async () => {
                    await logOut();
                }}
                />
            </View>
        </SafeAreaView>
    )
}