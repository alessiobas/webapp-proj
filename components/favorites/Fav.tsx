import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FavList from './FavList';
import FavDetails from './DropDown';
import AddFav from './AddFav';

const Stack = createNativeStackNavigator();

export default function Favorites(props) {
    return (
        <Stack.Navigator initialRouteName="FavList" screenOptions={{headerShown: false}}>
            <Stack.Screen name="FavList">
                { (screenProps) => <FavList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="AddFav" component={AddFav} />
        </Stack.Navigator>
    );
};