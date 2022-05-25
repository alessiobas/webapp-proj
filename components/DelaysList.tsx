import { useState, useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles';

import trainsModel from "../models/trains";

export default function DelaysList({ delays, setDelays }) {

    useEffect(async () => {
        setDelays(await trainsModel.getDelays());
    }, []);

    const list = delays.map((delay, index) => {
        return <Text style={{ ...Typography.normal }} key={index}>
                { delay.AdvertisedLocationName }{"\n"}
                { delay.AdvertisedTimeAtLocation }{"\n"}
                { delay.EstimatedTimeAtLocation }{"\n"}
                </Text>
    });

    return (
        <ScrollView>
            {list}
        </ScrollView>
    );
};