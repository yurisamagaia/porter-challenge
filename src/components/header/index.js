import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
 
//Componente simples de cabeçalho que recebe o parametro 'title', enviado pelo App.js
const Header = (props) => {
 return (
   <View style={styles.body}>
     <Text style={styles.title}>{props.title}</Text>
   </View>
 );
};
 
const styles = StyleSheet.create({
 body: {
   alignItems: 'center',
   backgroundColor: '#000',
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 15,
   },
   shadowOpacity: 0.3,
   shadowRadius: 7,
   elevation: 10,
   paddingTop: 45,
   paddingBottom: 15
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold',
   textAlign: "center",
   color: '#E1071F'
 },
});
 
export default Header;