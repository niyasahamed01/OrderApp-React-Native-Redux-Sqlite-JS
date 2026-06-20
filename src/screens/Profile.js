import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, TextInput, Button, Image, PermissionsAndroid, Platform, Alert, Linking, ToastAndroid, StyleSheet, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileContext } from '../provider/ProfileProvider';
import ActionSheet from 'react-native-actionsheet';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

export const ProfileComponent = ({ navigation }) => {
    
    const [profileImageUri, setProfileImage] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');

    const { updateProfileData } = useContext(ProfileContext);
    const actionSheetRef = useRef();

    useEffect(() => {
        getStoredProfileImage();
    }, []);

    const getStoredProfileImage = async () => {
        try {
            const profileImageUri = await AsyncStorage.getItem('profileImage');
            const storedName = await AsyncStorage.getItem('name');
            const storedPhone = await AsyncStorage.getItem('phone');
            const storedEmail = await AsyncStorage.getItem('email');
            const storedAddress = await AsyncStorage.getItem('address');
            const storedCity = await AsyncStorage.getItem('city');
            const storedState = await AsyncStorage.getItem('state');
            const storedPin = await AsyncStorage.getItem('pin');

            if (profileImageUri !== null) {
                setProfileImage(profileImageUri);
            }
            if (storedName !== null) {
                setName(storedName);
            }
            if (storedPhone !== null) {
                setPhone(storedPhone);
            }
            if (storedEmail !== null) {
                setEmail(storedEmail);
            }
            if (storedAddress !== null) {
                setAddress(storedAddress);
            }
            if (storedCity !== null) {
                setCity(storedCity);
            }
            if (storedState !== null) {
                setState(storedState);
            }
            if (storedPin !== null) {
                setPin(storedPin);
            }
        } catch (error) {
            console.error('Error getting profile image:', error);
        }
    };

    const requestCameraPermission = async () => {
        try {
            const permission = Platform.select({
                android: PERMISSIONS.ANDROID.CAMERA,
                ios: PERMISSIONS.IOS.CAMERA,
            });

            const result = await request(permission);
            if (result === RESULTS.GRANTED) {
                handleCameraPick();
            } else {
                Alert.alert(
                    'Camera Permission Denied',
                    'Please grant camera permission in Settings to use this feature.',
                    [{ text: 'OK', onPress: () => openSettings() }]
                );
            }
        } catch (err) {
            console.warn('Error requesting camera permission:', err);
        }
    };

    const requestGalleryPermission = async () => {
        try {
            const permission = Platform.select({
                android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
            });
    
            const result = await request(permission);
            console.log('Gallery permission result:', result);
    
            if (result === RESULTS.GRANTED) {
                handleImagePick();
            } else if (result === RESULTS.DENIED) {
                Alert.alert(
                    'Gallery Permission Denied',
                    'Gallery permission is required to select photos. Please grant it in Settings.',
                    [{ text: 'OK', onPress: () => openSettings() }]
                );
            } else if (result === RESULTS.BLOCKED) {
                Alert.alert(
                    'Gallery Permission Denied Permanently',
                    'Gallery permission is denied permanently. Please grant it in Settings.',
                    [{ text: 'OK', onPress: () => openSettings() }]
                );
            }
        } catch (err) {
            console.warn('Error requesting gallery permission:', err);
        }
    };

    const handleImagePick = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 200,
            maxHeight: 200,
        };

        launchImageLibrary(options,async response => {
            if (!response.didCancel && response.assets && response.assets.length > 0) {
                await AsyncStorage.setItem('profileImage', response.assets[0].uri);
                setProfileImage(response.assets[0].uri);
            }
        });
    };

    const handleCameraPick = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 200,
            maxHeight: 200,
        };

        launchCamera(options, async (response) => {
            if (!response.didCancel && response.assets && response.assets.length > 0) {
                try {
                    await AsyncStorage.setItem('profileImage', response.assets[0].uri);
                    setProfileImage(response.assets[0].uri);
                } catch (error) {
                    console.error('Error saving profile image:', error);
                }
            }
        });
    };

    const handleSaveProfile = async () => {
        try {
            if (!name) {
                showToast("Name Field is required");
            } else if (!phone) {
                showToast("Phone Field is required");
            } else if (!email) {
                showToast("Email Field is required");
            } else if (!profileImageUri) {
                showToast("Profile Field is required");
            } else if (!address) {
                showToast("Address Field is required");
            } else if (!city) {
                showToast("City Field is required");
            } else if (!state) {
                showToast("State Field is required");
            } else if (!pin) {
                showToast("Pin Field is required");
            } else {
                await AsyncStorage.setItem('name', name);
                await AsyncStorage.setItem('phone', phone);
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('address', address);
                await AsyncStorage.setItem('city', city);
                await AsyncStorage.setItem('state', state);
                await AsyncStorage.setItem('pin', pin);
                navigation.navigate('DetailScreen', { name, phone, email, address, pin, image: profileImageUri, state, city });
                updateProfileData(name, profileImageUri);
            }
        } catch (error) {
            console.error('Error navigating to next screen:', error);
        }
    };

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', alignContent: 'center' }}>
                <View style={{ margin: 15 }}>
                    {profileImageUri ?
                        (<Image source={{ uri: profileImageUri }} style={{ width: 150, height: 150, borderRadius: 100, margin: 10 }} />)
                        : (<MaterialCommunityIcons name="account-circle" color='grey' size={150} />)}

                    <Button title="Take Picture" onPress={() => actionSheetRef.current.show()} />
                </View>
                <TextInput
                    style={{ height: 40, width: "90%", borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingLeft: 5, color: 'black' }}
                    placeholder="Enter Your Name"
                    value={name}
                    inputMode='text'
                    placeholderTextColor="black"
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={{ height: 40, width: "90%", borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingLeft: 5, color: 'black' }}
                    placeholder="Enter Your Phone"
                    value={phone}
                    inputMode='numeric'
                    placeholderTextColor="black"
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    style={{ height: 40, width: "90%", borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingLeft: 5, color: 'black' }}
                    placeholder="Enter Your Email"
                    value={email}
                    inputMode='email'
                    placeholderTextColor="black"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={{ height: 40, width: "90%", borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingLeft: 5, color: 'black' }}
                    placeholder="Enter Your Address"
                    value={address}
                    inputMode='text'
                    placeholderTextColor="black"
                    onChangeText={text => setAddress(text)}
                />
                <TextInput
                    style={{ height: 40, width: "90%", borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingLeft: 5, color: 'black' }}
                    placeholder="Enter Your City"
                    value={city}
                    inputMode='text'
                    placeholderTextColor="black"
                    onChangeText={text => setCity(text)}
                />
                <TextInput
                    style={{ height: 40, width: "90%", borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingLeft: 5, color: 'black' }}
                    placeholder="Enter Your State"
                    value={state}
                    inputMode='text'
                    placeholderTextColor="black"
                    onChangeText={text => setState(text)}
                />
                <TextInput
                    style={{ height: 40, width: "90%", borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingLeft: 5, color: 'black' }}
                    placeholder="Enter Your Pin"
                    value={pin}
                    inputMode='numeric'
                    placeholderTextColor="black"
                    onChangeText={text => setPin(text)}
                />
                <Button title="Save Profile" onPress={handleSaveProfile} />
                <ActionSheet
                    ref={actionSheetRef}
                    title={'Select Action'}
                    options={['Take Photo', 'Choose from Gallery', 'Cancel']}
                    cancelButtonIndex={2}
                    onPress={(index) => {
                        if (index === 0) {
                            requestCameraPermission();
                        } else if (index === 1) {
                            requestGalleryPermission();
                        }
                    }}
                />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ff0000', // Example background color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});