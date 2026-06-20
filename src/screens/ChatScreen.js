import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

export const ChatScreen = () => {

    const [messages, setMessages] = useState([{ id: '1', text: 'Welcome to the Chat Page!', isAI: true }]);
    const [userInput, setUserInput] = useState('');

    const fetchAIResponse = async (message) => {
        // Simple placeholder AI response logic
        if (message.toLowerCase().includes('hi')) {
            return "Hello! How can I assist you today?";
        }
        return "I'm not sure about that, but I'm here to help!";
    };

    const fetchAIResponses = async (message) => {
        const token = '';  // Replace with your actual API token
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/completions',
                {
                    model: 'text-davinci-003',
                    prompt: message,
                    max_tokens: 100,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "Sorry, I couldn't get a response right now.";
        }
    };

    const sendMessage = async () => {

        if (!userInput.trim()) {
            Alert.alert("Validation Error", "Please enter a message before sending.");
            return;
        }

        // Add user message to the chat
        const newMessage = { id: String(messages.length + 1), text: userInput, isAI: false };
        setMessages([...messages, newMessage]);

        // Fetch AI response and add to chat
        const aiResponseText = await fetchAIResponse(userInput);
        const aiMessage = { id: String(messages.length + 2), text: aiResponseText, isAI: true };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);

        setUserInput(''); // Clear input
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <View style={item.isAI ? styles.aiMessage : styles.userMessage}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                style={styles.chatContainer}
            />

            <TextInput
                style={styles.input}
                value={userInput}
                placeholderTextColor="black" 
                onChangeText={setUserInput}
                placeholder="Type your message..."
                onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.button} onPress={sendMessage}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: 'cyan'
    },
    chatContainer: {
        flex: 1,
        marginBottom: 20,
    },
    userMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#d1f7c4',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    aiMessage: {
        alignSelf: 'center',
        backgroundColor: '#f1f1f1',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    messageText: {
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'black',
        color:'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    button: {
        marginBottom:10,
        backgroundColor: '#007bff', // Button background color
        paddingVertical: 10, // Vertical padding
        paddingHorizontal: 20, // Horizontal padding
        borderRadius: 5, // Rounded corners
        alignItems: 'center', // Center the text inside the button
      },
      buttonText: {
        color: 'white', // Text color
        fontSize: 16, // Text size
        fontWeight: 'bold', // Text weight
      },
});


