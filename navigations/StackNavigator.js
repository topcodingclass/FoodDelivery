import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs" 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path } from 'react-native-svg';

import Home from '../screens/Home';
import Restaurant from '../screens/Restaurant';
import OrderDelivery from '../screens/OrderDelivery';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const Tab = createBottomTabNavigator();

//Create custom bottom button
const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.white
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: COLORS.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}


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
                ),tabBarButton: (props) => (
                    <TabBarCustomButton
                        {...props}
                    />
                )}}
            />
            <Tab.Screen name="Search" component={Home} options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="search" color={color} size={size} />
                ),tabBarButton: (props) => (
                    <TabBarCustomButton
                        {...props}
                    />
                )}}
            />
            <Tab.Screen name="Favorite" component={Home} options={{
                tabBarLabel: 'Favorite',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="favorite" color={color} size={size} />
                ),tabBarButton: (props) => (
                    <TabBarCustomButton
                        {...props}
                    />
                )}}
            />
            <Tab.Screen name="Orders" component={OrderDelivery} options={{
                tabBarLabel: 'Orders',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="delivery-dining" color={color} size={size} />
                ),tabBarButton: (props) => (
                    <TabBarCustomButton
                        {...props}
                    />
                )}}
            />
        </Tab.Navigator>
    )
}


export default function StackNavigator(){
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={TabNav} 
                options={{                    
                    headerLeft: () => (
                        <TouchableOpacity style={{width: 50, paddingLeft: SIZES.padding * 2, justifyContent: 'center' }}>
                            <Image source={icons.nearby} resizeMode="contain" style={{width: 30,height: 30}}/>
                        </TouchableOpacity>
                    ),
                    headerRight:()=>(
                        <TouchableOpacity style={{width: 50, paddingLeft: SIZES.padding * 2, justifyContent: 'center' }}>
                            <Image source={icons.basket} resizeMode="contain" style={{width: 30,height: 30}}/>
                        </TouchableOpacity>
                    )
                }}/>
            <Stack.Screen name="Restaurant" component={Restaurant} />
            <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
        </Stack.Navigator>
    )

}