import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const OrderListScreen = () => {

  const [orderData, setOrderData] = useState(null); // Use an object to store order data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const storedOrderData = await AsyncStorage.getItem('orderData');

        if (storedOrderData !== null) {
          setOrderData(JSON.parse(storedOrderData)); // Set orderData state with stored data
        }
      } catch (error) {
        console.error('Error loading order data: ', error);
      } finally {
        setLoading(false); // Set loading to false when fetching completes
      }
    };

    loadOrderData();
  }, []);

  console.log(orderData, "orderData");

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Display ActivityIndicator while loading
      ) : orderData ? (
        <FlatList
          data={orderData.items}
          renderItem={({ item }) => <OrderItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => (
            <Text style={styles.totalPriceText}>Total Price: ${orderData.totalPrice}</Text>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.noOrderText}>No Order Found</Text>
          )}
        />
      ) : (
        <Text style={styles.noOrderText}>No Order Found</Text>
      )}
    </View>
  );
};

const OrderItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.orderDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>Quantity: {item.count}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    borderColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "90%",
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 2
  },
  itemPrice: {
    fontSize: 16,
    color: 'black',
  },
  noOrderText: {
    fontSize: 18,
    alignSelf: 'center',
    alignItems: 'center',
    color: 'red', // Custom styling for the "No Order Found" message
    marginTop: 20, // Additional margin top for better spacing
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'green',
    textAlign: 'center',
  },
});

export default OrderListScreen;