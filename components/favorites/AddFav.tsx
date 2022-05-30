import { View, Text, Button, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';
import { Picker } from "@react-native-picker/picker";
import { Base, Typography } from '../../styles';

import Station from './../../interfaces/stations';
import favModel from './../../models/fav';
import storage from "../../models/storage";
import stationModel from "../../models/stations";
import DropDown from "./DropDown";

export default function AddFav({ navigation }) {
    const [ fav, setFav ] = useState<Object>([]);

    async function setFavStation() {
        await favModel.addFav(fav);
        navigation.navigate("FavList", { reload: true });
    }

    return (
        <SafeAreaView style={Base.container}>
            <Text style={Typography.header2}>Addera station till favoriter</Text>
                <DropDown
                    station={fav}
                    setStations={setFav}
                />
                <Text></Text>
                <TouchableOpacity
                style={Base.registerButton}
                title="Addera station"
                onPress={() => {
                    setFavStation();
                }}
                testID="addButton"
                >
                <Text style={Typography.loginBtnTxt}>Addera station</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
}
