import React, { useEffect, useCallback } from 'react';
import { FlatList, Text, StyleSheet, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextPage } from '../redux/homeSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ListItem = React.memo(({ item, navigation }) => {
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { item })}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>{`Price: Rs. ${item.price} /-`}</Text>
                <Text style={styles.stock}>{`Stock: ${item.stock}`}</Text>
            </TouchableOpacity>
        </View>
    );
});

export const GridComponent = ({ navigation }) => {
    const dispatch = useDispatch();
    const { products, loading, error, page } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchNextPage());
    }, [dispatch]);

    const handleLoadMore = useCallback(() => {
        if (!loading) {
            dispatch(fetchNextPage());
        }
    }, [dispatch, loading]);

    const renderItem = ({ item, index }) => {
        // Three items layout for even indices
        if (index % 2 === 0 && products[index + 1] && products[index + 2]) {
            return (
                <View style={styles.tripleItemContainer}>
                    <ListItem item={item} navigation={navigation} />
                    <ListItem item={products[index + 1]} navigation={navigation} />
                    <ListItem item={products[index + 2]} navigation={navigation} />
                </View>
            );
        }
        // Two items layout for odd indices
        else if (index % 2 !== 0 && products[index + 1]) {
            return (
                <View style={styles.doubleItemContainer}>
                    <ListItem item={item} navigation={navigation} />
                    <ListItem item={products[index + 1]} navigation={navigation} />
                </View>
            );
        }
        // Fallback to single item layout in case of missing items
        return (
            <View style={styles.singleItemContainer}>
                <ListItem item={item} navigation={navigation} />
            </View>
        );
    };


    const renderFooter = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        } else {
            return (
                <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
                    <Text style={styles.buttonText}>Load More</Text>
                </TouchableOpacity>
            );
        }
    };

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    const handleFabPress = () => {
        navigation.navigate('Chat');
    };

    return (
        <>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={renderFooter}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                contentContainerStyle={styles.listContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
                ListEmptyComponent={<Text style={styles.emptyText}>No products available</Text>} // Show empty state
                snapToAlignment="start" // Ensures snapping of items to the start of the list
                decelerationRate="fast" // Increases the scroll speed and smoothness
            />
            <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
                <MaterialCommunityIcons name="chat-plus" size={30} color="black" />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
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
    listContainer: {
        backgroundColor: 'cyan',
        flexGrow: 1,
        padding: 10,
    },
    tripleItemContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 10,
        padding: 10,
    },
    doubleItemContainer: {
        width: 150,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10,
        padding: 10
    },
    singleItemContainer: {
        padding: 10,
        width: 150,
        margin: 10,
        justifyContent: 'center'
    },
    item: {
        width: 150,
        padding: 10,
        margin: 10,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    price: {
        fontSize: 12,
        color: 'green',
    },
    stock: {
        fontSize: 12,
        color: 'red',
    },
    loadMoreButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    emptyText: {
        fontSize: 16,
        color: 'grey',
        textAlign: 'center',
        marginTop: 20,
    },
});