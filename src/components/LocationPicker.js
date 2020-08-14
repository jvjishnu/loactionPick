import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text, ActivityIndicator, Alert } from 'react-native';
import { Colours } from '../constants/Colours';
import { getCurrentPositionAsync } from 'expo-location';
import { askAsync, LOCATION } from 'expo-permissions';
import { MapPreview } from './MapPreview';

export const LocationPicker = ({navigation, onLocationPicked}) => {
    const [isFetching, setIsFetching] = useState(false)
    const [pickedLocation, setPickedLocation] = useState();

    const mapPickedLocation = navigation.getParam('pickedLocation');

    useEffect(() => {
        if(mapPickedLocation) {
            setPickedLocation(mapPickedLocation)
            onLocationPicked(mapPickedLocation)
        }
    }, [mapPickedLocation, onLocationPicked]);

    const verifyPermissions = async () => {
        const result = await askAsync(LOCATION);
        if(result.status !== 'granted') {
            Alert.alert('Insufficient Permissions!', 'Please grant location permission', [{text: 'Okay'}]);
            return false;
        }
        return true;
    }


    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return ; 
        }
        try {
            setIsFetching(true);
            const location = await getCurrentPositionAsync({
                timeout: 5000
            });

            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch(err) {
            Alert.alert('Could not fetch location', 'Please try again later or select location manually', [{ text: 'Okay' }])
        }
        setIsFetching(false);
    }

    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    }

    return (
        <View style={styles.locationPicker}>
            <View style={styles.mapPreview}>
                <MapPreview location={pickedLocation} onSelect={pickOnMapHandler}>
                    {isFetching ? (
                        <ActivityIndicator size={'large'} color={Colours.PRIMARY}/>
                    ) : (
                        <Text>No location selected yet!</Text>
                    )}
                </MapPreview>
            </View>
            <View style={styles.buttonContainer}>
                <Button title={'Get Location'} color={Colours.PRIMARY} onPress={getLocationHandler}/>
                <Button title={'Pick on Map'} color={Colours.PRIMARY} onPress={pickOnMapHandler}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
        alignItems: 'center'
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});