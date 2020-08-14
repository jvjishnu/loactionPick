import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Colours } from '../constants/Colours';
import { MapScreen, NewPlaceScreen, PlacesDetailScreen, PlacesListScreen } from '../screens';
import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android' ? true : false;
const defNavOptions = {
    headerStyle: {
        backgroundColor: isAndroid ? Colours.PRIMARY : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: 'open-sans',
    headerTintColor: isAndroid ? 'white' : Colours.PRIMARY
}

const PlaceNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PlaceDetail: PlacesDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
}, {
    defaultNavigationOptions: defNavOptions
});

export const PlacesNavigator = createAppContainer(PlaceNavigator)