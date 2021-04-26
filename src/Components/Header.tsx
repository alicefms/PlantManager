import React from 'react';
import {
    StyleSheet,
    Text, View, Image
} from 'react-native';
import colors from '../styles/colors';
import UserImg from '../../assets/foto.png';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import fonts from '../styles/fonts';


export function Header() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Alice</Text>
            </View>

            <Image source={UserImg} style={styles.image} />

        </View>



    )
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        width: '100%',
        flexDirection: 'row',
        marginTop: getStatusBarHeight(),
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text

    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40

    }
})