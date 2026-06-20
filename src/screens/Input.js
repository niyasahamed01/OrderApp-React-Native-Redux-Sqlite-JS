import { useState, useEffect, useRef } from 'react'; 
import { Text, View, StyleSheet, TextInput }  from 'react-native'; 
  
export const Input = ({ navigation }) => {

    const [name, setName] = useState('') 
    const renderCount = useRef(0) 
  
    useEffect(() => { 
        // Updating the counter value on each re-render 
        renderCount.current = renderCount.current + 1 
    }) 
  
    return ( 
        <View style={styles.container}> 
            <TextInput 
                onChangeText={text => setName(text)} 
                style={styles.input} 
            /> 
            <Text style={styles.text}>My Name is {name}</Text> 
            <Text style={styles.text}> 
                I rendered {renderCount.current} times 
            </Text> 
        </View> 
    ); 
} 
  
// Styles for Text and View components 
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#72e6e8', 
        padding: 8, 
        color: 'white' 
    }, 
    input: { 
        height: 40, 
        width: 300, 
        margin: 12, 
        borderWidth: 3, 
        color: '#000000', 
        padding: 10, 
    }, 
    text: { 
        margin: 14, 
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: 'black', 
    }, 
}); 