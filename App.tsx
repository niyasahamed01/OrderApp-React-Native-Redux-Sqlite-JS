
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeList } from './src/screens/Home';
import { EmptyPage } from './src/screens/EmptyPage';
import { Input } from './src/screens/Input';
import { StoreComponent } from './src/screens/StoreComponent';
import { Search } from './src/screens/Search';
import { ProfileComponent } from './src/screens/Profile';
import { DetailScreen } from './src/screens/DetailScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Notification from './src/screens/Notifications';
import Detail from './src/screens/DownloadScreen';
import { Text, TouchableOpacity, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/AuthScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { ProfileProvider } from './src/provider/ProfileProvider';
import { ProfileContext } from './src/provider/ProfileProvider';
import ProfileIcon from './src/screens/ProfileIcon';
import { ListScreen } from './src/screens/ListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetail from './src/screens/ProductDetail';
import { CartListComponent } from './src/screens/CartListComponent';
import AddressItem from './src/screens/AddressItem';
import ReviewScreen from './src/screens/ReviewScreen';
import ConfirmOrderList from './src/screens/ConfirmOrderList';
import { SettingScreen } from './src/screens/SettingScreen';
import { CartProvider, useCart } from './src/provider/CartContext';
import { GridComponent } from './src/screens/GridComponent';
import { ChatScreen } from './src/screens/ChatScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {

  const [isSplashComplete, setIsSplashComplete] = useState<boolean | null>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isGridView, setIsGridView] = useState(false); // State to toggle between grid and list


  const toggleView = () => {
    setIsGridView(!isGridView);
    // console.log(isGridView ? 'Switched to List View' : 'Switched to Grid View'); // Add any other action
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = await AsyncStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
    };
    if (isSplashComplete) {
      checkAuthStatus();
    }
  }, [isSplashComplete]);

  const handleLogout = async (navigation: any) => {
    try {
      await AsyncStorage.clear();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const MainNavigation = () => (
    <ProfileProvider>
      <CartProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </CartProvider>
    </ProfileProvider>
  );

  const RootNavigator = () => (
    <Stack.Navigator>
      {!isSplashComplete ? (
        <Stack.Screen
          name="Splash"
          options={{ headerShown: false }}
          component={(props: any) => <SplashScreen {...props} setIsSplashComplete={setIsSplashComplete} />}
        />
      ) : !isAuthenticated ? (
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={AuthStack}
        />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            options={{ headerShown: false }}
            component={TabNavigator}
          />
        </>
      )}
    </Stack.Navigator>
  );

  const AuthStack = () => (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={(props: any) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );

  const TabNavigator = () => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarStyle: { height: 65, paddingBottom: 5 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={isGridView ? GridStack : HomeStack}
        options={{
          tabBarLabel: 'Home',
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerStyle: {
            height: 80, // Set fixed height for the header
            backgroundColor: 'white', // Optional, set your header background color
            shadowOpacity: 0,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={toggleView}
              style={{
                paddingRight: 20,  // Padding for alignment
                position: 'absolute',  // Absolute positioning to avoid shifting layout
                right: 0,  // Align the icon to the right side
                top: 20,  // Adjust the vertical positioning of the icon
              }}
            >
              <MaterialCommunityIcons
                name={isGridView ? 'format-indent-decrease' : 'format-list-checkbox'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="StoreComponent"
        component={StoreStack}
        options={{
          tabBarLabel: 'Store',
          headerShown: false,
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="store" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search Product"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarLabelStyle: { fontSize: 15 },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarLabel: 'Cart',
          tabBarLabelStyle: { fontSize: 15 },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" color={color} size={size} />
          ),
          tabBarBadge: useCart().cartItemCount > 0 ? useCart().cartItemCount : undefined,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel focused={focused} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 15 },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );


  const TabBarLabel: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => {
    const { profileData } = useContext<any>(ProfileContext); // Access profileData from the context

    return <Text style={{ color }}>{profileData.name ? profileData.name : 'Profile'}</Text>;
  };


  const HomeStack = () => (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home"
        component={HomeList}
        options={{
          headerShown: false,
        }} />
      <Stack.Screen name="ProductDetail"
        options={{
          headerShown: false,
        }}
        component={ProductDetail} />
      <Stack.Screen
        name="Chat"
        options={{ headerShown: false }}
        component={ChatScreen}
      />
    </Stack.Navigator>
  );

  const GridStack = () => (
    <Stack.Navigator >
      <Stack.Screen name="Grid"
        component={GridComponent}
        options={{
          headerShown: false,
        }} />
      <Stack.Screen name="ProductDetail"
        options={{
          headerShown: false,
        }}
        component={ProductDetail} />
      <Stack.Screen
        name="Chat"
        options={{ headerShown: false }}
        component={ChatScreen}
      />
    </Stack.Navigator>
  );

  const StoreStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Store" component={StoreComponent} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );

  const CartStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Cart"
        component={CartListComponent} />
      <Stack.Screen
        name="AddressItem"
        component={AddressItem}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
      />
      <Stack.Screen
        name="ConfirmOrderList"
        component={ConfirmOrderList}
      />
    </Stack.Navigator>
  );

  const SettingStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Setting"
        component={(props: any) => <SettingScreen {...props} handleLogout={handleLogout} />} />
      <Stack.Screen
        name="Profile"
        component={ProfileComponent}
      />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="AddDetails" component={ListScreen} />
      <Stack.Screen
        name="ConfirmOrderList"
        component={ConfirmOrderList}
      />
    </Stack.Navigator>
  );

  const SearchStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );


  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;