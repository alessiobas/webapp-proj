import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapList from './MapList';
import MapOne from './MapOne';

const Stack = createNativeStackNavigator();

export default function Map(props) {

    return (
        <Stack.Navigator initialRouteName="List" screenOptions={{headerShown: false}}>
            <Stack.Screen name="List">
                { (screenProps) => <MapList {...screenProps} />}
            </Stack.Screen>
            {/* <Stack.Screen name="One">
                { (screenProps) => <MapOne {...screenProps} isLoggedIn={props.isLoggedIn} />}
            </Stack.Screen> */}
        </Stack.Navigator>
    );
}