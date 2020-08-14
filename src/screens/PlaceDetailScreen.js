import React from 'react'
import { StyleSheet, Image, View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import MapPreview from 'react-native-maps';
import { Colours } from '../constants/Colours';

export const PlacesDetailScreen = ({navigation}) => {
    const placeId = navigation.getParam('placeId');
    const place = useSelector(state => state.places.places).find(place => place.id === placeId);

    const selectedLocation = {
        lat: place.lat,
        lng: place.lng
    };

    const showMapHandler = () => {
        navigation.navigate('Map', {
            readOnly: true,
            initialLocation: selectedLocation
        });
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <Image style={styles.image} source={{ uri: place.image }}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
                <MapPreview style={styles.mapPreview}
                    location={selectedLocation}
                    onPress={showMapHandler}/>
            </View>
        </ScrollView>
    );
}

PlacesDetailScreen.navigationOptions = (navData) => {
    return {
        title: navData.navigation.getParam('placeTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    address: {
        color: Colours.PRIMARY,
        textAlign: 'center'
    },
    addressContainer: {
        padding: 20
    }
});