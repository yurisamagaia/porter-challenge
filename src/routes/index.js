import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
 
import Detail from "../components/detail";
import movies from "../components/movies";
 
const Page = createStackNavigator();
 
const Routes = () => (
 <Page.Navigator
   screenOptions={{
     headerShown: false,
     cardStyle: { backgroundColor: "#fff" },
   }}
 >
   <Page.Screen name="movies" component={movies} />
   <Page.Screen name="detail" component={Detail} />
 </Page.Navigator>
);
 
export default Routes;