import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid, FlatList, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { useCart } from '../provider/CartContext';
import { createTable, insertItem } from '../database/cartdb'; // Import the database helper functions


const ProductDetail = ({ route }) => {

    const { addToCart } = useCart();

    useEffect(() => {
        createTable(); // Ensure the table is created when the application starts
      }, []);

    const { item } = route.params;
    const [paused, setPaused] = useState(true);

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const handleItemPress = (item) => {
        insertItem(item);
        addToCart(item);
        showToast(` ${item?.title} - Added to Cart`)
    }


    return (
        <ScrollView style={styles.headcontainer}>

            <View style={{margin:8}}>

                <Image source={{ uri: item.thumbnail }} style={styles.image} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{item.title}  </Text>
                    <Text style={styles.stock}>{item.availabilityStatus}:{item.stock} </Text>
                </View>

                <Text style={styles.item}>Description: {item.description}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.category}>Price: {item.price} /- </Text>
                    <Text style={styles.category}>Quantity: {item.minimumOrderQuantity}  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.discount}>Discount: {item.discountPercentage} % </Text>
                    <Text numberOfLines={1} style={styles.category}>{`Category: ${capitalizeFirstLetter(item.category)}`}</Text>
                </View>

                <TouchableOpacity onPress={() => handleItemPress(item)}>
                    <Text style={styles.cart}>Add to Cart</Text>
                </TouchableOpacity>

                <Text style={styles.warray}>Shipping: {item.shippingInformation}  </Text>
                <Text style={styles.warray}>Warranty Information: {item.warrantyInformation}  </Text>

                <View style={styles.containerVideo}>
                    <Video
                        source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                        style={styles.video}
                        controls={true}
                        resizeMode="contain"
                        paused={paused}
                        onBuffer={() => console.log('Buffering...')}
                        onError={(error) => console.log('Error:', error)}
                        bufferConfig={{
                            minBufferMs: 15000,
                            maxBufferMs: 50000,
                            bufferForPlaybackMs: 2500,
                            bufferForPlaybackAfterRebufferMs: 5000
                        }}
                    />
                    <Button title={paused ? 'Play' : 'Pause'} onPress={() => setPaused(!paused)} />
                </View>

                <View style={styles.container}>

                    <View style={styles.leftColumn}>
                        <Text style={styles.text}>Dimensions</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <View style={styles.row}>
                            <Text style={styles.text}>Depth: {item?.dimensions?.depth}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Height: {item?.dimensions?.height}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>Width: {item?.dimensions?.width}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tagsContainer}>
                    <Text style={styles.tagText}>Tags: </Text>

                    {item.tags.map((tag, index) => (
                        <Text key={index} style={styles.tagText}>
                            {`${capitalizeFirstLetter(tag)}`} </Text>
                    ))}
                </View>

                <Text style={styles.productName}>Reviews: {item.title}</Text>

                <FlatList
                    data={item.reviews}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ReviewItem review={item} />}
                    nestedScrollEnabled
                />

            </View>

        </ScrollView>

    );
};


const ReviewItem = ({ review }) => (

    <View style={styles.reviewContainer}>
        <Text style={styles.reviewerName}>{review.reviewerName}</Text>
        <Text style={styles.comment}>{review.comment}</Text>
        <Text style={styles.rating}>Rating: {review.rating}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.rating}>Rating Stars: </Text>
            {[...Array(5)].map((_, index) => (
                <FontAwesome
                    key={index}
                    name={index < review.rating ? "star" : "star-o"} // Renders filled or outline star based on index and rating
                    color='orange'
                    size={20}
                />
            ))}
        </View>

        <Text style={styles.date}>{new Date(review.date).toLocaleDateString()}</Text>

    </View>
);


const capitalizeFirstLetter = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
};


const styles = StyleSheet.create({
    tagsContainer: {
        flexDirection: 'row', // Align tags horizontally
        flexWrap: 'wrap', // Allow tags to wrap to the next line if needed
        marginTop: 10, // Add margin from the top
    },
    headcontainer: {
        flex: 1,
        backgroundColor: 'pink',
    },
    item: {
        margin: 8, fontSize: 16, color: 'black'

    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        padding: 10
    },
    image: {
        width: "100%",
        height: 250,
        alignSelf: 'center',
        backgroundColor: 'cyan'
    },
    title: {
        margin: 8, fontWeight: 'bold', fontSize: 20, color: 'black', width: '75%'
    },
    discount: {
        marginLeft: 5, marginRight: 10, marginTop: 5, fontWeight: '600', fontSize: 16,
        color: 'black',
        // backgroundColor: 'red',
        padding: 5, borderRadius: 5
    },
    warray: {
        marginLeft: 10, marginRight: 10, marginTop: 5, fontWeight: '400', fontSize: 16,
        color: 'black', backgroundColor: '#f9c2ff', padding: 15
    },
    stock: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        color: 'black',
        //backgroundColor: 'grey', 
        borderRadius: 5, width: '20%'
    },
    category: {
        marginLeft: 10, marginRight: 10, marginTop: 5,
        fontWeight: '400',
        fontSize: 16, color: 'black',
    },
    cart: {
        backgroundColor: 'yellow',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        textAlignVertical: 'center',
        borderRadius: 5
    },
    buy: {
        backgroundColor: 'orange',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        textAlignVertical: 'center',
        borderRadius: 5
    },
    container: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'violet',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    leftColumn: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightColumn: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
    },
    row: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    text: {
        fontSize: 14,
        color: 'black',
    },
    reviewContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 15,
        margin: 5,
        backgroundColor: 'white',
    },
    reviewerName: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black'
    },
    comment: {
        fontSize: 13,
        marginBottom: 5,
        color: 'black'
    },
    rating: {
        fontSize: 13,
        fontStyle: 'italic',
        marginBottom: 5,
        color: 'black'
    },
    date: {
        fontSize: 12,
        color: 'grey',
        color: 'black'
    },
    tagText: {
        backgroundColor: 'lightgrey', // Background color for each tag
        paddingVertical: 5, // Vertical padding inside each tag
        paddingHorizontal: 10, // Horizontal padding inside each tag
        borderRadius: 10, // Border radius for each tag
        marginRight: 5, // Margin between tags
        color: 'black', fontSize: 13,
        fontWeight: '600',
    },
    containerVideo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: 300,
    },
});

export default ProductDetail;


