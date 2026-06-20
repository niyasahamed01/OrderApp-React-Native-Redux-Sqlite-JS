// import React, { useState } from 'react';
// import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet, Animated, ToastAndroid } from 'react-native';
// import { Avatar } from 'react-native-elements';

// export const SocialMediaFeed = ({ navigation, route }) => {

//     const { itemId } = route.params;

//     ToastAndroid.show(itemId, ToastAndroid.SHORT);

//     const [selectedItemId, setSelectedItemId] = useState(null);

//     const data = [
//         {
//             id: '1', image: require('../image/grass.png'), name: "Natural Grass", comment: '574k', like: '400k', post: 'Even when I am fully engaged as part of a community, I am still an individual who is freely choosing to be part of a community.'
//         },
//         {
//             id: '2', image: require('../image/grass_one.png'), name: "Nature Grass", comment: '12k', like: '12k', post: 'Even when I am fully engaged as part of a community, I am still an individual who is freely choosing to be part of a community.'
//         },
//         {
//             id: '3', image: require('../image/nature.png'), name: "Natural Image", comment: '10k', like: '4k', post: 'Even when I am fully engaged as part of a community, I am still an individual who is freely choosing to be part of a community.'
//         },
//         {
//             id: '4', image: require('../image/nature_one.png'), name: "Natural One", comment: '452k', like: '98k', post: "Even when I am fully engaged as part of a community, I am still an individual who is freely choosing to be part of a community."
//         },
//         {
//             id: '5', image: require('../image/nature_two.png'), nmae: "Natural Two", comment: '147k', like: '123k', post: 'Even when I am fully engaged as part of a community, I am still an individual who is freely choosing to be part of a community.'
//         },

//     ];

//     const [scale] = useState(new Animated.Value(1));

//     const handleImageClick = (image) => {
//         navigation.navigate('EmptyPage', { image });
//     };

//     const handleHeartClick = (itemId) => {
//         setSelectedItemId(itemId);
//         animateScale()

//     };

//     const animateScale = () => {
//         // Trigger the animation
//         Animated.sequence([
//             Animated.timing(scale, {
//                 toValue: 1.2,
//                 duration: 200,
//                 useNativeDriver: true,
//             }),
//             Animated.timing(scale, {
//                 toValue: 1,
//                 duration: 200,
//                 useNativeDriver: true,
//             }),
//         ]).start();
//     };

//     const renderFeedItem = ({ item }) => {

//         const heartScale = selectedItemId === item.id ? scale : 1;

//         return (
//             <View style={styles.feedItemContainer}>
//                 <View >

//                     <View style={styles.userInfo}>

//                         <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10 }}>
//                             <Avatar
//                                 size="medium"
//                                 title="CR"
//                                 activeOpacity={0.7}
//                             />

//                             <View style={{ flex: 1, flexDirection: "column", justifyContent: 'flex-start', marginLeft: 10 }}>

//                                 <Text style={styles.username}>{item.name}</Text>
//                                 <View style={{ flex: 1, flexDirection: "row", justifyContent: 'flex-start', marginLeft: 10 }}>
//                                     <Image source={require('../image/gallery.png')} style={styles.small} />
//                                     <Text style={styles.decription}>photo</Text>
//                                     <Image source={require('../image/eye.png')} style={styles.photos} />
//                                     <Text style={styles.decription}>1 day</Text>
//                                 </View>


//                             </View>

//                         </View>

//                         <Image source={require('../image/heart.png')} style={styles.heart} />
//                     </View>

//                     <TouchableOpacity onPress={() => handleImageClick(item.image)}>
//                         <Image source={item.image} style={styles.image} />
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.container1}>
//                     <View style={styles.row}>
//                         <View style={styles.leftContainer}>
//                             <Text style={styles.leftText}>{item.comment}</Text>
//                         </View>

//                         <TouchableOpacity >
//                             <Animated.Image
//                                 source={require('../image/comment.png')}
//                                 style={[styles.button,]}
//                             />
//                         </TouchableOpacity>

//                         <View style={styles.leftContainer}>

//                             <Text style={styles.leftText}>{item.like}</Text>

//                         </View>
//                         <TouchableOpacity onPress={() => handleHeartClick(item.id)}>

