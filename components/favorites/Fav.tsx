import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FavList from './FavList';
import FavForm from './FavForm';

const Stack = createNativeStackNavigator();

export default function Favorites(props) {
    return (
        <Stack.Navigator initialRouteName="List" screenOptions={{headerShown: false}}>
            <Stack.Screen name="List">
                { (screenProps) => <FavList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Form" component={FavForm} />
        </Stack.Navigator>
    );
};