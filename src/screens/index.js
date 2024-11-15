import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native';


export const Updates = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <Icon.Button
                name="facebook"
                backgroundColor="#3b5998"
                onPress={this.loginWithFacebook}
            >
                Login with Facebook
            </Icon.Button>

            {/* <View style={{ marginStart: 10, marginTop: 15 }}>
            <Ionicons name="funnel" size={30} color="#4F8EF7" />
        </View> */}
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#72e6e8',
        padding: 8,
        color: 'white'
    },
    input: {
        color: '#000000',
        padding: 10,
        alignSelf: 'center',
        alignContent: 'center'
    },
    text: {
        margin: 14,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
}); 