//                             <Animated.Image
//                                 source={require('../image/heart_like.png')}
//                                 style={[styles.button, { transform: [{ scale: heartScale }] }]}
//                             />
//                         </TouchableOpacity>
//                     </View>


//                     <View style={styles.row1}>
//                         <TouchableOpacity  >
//                             <Animated.Image
//                                 source={require('../image/send.png')}
//                                 style={styles.button}
//                             />
//                         </TouchableOpacity>

//                         <TouchableOpacity  >
//                             <Animated.Image
//                                 source={require('../image/save_instagram.png')}
//                                 style={styles.button}
//                             />
//                         </TouchableOpacity>

//                         <TouchableOpacity >
//                             <Animated.Image
//                                 source={require('../image/more.png')}
//                                 style={styles.button}
//                             />
//                         </TouchableOpacity>

//                     </View>
//                 </View>

//                 <View style={{ flex: 1, flexDirection: "column", justifyContent: 'flex-start' }}>

//                     <Text style={styles.post} numberOfLines={2}>{item.post}</Text>
//                     <Text style={styles.form} numberOfLines={1}>Photo:@form</Text>

//                 </View>


//             </View>
//         );
//     };



//     const renderSeparator = () => <View style={styles.separator} />;

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={data}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderFeedItem}
//                 ItemSeparatorComponent={renderSeparator}

//             />
//         </View>
//     );
// };



// const styles = StyleSheet.create({
//     container1: {
//         flex: 1,
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         flexDirection: "row",
//         marginTop: 10
//     },
//     row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     row1: {
//         flexDirection: 'row',
//         justifyContent: "flex-end",
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     leftContainer: {
//         marginRight: 10,
//     },
//     leftText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginLeft: 5,
//         color: 'black',

//     },
//     rightContainer: {
//         marginLeft: 10,
//     },
//     rightText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: 'black',
//     },
//     imageButton: {
//         marginRight: 20,
//     },
//     image1: {
//         width: 30,
//         height: 30,
//         resizeMode: 'contain',
//     },
//     container: {
//         flex: 1,
//         backgroundColor: 'pink'
//     },
//     feedItemContainer: {
//         marginBottom: 10,
//     },
//     username: {
//         fontWeight: 'bold',
//         color: 'black',
//         fontSize: 15,
//         marginLeft: 10,
//         justifyContent: 'flex-start'
//     },
//     image: {
//         width: '100%',
//         height: 200,
//         resizeMode: 'cover',
//     },
//     heart: {
//         width: 20,
//         height: 20,
//         marginRight: 20,
//         marginEnd: 20,
//         alignContent: 'center',
//         alignSelf: 'center',
//         resizeMode: 'cover',
//     },
//     buttonsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//         paddingHorizontal: 10,
//         marginTop: 15,
//     },
//     button: {
//         width: 20,
//         height: 20,
//         marginEnd: 5,
//         resizeMode: 'contain',
//         alignSelf: "center"
//     },
//     iconContainer: {
//         position: 'absolute',
//         bottom: 20,
//         right: 20,
//         // Add styles for icon container
//     },
//     userInfo: {
//         flex: 1, flexDirection: "row", justifyContent: "flex-start"
//     },
//     buttonInfo: {
//         flex: 1, flexDirection: "row", justifyContent: "flex-start"
//     },
//     shareInfo: {
//         flex: 1, flexDirection: "row", justifyContent: "flex-end", alignSelf: "center", alignContent: 'space-between'
//     },
//     profileimage: {
//         width: 20,
//         height: 20,
//         marginLeft: 10
//     },

//     small: {
//         width: 20,
//         height: 20,
//         alignSelf: 'center',
//         color: 'black'
//     },
//     decription: {
//         color: 'black',
//         fontSize: 13,
//         marginLeft: 5,
//         alignSelf: 'center'
//     },
//     photos: {
//         marginLeft: 10,
//         width: 20,
//         height: 20,
//         alignSelf: 'center'
//     },
//     post: {
//         color: 'black',
//         fontSize: 15,
//         marginLeft: 5,
//         alignSelf: 'center',
//         alignItems: 'center',
//     },
//     form: {
//         color: 'black',
//         fontSize: 15,
//         marginLeft: 15,
//         marginTop: 5,
//         justifyContent: 'flex-start',
//     },
//     separator: {
//         height: 1,
//         backgroundColor: 'gray',
//         marginVertical: 5,
//     },

// });