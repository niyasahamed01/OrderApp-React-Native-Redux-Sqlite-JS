import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { clearCart, getItems, removeItem } from '../database/cartdb';
import { ActivityIndicator } from 'react-native-paper';

import CartEventEmitter from './CartEventEmitter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../provider/CartContext';

export const CartListComponent = ({ route, navigation }) => {

  const { removeFromCart } = useCart();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const clearCartIfNeeded = async () => {
      // Check if clearCart parameter is true
      if (route.params && route.params.clearCart) {
        await clearCart(); // Clear the cart
      }
    };
    const cartCleared = () => fetchCartItems();

    CartEventEmitter.on('cartCleared', cartCleared);
    clearCartIfNeeded();
    return () => {
      CartEventEmitter.off('cartCleared', cartCleared);
    };
  }, [route.params]);


  useEffect(() => {
    fetchCartItems();

    const itemAddedListener = () => fetchCartItems();
    const itemRemovedListener = () => fetchCartItems();

    CartEventEmitter.on('itemAdded', itemAddedListener);
    CartEventEmitter.on('itemRemoved', itemRemovedListener);

    return () => {
      CartEventEmitter.off('itemAdded', itemAddedListener);
      CartEventEmitter.off('itemRemoved', itemRemovedListener);
    };
  }, []);


  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const items = await getItems();
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeItem(itemId);
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleBuyAllItems = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      const phone = await AsyncStorage.getItem('phone');
      const email = await AsyncStorage.getItem('email');
      const address = await AsyncStorage.getItem('address');
      const city = await AsyncStorage.getItem('city');
      const state = await AsyncStorage.getItem('state');
      const pin = await AsyncStorage.getItem('pin');
      navigation.navigate('AddressItem', { name, phone, email, address, pin, items: cartItems, state, city });
    } catch (error) {
      console.error('Error navigating to AddressItem:', error);
    }
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.buttonContainer}>

            <View style={{ flex: 1,flexDirection:'row', justifyContent: 'space-between' }}>
              <Text style={styles.countText}>Item: {item.count}</Text>
              <Text style={styles.countText}>Item Price: {item.price}</Text>
            </View>

            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.item_id)}>
              <Text style={styles.buttonText}>REMOVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, [cartItems]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.buyAllButton} onPress={handleBuyAllItems}>
          <Text style={styles.buttonText}>BUY ALL</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.item_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Cart is empty</Text>}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 10,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f9c2ff',
    padding: 10,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 12,
    color: 'black',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    alignSelf: 'center'
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    padding: 5,
  },
  buyAllButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyText: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});