import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { key } from '../../env';

const isAndroid = Platform.OS === 'android' ? true : false;
export const MapPreview = ({location, children, style, onSelect}) => {
    let imagePreviewUrl;

    if(location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${key.googleApiKey}`;
    }

    const TouchableComp = (isAndroid && Platform.Version >= 21) ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <TouchableComp onPress={onSelect} style={{...styles.mapPreview, ...style}}>
            {location ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }}/> : children}
        </TouchableComp>
    );
}

const styles = StyleSheet.create({
    mapImage: {
        width: '100%',
        height: '100%'
    },
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});