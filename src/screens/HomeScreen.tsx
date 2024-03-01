import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ViewStyle,
  SafeAreaView,
} from 'react-native';
import {ImageSourcePropType} from 'react-native';

const myImage: ImageSourcePropType = require('../assets/imgs/profile.png');
import {COLOR} from '../style/GlobalStyles';
import ratio from '../style/ratio';
import Notifi from '../assets/icons/notifiaction.svg';
import Income from '../assets/icons/income.svg';
import Expense from '../assets/icons/expense.svg';
import HomeFilter from '../(components)/HomeFilter';
import RecentTransaction from '../(components)/RecentTransaction';
import LineChartComponent from '../(components)/LineChartComponent';
import SmallDownBtn from '../(components)/SmallDownBtn';
import {db} from '../config/firebase';
import auth from '@react-native-firebase/auth';
import Transactions from '../(components)/Transactions';

const {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratio;

import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store/store';
import {fetchTransactions} from '../store/transactionsSlice';
import SCREENS from '../navigation/Screens';

const selectTransactions = (state: RootState) =>
  state.transactions.transactions;

export const selectFinanceSummary = createSelector(
  [selectTransactions],
  transactions => {
    const income = transactions
      .filter(transaction => transaction.transactionType === 'Income')
      .reduce((acc, curr) => acc + parseFloat(curr.money), 0);

    const expenses = transactions
      .filter(transaction => transaction.transactionType === 'Expense')
      .reduce((acc, curr) => acc + parseFloat(curr.money), 0);

    const balance = income - expenses;

    return {
      income,
      expenses,
      balance,
    };
  },
);

export const selectTransactionsData = createSelector(
  [selectTransactions],
  transactions => {
    const transactionData = transactions;

    return {
      transactionData,
    };
  },
);
const HomeScreen: React.FC = ({navigation}) => {
  // Use the memoized selector inside the hook
  const {transactionData} = useSelector(selectTransactionsData);
  const financeSummary = useSelector(selectFinanceSummary);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <View style={styles.homeHeaderContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Image source={myImage} />
          </TouchableOpacity>
          <SmallDownBtn text={'October'} />
          <TouchableOpacity>
            <Notifi />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.accBala}>Account Balance</Text>
      <Text style={styles.balance}>${financeSummary.balance}</Text>
      <View style={styles.twoCards}>
        <View style={styles.card1}>
          <Income />
          <View style={styles.incomeCard}>
            <Text style={styles.income}>Income</Text>
            <Text style={styles.incomePayment}>${financeSummary.income}</Text>
          </View>
        </View>
        <View style={styles.card2}>
          <Expense />
          <View style={styles.incomeCard}>
            <Text style={styles.income}>Expense</Text>
            <Text style={styles.incomePayment}>${financeSummary.expenses}</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <Text style={styles.spend}>Spend Frequency</Text>
        <LineChartComponent />
        <HomeFilter />
        <View style={styles.RecentTransactionContainer}>
          <View style={styles.recentTransactionHeader}>
            <Text style={styles.recentTransactionText}>Recent Transaction</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREENS.TRANSACTION)}>
              <Text style={styles.seeBtnText}>See All</Text>
            </TouchableOpacity>
          </View>
          <Transactions data={transactionData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  homeHeaderContainer: {
    paddingTop: pixelSizeVertical(45),
    paddingHorizontal: pixelSizeHorizontal(16),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accBala: {
    fontSize: fontPixel(18),
    alignSelf: 'center',
    color: COLOR.baseLight,
    fontWeight: '500',
    paddingVertical: pixelSizeVertical(15),
  },
  balance: {
    fontSize: fontPixel(40),
    alignSelf: 'center',
    color: COLOR.black,
    fontWeight: '500',
  },
  twoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: pixelSizeVertical(30),
    paddingHorizontal: pixelSizeHorizontal(16),
  },
  card1: {
    backgroundColor: COLOR.green,
    borderRadius: widthPixel(28),
    width: '48%',
    height: heightPixel(80),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  card2: {
    backgroundColor: COLOR.red,
    borderRadius: widthPixel(28),
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  income: {
    fontSize: fontPixel(14),
    fontWeight: '500',
    color: COLOR.white,
  },
  incomePayment: {
    fontSize: fontPixel(22),
    fontWeight: '600',
    color: COLOR.white,
  },
  spend: {
    paddingHorizontal: pixelSizeHorizontal(16),
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.black,
  },
  RecentTransactionContainer: {
    paddingHorizontal: pixelSizeHorizontal(16),
  },
  recentTransactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: pixelSizeVertical(15),
  },
  recentTransactionText: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.black,
  },
  seeBtnText: {
    fontSize: fontPixel(14),
    fontWeight: '500',
    color: COLOR.violet,
    backgroundColor: COLOR.violetLight,
    paddingVertical: pixelSizeVertical(8),
    paddingHorizontal: pixelSizeHorizontal(16),
    borderRadius: fontPixel(40),
  },
} as {[key: string]: ViewStyle});

export default HomeScreen;
