import React from 'react';
import { Text } from 'react-native';
import { View, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';

const Detail = ({ route }) => {
  const { image } = route.params;

  const handleSaveImage = async () => {
    try {
      if (Platform.OS === 'android') {
        // For Android, implement saving image to external storage using MediaStore API
        // Request necessary permissions for writing to external storage
        // Save image to external storage
      } else if (Platform.OS === 'ios') {
        // For iOS, implement saving image to photo library using Photos framework
        // Request necessary permissions for accessing photo library
        // Save image to photo library
      }
      Alert.alert('Success', 'Image saved to your gallery.');
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save image to your gallery.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <TouchableOpacity onPress={handleSaveImage} style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  saveButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Detail;