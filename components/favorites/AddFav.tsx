import { View, Text, Button } from "react-native";
import React, { useState, useEffect } from 'react';
import { Picker } from "@react-native-picker/picker";
import { Base, Typography } from '../../styles';

import Station from './../../interfaces/stations';
import favModel from './../../models/fav';
import storage from "../../models/storage";
import stationModel from "../../models/stations";

export default function AddFav({ navigation }) {
    const [ fav, setFav ] = useState<Partial<Station>>({});
    const [ stations, setStations ] = useState([]);

    async function getAllStations() {
        const allStations = await stationModel.getStations();
        setStations(allStations);
    }

    useEffect( () => {
        getAllStations();
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

    async function add() {
        const token = await storage.readToken();
        await favModel.addFav(fav, token);

        navigation.navigate("FavList", { reload: true });
    }

    return (
        <View style={Base.container}>
            <Text>
                Välj station att lägga till som Favorit
            </Text>
        <Picker
            selectedValue={fav.LocationSignature}
            onValueChange={(itemValue) => {
                setFav({ LocationSignature: itemValue})
            }}
            itemStyle={{ color: 'white', borderColor: 'white'}}>
            {stationsNames}
        </Picker>
        <Button
            title="Addera stationen till Favoriter"
            onPress={() => {
                add();
            }}>
        </Button>
        </View>
    );
}