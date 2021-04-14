import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs" 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/Home';
import Restaurant from '../screens/Restaurant';
import OrderDelivery from '../screens/OrderDelivery';
import { COLORS } from "../constants"

const Tab = createBottomTabNavigator();

const TabNav = ()=> {
    return(
        <Tab.Navigator 
            tabBarOptions={{
                activeTintColor: COLORS.primary,
                inactiveTintColor: COLORS.secondary,
            }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" color={color} size={size} />
                ),}}
            />
            <Tab.Screen name="Search" component={Home} options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="search" color={color} size={size} />
                ),}}
            />
            <Tab.Screen name="Favorite" component={Home} options={{
                tabBarLabel: 'Favorite',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="favorite" color={color} size={size} />
                ),}}
            />
            <Tab.Screen name="Orders" component={OrderDelivery} options={{
                tabBarLabel: 'Orders',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="delivery-dining" color={color} size={size} />
                ),}}
            />
        </Tab.Navigator>
    )
}


export default function StackNavigator(){
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={TabNav} />
            <Stack.Screen name="Restaurant" component={Restaurant} />
            <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
        </Stack.Navigator>
    )

}