import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapList from './MapList';

const Stack = createNativeStackNavigator();

export default function Map(props) {

    return (
        <Stack.Navigator initialRouteName="List" screenOptions={{headerShown: false}}>
            <Stack.Screen name="List">
                { (screenProps) => <MapList {...screenProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}