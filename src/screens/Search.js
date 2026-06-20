import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, PureComponent, useCallback, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet, Image, ScrollView, Button, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextPage } from '../redux/searchSlice';


const PureItem = React.memo(({ item, navigation }) => (
  <TouchableOpacity onPress={() => handleDownload(item, navigation)}>
    <View style={styles.itemContainer}>
      <Text numberOfLines={1} style={styles.category}>{`Category: ${capitalizeFirstLetter(item.category)}`}</Text>

      <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {item.images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text numberOfLines={1} style={styles.title}>{capitalizeFirstLetter(item.title)}</Text>
            {/* <TouchableOpacity onPress={() => handleDownload(image, navigation)} style={styles.downloadButton}>
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity> */}
          </View>
        ))}
      </ScrollView>
    </View>
  </TouchableOpacity>

));

const capitalizeFirstLetter = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const handleDownload = (item, navigation) => {
  navigation.navigate('ProductDetail', { item });
};

export const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, loading, error, page, } = useSelector((state) => state.search);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    dispatch(fetchNextPage());
  }, [dispatch]);

  useEffect(() => {
    const filtered = products.filter((item) =>
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      dispatch(fetchNextPage());
    }
  });

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return (
        <TouchableOpacity style={styles.button} onPress={handleLoadMore}>
          <Text style={styles.buttonText}> Load More</Text>
        </TouchableOpacity>
      )
    }
  };

  if (error) {
    return <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
      <Text style={styles.footerText}>Error: {error}</Text>
    </View>
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'cyan'
    }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by category..."
        onChangeText={(text) => setSearchQuery(text)}
        placeholderTextColor="blue"
        value={searchQuery}
      />
      {filteredProducts.length === 0 ? (
        <Text style={styles.footerText}>No data found</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <PureItem item={item} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>

  );
};


const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'cyan'
  },
  imageContainer: {
    marginRight: 10,
    padding: 5
  },
  downloadButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    width: 100
  },
  description: {
    fontSize: 16,
  },
  footerText: {
    alignSelf: 'center',
    fontSize: 15,
    padding: 15,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  button: {
    backgroundColor: '#007bff', // Blue color, you can change it to your preferred color
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff', // White color for text
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  category: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 10,
    fontSize: 18,
    color: 'black'

  },
  footerText: {
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'center'
  },
});
