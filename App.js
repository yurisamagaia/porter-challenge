import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './src/components/header'
 
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
 
import { Provider } from 'react-redux';
 
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './src/redux/reducers'
 
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
 
export default function App() {
 return (
   <Provider store={store}>
     <View style={styles.container}>
       <NavigationContainer>
         <StatusBar style="auto" />
         <Header title="FILMEFLIX" />
         <Routes />
       </NavigationContainer>
     </View>
   </Provider>
 );
}
 
const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
 },
});
