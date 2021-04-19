import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS, SIZES, FONTS, images } from '../constants';

export default function Test(){
    return(
        <View>
            <Image source={images.noodle_shop} resizeMode="cover" style={{width:'100%', height:200, borderRadius: SIZES.radius}} />
        </View>
    )
}