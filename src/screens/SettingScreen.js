import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet, Image, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const SettingScreen = ({ handleLogout, navigation }) => {

    const settingsData = [
        { key: '1', title: 'My Profile', icon: 'account-circle', screen: 'Profile' },
        { key: '2', title: 'Notification', icon: 'bell', screen: 'Notification' },
        { key: '3', title: 'Add Details', icon: 'account-multiple-plus', screen: 'AddDetails' },
        { key: '3', title: 'Your Orders', icon: 'shopping-bag', screen: 'ConfirmOrderList' },
        { key: '3', title: 'Logout', icon: 'logout', screen: '' },
    ];


    const onLogout = () => {
        handleLogout(navigation);
    };


    const handlePress = (screen) => {
        if (screen) {
            navigation.navigate(screen);
        } else {
            onLogout();
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}
            onPress={() => handlePress(item.screen)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    {item.icon === 'shopping-bag' && (
                        <MaterialIcons name={item.icon} color='black' size={22} />
                    )}
                    {item.icon === 'logout' && (
                        <SimpleLineIcons name={item.icon} color='black' size={22} />
                    )}
                    {item.icon !== 'shopping-bag' && item.icon !== 'logout' && (
                        <MaterialCommunityIcons name={item.icon} color='black' size={22} />
                    )}
                    <Text numberOfLines={1} style={styles.text}>{item.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <AntDesign name="right" color='black' size={22} />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={settingsData}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        color: 'white'
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: "95%",
        elevation: 3,
    },
    text: {
        color: 'black',
        fontSize: 16,
        marginVertical: 2,
        marginLeft: 10
    },
});


