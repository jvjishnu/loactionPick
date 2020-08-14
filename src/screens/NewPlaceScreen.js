import React, { useState, useCallback } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colours } from '../constants/Colours';
import { useDispatch } from 'react-redux';
import { addPlace } from '../store/action/placesAct';
import { ImageSelector, LocationPicker } from '../components';

export const NewPlaceScreen = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [location, setLocation] = useState();
    const dispatch = useDispatch();

    const titleChangeHandler = (text) => {
        setTitle(text)
    }

    const imageTakenHandler = (imagePath) => {
        setImage(imagePath);
    }

    const locationPickedHandler = useCallback((locationData) => {
        setLocation(locationData);
    }, []);

    const savePlaceHandler = () => {
        dispatch(addPlace(title, image, location));
        navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    style={styles.textInput} 
                    onChangeText={titleChangeHandler} 
                    value={title}
                />
                <ImageSelector onImageTaken={imageTakenHandler}/>
                <LocationPicker onLocationPicked={locationPickedHandler} navigation={navigation}/>
                <Button title={'Save Place'} color={Colours.PRIMARY} onPress={savePlaceHandler}/>
            </View>
        </ScrollView>
    );
}

NewPlaceScreen.navigationOptions = {
    title: 'Add Place'
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});