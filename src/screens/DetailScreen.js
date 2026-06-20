import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet, Image, Button } from 'react-native';


export const DetailScreen = ({ route, navigation }) => {

    const { name, phone, email, address, pin, state, city, image } = route.params;

    const handlePress = () => {
        navigation.goBack(); 
    };


    return (

        <View style={styles.container}>

            <Image
                source={{ uri: image }}
                style={styles.image}
            />
            <TouchableOpacity style={styles.card} onPress={handlePress}>

                <View style={{ position: 'absolute', right: 0, margin: 5, padding: 5 }}>
                    <Feather
                        name={"edit"}
                        color='black'
                        size={22}
                    />
                </View>

                <Text numberOfLines={2} style={styles.text}>{name}</Text>
                <Text numberOfLines={2} style={styles.text}>{phone}</Text>
                <Text numberOfLines={2} style={styles.text}>{email}</Text>
                <Text numberOfLines={2} style={styles.text}>{address}</Text>
                <Text numberOfLines={2} style={styles.text}>{city}</Text>
                <Text numberOfLines={2} style={styles.text}>{state}</Text>
                <Text numberOfLines={2} style={styles.text}>{pin}</Text>
            </TouchableOpacity>

        </View >

    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'pink',
        color: 'white'
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    image: {
        marginTop: 10,
        width: 300,
        height: 300,
    },
    detail: {
        fontSize: 15,
        marginBottom: 10,
        color: 'black'
    },
    button: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: "80%",
        elevation: 3,
    },
    text: {
        color: 'black',
        fontSize: 18,
        marginVertical: 2,
    },

});


