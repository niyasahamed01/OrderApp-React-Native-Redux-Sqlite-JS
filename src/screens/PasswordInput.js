import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PasswordInput = ({ value, onChangeText }) => {

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="blue"
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.icon}>
        <Icon name={secureTextEntry ? 'visibility' : 'visibility-off'} size={24} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    color: 'black',
    borderRadius: 10
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color:'black'
  },
  icon: {
    padding: 5,
  },
});

export default PasswordInput;