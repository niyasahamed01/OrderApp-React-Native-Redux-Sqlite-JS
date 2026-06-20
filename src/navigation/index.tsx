import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const ROUTERS = {
  Login: 'Login',
 
};

export {Stack, NavigationContainer, Navigator, Screen, ROUTERS};

export const navigationRef = React.createRef();

export function navigate(name: string, params?: any) {
  // @ts-ignore
  navigationRef?.current?.navigate(name, params);
}
