import React, {useState,useEffect,useRef} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {styles} from '../../css';

export default function Checkout(props) {

    return (
        <View style={styles.container2}>
            <Text>O valor da corrida é {props.route.params.price}</Text>
        </View>
    );
}