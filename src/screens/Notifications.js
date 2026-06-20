import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity ,NativeModules} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from '../redux/fetchApiData';
const { ToastModule } = NativeModules;

const Notification = () => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.api);

    useEffect(() => {
        dispatch(fetchApiData());
        
    }, [dispatch]);

    const handleItemPress = (item) => {
        ToastModule.showToast(`Item Clicked: ${item.title}`,4);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{`Name: ${item.title}`}</Text>
                <Text style={styles.title}>{`Brand: ${item.brand ? item.brand : 'No Brand'}`}</Text>
                <Text style={styles.title}>{`Price: Rs.${item.price}`}</Text>
                <Text style={styles.title}>{`Discount Percentage: ${item.discountPercentage} %`}</Text>
            </View>
        </View>
        </TouchableOpacity>

    );


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    if (error) {
        return <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={styles.footerText}>Error: {error}</Text>
        </View>
    }

    return (
        <FlatList
            data={data.products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 75,
        height: 75,
        marginRight: 10,
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor:'cyan'
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black'
    },
    description: {
        fontSize: 16,

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

export default Notification;