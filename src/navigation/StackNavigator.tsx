import React from 'react';
import SCREENS from './Screens';
import StackNavigation from './StackNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

type StackParamList = {
  [key: string]: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.SIGN_UP}
      screenOptions={{headerShown: false} as NativeStackNavigationOptions}>
      {StackNavigation?.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.screenName}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default StackNavigator;
