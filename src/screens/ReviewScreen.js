import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../provider/CartContext';

const ReviewScreen = ({ route, navigation }) => {

  const { payment, items, totalPrice } = route.params;
  const { cartItems, removeFromCart } = useCart();


  const handleConfirmOrder = async () => {

    // Show the alert immediately
    Alert.alert(
      'Order Confirmation', // Title
      'Order confirmed!', // Message
      [{ text: 'OK', onPress: () => navigation.navigate('Cart', { clearCart: true }) }] // Button configuration
    );

    try {
      // Handle order confirmation logic here
      const orderData = { items, totalPrice };
      // Convert items data to a JSON string
      const itemsData = JSON.stringify(orderData);
      // Store the items data in AsyncStorage
      await AsyncStorage.setItem('orderData', itemsData);

      // Remove all items from the cart
      for (const item of cartItems) {
        await removeFromCart(item.id);
      }
    } catch (error) {
      console.error('Error confirming order: ', error);
    } 
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Review Your Order</Text>
      <Text style={styles.subTitle}>Payment Method: {payment.method}</Text>
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <View key={item.item_id} style={styles.item}>
            <Text style={styles.itemText}>Order Id: {item.item_id}</Text>
            <Text style={styles.itemText}>Order Name: {item.title}</Text>
            <Text style={styles.itemText}>Order Price: {item.price} /-</Text>
            <Text style={styles.itemText}>Count: {item.count}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.totalText}>Total Price: {totalPrice} /-</Text>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  itemsContainer: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  confirmButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReviewScreen;