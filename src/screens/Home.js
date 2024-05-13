import React, { useEffect, useCallback } from 'react';
import { FlatList, Text, StyleSheet, StatusBar, View, ToastAndroid, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextPage } from '../redux/homeSlice';


const PureItem = React.memo(({ item, navigation }) => (
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
));

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
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
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
        return <View style={{ flex: 1,flexDirection:'column' ,justifyContent:'center'}}>
            <Text style={styles.footerText}>Error: {error}</Text>
        </View>
    }
    
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <PureItem item={item} navigation={navigation} />}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
        />
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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    description: {
        fontSize: 16,
        color: 'black',
        marginTop: 5
    },
    stock: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        marginTop: 5
    },
    price: {
        fontSize: 18,
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

});
