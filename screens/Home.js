import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS, SIZES, FONTS, images } from '../constants';
import { CATEGORIES } from '../data/data';
import { db } from '../dbConfig';
import firebase from 'firebase';

const Home = () =>{

    const [selectedCategory, setSelectedCategory] = useState(1);
    const [restaurants, setRestaurants] = useState();
    //Get current location
    let lat=0
    let long=0

    const success = position => {
        //console.log(position)
         lat = parseFloat(position.coords.latitude)
         long = parseFloat(position.coords.longitude)
         //console.log(lat, long)
          
      };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
      }, []);

    useEffect(() => {
        console.log('****Category', selectedCategory)
        const messagesListener =db
          .collection('restaurants')
          .where("categories", "array-contains", selectedCategory)          
          .onSnapshot((querySnapshot) => {
            const messages = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data();
            //console.log('Read row', firebaseData)
            return firebaseData;
        });
        //console.log('From db', messages)
        setRestaurants(messages);
           
        });
        // Stop listening for updates whenever the component unmounts
        return () => messagesListener();
      }, [selectedCategory]);


    function onSelectCategory(category){
        console.log('****************', category.id)
        setSelectedCategory(category.id)
    }

    function getImage(name){
        
        switch(name){
            case 'images.avatar_1': return require("../assets/images/avatar-1.jpg");
            case 'images.avatar_2': return require("../assets/images/avatar-2.jpg");
            case 'images.avatar_3': return require("../assets/images/avatar-3.jpg");
            case 'images.avatar_4': return require("../assets/images/avatar-4.jpg");
            case 'images.avatar_5': return require("../assets/images/avatar-5.jpg");
            case 'images.baked_fries': return require("../assets/images/baked-fries.jpg");
            case 'images.burger_restaurant_1': return require("../assets/images/burger-restaurant.jpg");
            case 'images.burger_restaurant_2': return require("../assets/images/burger-restaurant-2.jpg");
            case 'images.chicago_hot_dog': return require("../assets/images/chicago-hot-dog.jpg");
            case 'images.crispy_chicken_burger': return require("../assets/images/crispy-chicken-burger.jpg");
            case 'images.fries_restaurant': return require("../assets/images/fries-restaurant.jpg");
            case 'images.hawaiian_pizza': return require("../assets/images/hawaiian-pizza.jpg");
            case 'images.honey_mustard_chicken_burger': return require("../assets/images/honey-mustard-chicken-burger.jpg");
            case 'images.hot_dog_restaurant': return require("../assets/images/hot-dog-restaurant.jpg");
            case 'images.ice_kacang': return require("../assets/images/ice-kacang.jpg");
            case 'images.japanese_restaurant': return require("../assets/images/japanese-restaurant.jpg");
            case 'images.kek_lapis_shop': return require("../assets/images/kek-lapis-shop.jpg");
            case 'images.kek_lapis': return require("../assets/images/kek-lapis.jpg");
            case 'images.kolo_mee': return require("../assets/images/kolo-mee.jpg");
            case 'images.nasi_briyani_mutton': return require("../assets/images/nasi-briyani-mutton.jpg");
            case 'images.nasi_lemak': return require("../assets/images/nasi-lemak.jpg");
            case 'images.noodle_shop': return require("../assets/images/noodle-shop.jpg");
            case 'images.pizza_restaurant': return require("../assets/images/pizza-restaurant.jpg");
            case 'images.pizza': return require("../assets/images/pizza.jpg");
            case 'images.salad': return require("../assets/images/salad.jpg");
            case 'images.sarawak_laksa': return require("../assets/images/sarawak-laksa.jpg");
            case 'images.sushi': return require("../assets/images/sushi.jpg");
            case 'images.teh_c_peng': return require("../assets/images/teh-c-peng.jpg");
            case 'images.tomato_pasta': return require("../assets/images/tomato-pasta.jpg");
        }
    }
    
    const renderItem= ({item}) =>{
            return(
            <TouchableOpacity style={{...styles.categories, ...styles.shadow, backgroundColor: selectedCategory ==item.id ? COLORS.primary: COLORS.white }} onPress={() => onSelectCategory(item)}>
                <View style={{width: 50, height: 50,borderRadius: 50/2, alignItems: "center", justifyContent: "center",
                            backgroundColor: (selectedCategory == item.id) ? COLORS.white : COLORS.lightGray}}
                >
                    <Image source={item.icon} resizeMode="contain"
                        style={{width: 30,height: 30 }}
                    />
                </View>
                <Text style={{marginTop:SIZES.padding, color: (selectedCategory == item.id) ? COLORS.white : COLORS.black, ...FONTS.body5}}>
                    {item.name}
                </Text>
            </TouchableOpacity>
            )
        }
    function renderMainCategories(){
        
        return(
        <View style={{ padding: SIZES.padding * 2 }}>
            <Text style={{ ...FONTS.h1 }}>Main</Text>
            <Text style={{ ...FONTS.h1 }}>Categories</Text>

            <FlatList data={CATEGORIES} horizontal keyExtractor={item => item.id} renderItem={renderItem} />
        </View>
        )
    }

    function renderRestaurants(){
        //console.log("######Render restaurants", restaurants)
        const renderRestaurantItem =({item}) =>{            
            const image = getImage(item.photo)
            return(
            <TouchableOpacity style={{ marginBottom: SIZES.padding * 2 }} >
                {/* Image */}
                <View>
                    
                    <Image source={image} resizeMode="cover" style={{width:'100%', height:200, borderRadius: SIZES.radius}} />
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.white,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
                    </View>
                </View>

            </TouchableOpacity>
            )
        }
        return(
            <FlatList data = {restaurants} keyExtractor={item=>item.id} renderItem={renderRestaurantItem}
                      contentContainerStyle ={{
                          paddingHorizontal: SIZES.padding*2,
                          paddingBottom: 30
                      }} />
        )
    }
    return(
        <SafeAreaView>
            {renderMainCategories()}
            {renderRestaurants()}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create(
    {
        categories:{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
        },
        shadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 1,
        }
    }
)

export default Home;