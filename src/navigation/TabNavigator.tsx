import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLOR} from '../style/GlobalStyles';
import ratio from '../style/ratio';
import Home from '../assets/icons/home.svg';
import HomeFill from '../assets/icons/homeFill.svg';
import Transaction from '../assets/icons/transaction.svg';
import TransactionFill from '../assets/icons/transactionFill.svg';
import Budget from '../assets/icons/budget.svg';
import BudgetFill from '../assets/icons/budgetFill.svg';
import Profile from '../assets/icons/profile.svg';
import ProfileFill from '../assets/icons/profileFill.svg';
import Add from '../assets/icons/add.svg';
import Close from '../assets/icons/close.svg';
import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen';
import ExpenseIncomeScreen from '../screens/ExpenseIncomeScreen';
import BudgetScreen from '../screens/BudgetScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Income from '../assets/icons/incomeGreen.svg';
import Expense from '../assets/icons/expenseRed.svg';
import SCREENS from './Screens';

import Modal from 'react-native-modal';

const {pixelSizeVertical} = ratio;

const Tab = createBottomTabNavigator();

interface TabNavigatorProps {
  navigation: any; // Adjust the type according to your navigation prop type
}

const TabNavigator: React.FC<TabNavigatorProps> = ({navigation}) => {
  const [show, setShow] = useState<boolean>(true);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLOR.violet,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: 'absolute',
            height: pixelSizeVertical(79),
            paddingVertical: pixelSizeVertical(20),
            paddingBottom: pixelSizeVertical(8),
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (focused ? <HomeFill /> : <Home />),
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? <TransactionFill /> : <Transaction />,
          }}
        />
        <Tab.Screen
          name="ExpenseIncome"
          component={ExpenseIncomeScreen}
          options={{
            tabBarLabel: '',
            tabBarIconStyle: {
              position: 'relative',
              marginTop: -20,
            },
            headerShown: false,
            tabBarIcon: () => (
              <>
                {show ? (
                  <TouchableOpacity style={styles.height} onPress={toggleShow}>
                    <Add />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.height1} onPress={toggleShow}>
                    <Close />
                  </TouchableOpacity>
                )}
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Budget"
          component={BudgetScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (focused ? <BudgetFill /> : <Budget />),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? <ProfileFill /> : <Profile />,
          }}
        />
      </Tab.Navigator>
      <Modal backdropOpacity={0} onBackdropPress={toggleShow} isVisible={show}>
        <View style={styles.expenseIncomeIconsContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREENS.EXPENSE, {
                titleHeader: 'Income',
                backColor: COLOR.green,
              })
            }>
            <Income style={styles.income} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREENS.EXPENSE, {
                titleHeader: 'Expense',
                backColor: COLOR.red,
              })
            }>
            <Expense style={styles.Expense} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  expenseIncomeIconsContainer: {
    position: 'relative',
  },
  income: {
    position: 'absolute',
    top: 270,
    left: 110,
  },
  Expense: {
    position: 'absolute',
    top: 270,
    right: 110,
  },
  height: {
    height: pixelSizeVertical(90),
  },
  height1: {
    height: pixelSizeVertical(65),
  },
});

export default TabNavigator;
