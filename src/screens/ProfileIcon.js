
import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import {ProfileContext} from '../provider/ProfileProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileIcon = ({color,size}) => {
  const { profileData } = useContext(ProfileContext);

  return (
    <View>
      {profileData.image ? (
        <Image
          source={{ uri: profileData.image }}
          style={{ width: 24, height: 24, borderRadius: 12 }}
        />
      ) : (
        <MaterialCommunityIcons name="account-circle" color={color} size={size} />
      )}
      
    </View>
  );
};

export default ProfileIcon;