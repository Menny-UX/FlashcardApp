// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './navigation/mainNavigation';
import MyStatusBar from './components/newStatusbar';
import {askPermissions, scheduleNotification } from './utils/helpers';


import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from './reducer'

import logger from "redux-logger";
import thunk from "redux-thunk";


export default class App extends React.Component{
  componentDidMount(){
    askPermissions().then((data)=> scheduleNotification());
  }
  render(){
    return (
      <Provider store={createStore(reducer, applyMiddleware(logger, thunk))}>
        <NavigationContainer>
          <MyStatusBar />
            <View style={styles.container}>
              <MainNavigation></MainNavigation>
            </View>
        </NavigationContainer>
      </Provider>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    height: '100vh',
    width: '100vw'
  },
});
