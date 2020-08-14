import React, { useEffect } from 'react'
import { StyleSheet, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton, PlaceItem } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlace } from '../store/action/placesAct';

const isAndroid = Platform.OS === 'android' ? true : false;
export const PlacesListScreen = ({navigation}) => {
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPlace())
    }, [dispatch]);

    return (
        <FlatList 
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <PlaceItem 
                    title={itemData.item.title}
                    onSelect={() => {
                        navigation.navigate('PlaceDetail', {
                            placeTitle: itemData.item.title,
                            placeId: itemData.item.id
                        })
                    }}
                    image={itemData.item.image}
                    address={itemData.item.address}
                />
            }/>
    );
}

PlacesListScreen.navigationOptions = (navData) => {
    return {
        title: 'All Places',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={'Add Place'} iconName={isAndroid ? 'md-add' : 'ios-add'} onPress={() => {
                    navData.navigation.navigate({routeName: 'NewPlace'})
                }}/>
            </HeaderButtons>,
    }
}

const styles = StyleSheet.create({

});