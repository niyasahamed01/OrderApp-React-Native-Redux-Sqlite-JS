import React, { useEffect } from 'react';
import { FlatList, Text, StyleSheet, StatusBar, View, ToastAndroid, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from '../redux/fetchApiData';


export const VectorImageFlatList = ({ navigation }) => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.api);

    useEffect(() => {
        dispatch(fetchApiData());
    }, [dispatch]);

    const handleItemPress = (item) => {
        showToast(item?.title)
        navigation.navigate('SocialMediaFeed', { itemId: item.title })
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleItemPress(item)}
            style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ margin: 15 }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};



const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },

});

