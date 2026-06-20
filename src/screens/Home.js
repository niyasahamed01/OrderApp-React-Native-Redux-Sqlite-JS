import React, { useEffect, useCallback } from 'react';
import { FlatList, Text, StyleSheet, StatusBar, View, ToastAndroid, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextPage } from '../redux/homeSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const PureItem = React.memo(({ item, navigation }) => (
    <TouchableOpacity onPress={() => handleDownload(item, navigation)}>
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.price}>{`Price : Rs.${item.price} /-`}</Text>
                    <Text style={styles.stock}>{`Stock:${item.stock}`}</Text>

                </View>
            </View>
        </View>
    </TouchableOpacity>

));

const handleDownload = (item, navigation) => {
    navigation.navigate('ProductDetail', { item });
};

export const HomeList = ({ navigation }) => {

    const dispatch = useDispatch();
    const { products, loading, error, page, } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchNextPage());
    }, [dispatch]);

    const handleLoadMore = useCallback(() => {
        if (!loading) {
            dispatch(fetchNextPage());
        }
    }, [dispatch, loading]);

    const renderFooter = () => {
        if (loading) {
            return (
                <ActivityIndicator size="large" color="#0000ff" />
            );
        }
        else {
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


    const handleFabPress = () => {
        navigation.navigate('Chat');
    };

    return (
        <>
            <FlatList
                data={products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <PureItem item={item} navigation={navigation} />}
                ListFooterComponent={renderFooter}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
            />
            <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
                <MaterialCommunityIcons name="chat-plus" size={30} color="black" />
            </TouchableOpacity>

        </>

    );
}


const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    imageContainer: {
        marginRight: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    description: {
        fontSize: 13,
        color: 'black',
        marginTop: 5
    },
    stock: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        marginTop: 5
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
        marginTop: 5
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
    footerText: {
        alignSelf: 'center',
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        paddingVertical: 20, // Adjust the padding as needed
        borderTopWidth: 1, // Add a border to separate footer from content
        borderTopColor: '#ccc', // Color of the border
        alignItems: 'center', // Align items to the center horizontally
    },
    container: {
        flex: 1,
      },
      fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6200EE',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '10%',
        right: '5%',
        elevation: 5,
      },
});
