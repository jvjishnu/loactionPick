import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, Platform, Alert } from 'react-native';
import MapView, { Marker }  from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../components';

const isAndroid = Platform.OS === 'android' ? true : false;
export const MapScreen = ({navigation}) => {
    const initialLocation = navigation.getParam('initialLocation');
    const readOnly = navigation.getParam('readOnly');

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);


    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const selectLocationHandler = (event) => {
        if(readOnly) {
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation) {
            Alert.alert('Please pick a location', 'You haven\'t selected a location' ,[{ text: 'Okay' }]);
            return;
        }
        navigation.navigate('NewPlace', { 
            pickedLocation: selectedLocation
        });
    }, [selectedLocation]);

    useEffect(() => {
        navigation.setParams({
            saveLocation: savePickedLocationHandler
        });
    }, [savePickedLocationHandler]);

    let markerCoordinates;

    if(selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    return (
        <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
            {markerCoordinates && <Marker title={'Picked Location'} coordinate={markerCoordinates}></Marker>}
        </MapView>
    );
}

MapScreen.navigationOptions = (navData) => {
    const readOnly = navData.navigation.getParam('readOnly');
    if(readOnly) {
        return {}
    }
    return {
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={'Add Place'} iconName={isAndroid ? 'md-save' : 'ios-save'} onPress={navData.navigation.getParam('saveLocation')}/>
            </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});