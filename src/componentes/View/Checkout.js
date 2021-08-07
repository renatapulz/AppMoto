import React from 'react';
import { Text, View } from 'react-native';
import {styles} from '../../css/style';

export default function Checkout(props) {

    return (
        <View style={styles.container2}>
            <Text>O valor da corrida é {props.route.params.price}</Text>
        </View>
    );
}