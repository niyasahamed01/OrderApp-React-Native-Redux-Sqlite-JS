// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import PasswordInput from './PasswordInput';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (name && email && password) {
            try {
                // Save the credentials to AsyncStorage
                await AsyncStorage.setItem('userName', name);
                await AsyncStorage.setItem('userEmail', email);
                await AsyncStorage.setItem('userPassword', password);
                Alert.alert('Registration Successful', 'You can now log in with your credentials.', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') },
                ]);
            } catch (error) {
                Alert.alert('Registration Failed', 'Something went wrong. Please try again.');
            }
        } else {
            Alert.alert('Validation Error', 'All fields are required.');
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.image}>
                <Entypo name="yelp" color={'blue'} size={150} />
            </View>

            <Text style={styles.title}>Register</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="blue"

            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="blue"
            />

            <PasswordInput value={password} onChangeText={setPassword} />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'cyan'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: 'black'
    },
    input: {
        alignItems: 'center',
        borderColor: '#ccc',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
        color: 'black',
        borderRadius: 10
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 30, // This makes the button curved
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        alignContent: 'center',
        alignSelf: 'center'
    }
});

export default RegisterScreen;