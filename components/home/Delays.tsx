import { Text, ScrollView } from 'react-native';
import { Typography } from '../../styles';

import DelaysList from './Delay';

export default function Delays({ delays, setDelays, setStations }) {
    return (
        <ScrollView>
            <Text style={Typography.header2}>Förseningar</Text>
            <Text style={Typography.normal}>Tåg:    Tid</Text>
        <DelaysList delays={delays} setDelays={setDelays} setStations={setStations}/>
        </ScrollView>
    );
}