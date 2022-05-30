import React, { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import stationsModels from './../../models/stations';

export default function DropDown(props) {
    const [ allStations, setAllStations ] = useState([]);


    async function getAllStations() {
        const allStations = await stationsModels.getStations();
        setAllStations(allStations);
    }

    useEffect( () => {
        getAllStations();
    }, []);

    const stationsNames = allStations.map((station, index) => {
        return (
            <Picker.Item 
                key={index}
                label={station.AdvertisedLocationName}
                value={station.LocationSignature}
            />
        )
    })

    return (
        <Picker
        selectedValue={props.station?.LocationSignature}
        onValueChange={(itemValue) => {
            props.setStations( itemValue )
        }}
        itemStyle={{ color: 'white', borderColor: 'white'}}
        testID="picker">
        {stationsNames}
        </Picker>
    );
}