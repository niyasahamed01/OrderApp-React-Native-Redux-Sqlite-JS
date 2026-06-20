import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet, TextInput, Image, Button } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { createTable, getItems, insertItem, updateItem, deleteItem } from '../database/database';

export const ListScreen = ({ navigation }) => {

    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [checkboxVisible, setCheckboxVisible] = useState(false);
    const [newItemSkills, setNewItemSkills] = useState('');

    useEffect(() => {
        const initializeDatabase = async () => {
            await createTable();
            fetchItems();
        };

        initializeDatabase();
    }, []);

    const fetchItems = async () => {
        try {
            const items = await getItems();
            if (items) {
                setItems(items);
            } else {
                console.error('No items found');
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const deleteItemHandler = async (id) => {
        try {
            await deleteItem(id);
            await fetchItems(); // Refresh the list after deletion
            ToastAndroid.show('Delete successful', ToastAndroid.SHORT); // Show toast message
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const addItem = async () => {
        if (newItemName.trim() && newItemSkills.trim()) {
            try {
                await insertItem(newItemName, newItemSkills, checkboxVisible ? 1 : 0);
                setCheckboxVisible(false); // Reset checkbox visibility after adding item
                setNewItemName();
                setNewItemSkills();
                fetchItems();
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    };

    const toggleCheckbox = async (id, checked) => {
        try {
            const newCheckedValue = checked ? 0 : 1;
            await updateItem(id, newCheckedValue);
            fetchItems();
        } catch (error) {
            console.error('Error toggling checkbox:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemDescription} numberOfLines={1}>{item.id}</Text>
            <Text style={styles.itemTitle} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.itemTitle} numberOfLines={1}>{item.skills}</Text>

            <TouchableOpacity>
                <MaterialIcons
                    name={item.checked === 1 ? "check-box" : "check-box-outline-blank"}
                    size={20} // Adjust the size here
                    color={item.checked === 1 ? "blue" : "pink"}
                />
            </TouchableOpacity>

            <AntDesign
                name="delete"
                color={"red"}
                size={20}
                onPress={() => deleteItemHandler(item.id)}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={newItemName}
                    onChangeText={setNewItemName}
                    style={[styles.input, { borderColor: '#000', color: 'black' }]}
                    placeholder="Enter item name"
                    placeholderTextColor="blue"
                />
                <TextInput
                    value={newItemSkills}
                    onChangeText={setNewItemSkills}
                    style={[styles.input, { borderColor: '#000', color: 'black' }]}
                    placeholder="Enter sku"
                    placeholderTextColor="blue"
                />
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={() => setCheckboxVisible(!checkboxVisible)}>
                        <MaterialIcons
                            name={checkboxVisible ? "check-box" : "check-box-outline-blank"}
                            size={20} // Adjust the size here
                            color={checkboxVisible ? "blue" : "grey"}
                        />
                    </TouchableOpacity>
                    <Text style={styles.checkboxTitle}>isActiveAuthor</Text>
                </View>
                <Button onPress={addItem} title="Add Item" />
            </View>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        marginRight: 10,
        width: '90%',
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemTitle: {
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        width: '22%',
        color: 'black'

    },
    itemDescription: {
        fontSize: 12,
        marginRight: 10,
        fontStyle: 'normal',
        fontWeight: 'bold',
        width: '10%',
        color: 'black'

    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxTitle: {
        marginLeft: 8,
        fontWeight: 'bold',
        fontSize: 13,
        padding: 5,
        color: 'black'
    },
});