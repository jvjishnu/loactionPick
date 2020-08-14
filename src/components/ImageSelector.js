import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import { Colours } from '../constants/Colours';
import { launchCameraAsync } from 'expo-image-picker';
import { askAsync, CAMERA, CAMERA_ROLL } from 'expo-permissions';

export const ImageSelector = ({onImageTaken}) => {
    const [pickedImage, setPickedImage] = useState();
    const verifyPermissions = async () => {
        const result = await askAsync(CAMERA, CAMERA_ROLL);
        if(result.status !== 'granted') {
            Alert.alert('Insufficient Permissions!', 'Please grant camera permission', [{text: 'Okay'}]);
            return false;
        }
        return true;
    }

    const takeImgaeHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return ; 
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        setPickedImage(image.uri);
        onImageTaken(image.uri);
    }

    return (
        <View style={styles.imageSelector}>
            <View style={pickedImage ? styles.imagePreview : styles.imagePreviewNoImage}>
                {!pickedImage ? (
                    <Text>No Image Picked Yet</Text>
                ) : (
                <Image style={styles.image} source={{ uri: pickedImage }}/>)
                }
            </View>
            <Button title={'Take Image'} color={Colours.PRIMARY} onPress={takeImgaeHandler}/>
        </View>
    );
}

const styles = StyleSheet.create({
    imageSelector: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    imagePreviewNoImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%'
    }
});