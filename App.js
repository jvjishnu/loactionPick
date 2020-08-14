import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { PlacesNavigator } from './src/navigation/PlacesNavigation';
import ReduxThunk from 'redux-thunk';
import { placesReducer } from './src/store/reducer/placesRed';
import { init } from './src/helpers/db';

init()
  .then(() => {
    console.log('Successfully connected to db');
  })
  .catch(err => {
    console.log('Initalising db failed\n', err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)}/>
  }

  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}