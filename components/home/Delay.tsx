import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Base, Typography } from '../../styles';

import delayModel from "../../models/delays";
import stationModel from "../../models/stations";

export default function DelaysList({ delays, setDelays, setStations }) {

    useEffect(async () => {
        setDelays(await delayModel.getDelays());
    }, []);

    useEffect(async () => {
        setStations(await stationModel.getStations());
    }, []);

    const list = delays.map((delay, index) => {
        return <Text style={{ ...Typography.normal }} key={index}>
                { delay.AdvertisedLocationName }{"\n"}
                { delay.AdvertisedTimeAtLocation }{"\n"}
                { delay.EstimatedTimeAtLocation }{"\n"}
                </Text>
    });

    return (
        <View>
            {list}
        </View>
    );
};