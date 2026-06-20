import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { Image } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';

const paymentMethods = [
  { id: '1', method: 'Cash on Delivery' },
  { id: '2', method: 'Credit/Debit Card' },
  { id: '3', method: 'UPI' },
];

const AddressItem = ({ route, navigation }) => {
  const { name, phone, email, address, pin, items, city, state } = route.params;

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      items.forEach(item => {
        total += parseFloat(item.price) * item.count;
      });
      setTotalPrice(total.toFixed(2));
    };

    calculateTotalPrice();
  }, [items]);

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const proceedToReview = () => {
    if (selectedPayment) {
      if (name) {
        navigation.navigate('Review', { payment: selectedPayment, items: items, totalPrice: totalPrice });
      } else {
        showToast("Please Add Address in Profile");
      }
    } else {
      alert('Please select a payment method');
    }
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handlePress = () => {
    navigation.navigate('Profile'); // Navigate back when the TouchableOpacity is pressed
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.addressContainer}>
        {items.map((item) => (
          <View key={item.item_id} style={styles.itemContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text numberOfLines={1} style={styles.order}>Order Id: {item.item_id}</Text>
              <Text numberOfLines={1} style={styles.order}>Order Name: {item.title}</Text>
              <Text numberOfLines={1}  style={styles.order}>Order Price: {item.price} /-</Text>
              <Text numberOfLines={1} style={styles.order}>Count: {item.count}</Text>
            </View>
          </View>
        ))}
        {name ? (
          <View>
            <Text style={styles.title}>Shipping Address</Text>
            <TouchableOpacity style={styles.card} onPress={handlePress}>
              <View style={{ position: 'absolute', right: 0, margin: 5, padding: 5 }}>
                <Feather name={"edit"} color='black' size={22} />
              </View>
              <Text numberOfLines={2} style={styles.text}>{name}</Text>
              <Text numberOfLines={2} style={styles.text}>{phone}</Text>
              <Text numberOfLines={2} style={styles.text}>{email}</Text>
              <Text numberOfLines={2} style={styles.text}>{address}</Text>
              <Text numberOfLines={2} style={styles.text}>{city}</Text>
              <Text numberOfLines={2} style={styles.text}>{state}</Text>
              <Text numberOfLines={2} style={styles.text}>{pin}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          showToast("Please Add Address in Profile")
        )}
      </View>
      <View style={styles.paymentContainer}>
        <Text style={styles.title}>Select Payment Method</Text>
        <FlatList
          data={paymentMethods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.paymentItem, item.id === selectedPayment?.id && styles.selectedItem]}
              onPress={() => handlePaymentSelect(item)}
            >
              <Text style={styles.paymentText}>{item.method}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={styles.proceedButton} onPress={proceedToReview}>
        <Text style={styles.buttonText}>Proceed to Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    color: 'black'
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginVertical: 2,
    padding: 3
  },
  paymentItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: '#fff',
  },
  paymentText: {
    fontSize: 17,
    color: 'black',
  },
  selectedItem: {
    borderColor: '#007bff',
    backgroundColor: '#e6f7ff',
  },
  proceedButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    color: 'black'
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  addressContainer: {
    marginBottom: 20,
  },
  paymentContainer: {
    marginBottom: 20,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  order: {
    color: 'black',
    fontSize: 16,
    marginTop: 5,
    marginLeft: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#f9c2ff',
    padding: 5,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
});

export default AddressItem;