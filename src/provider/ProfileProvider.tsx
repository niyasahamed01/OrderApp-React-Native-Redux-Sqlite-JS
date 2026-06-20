// AppContext.js


import React, { createContext, useState, ReactNode,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileContextProps {
  children: ReactNode;
}

// Define the profile context
const ProfileContext = createContext<any>(null);

// Define the ProfileProvider component
export const ProfileProvider: React.FC<ProfileContextProps> = ({ children }) => {
  const [profileData, setProfileData] = useState<{ name: string; image: string }>({ name: '', image: '' });


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('contextName');
        const storedImage = await AsyncStorage.getItem('contextImage');
        
        if (storedName && storedImage) {
          setProfileData({ name: storedName, image: storedImage });
        }
      } catch (error) {
        console.error('Error fetching profile data from AsyncStorage:', error);
      }
    };

    fetchProfileData();
  }, []);


  const updateProfileData = async (name: string, image: string) => {
    try {
      await AsyncStorage.setItem('contextName', name);
      await AsyncStorage.setItem('contextImage', image);
      setProfileData({ name, image });
    } catch (error) {
      console.error('Error updating profile data in AsyncStorage:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Export both the context and the provider
export { ProfileContext };