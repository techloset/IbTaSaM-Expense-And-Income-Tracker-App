import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';
import CommonHeader from '../(components)/CommonHeader';
import SmallDownBtn from '../(components)/SmallDownBtn';
import FinancialIcon from '../assets/icons/financial.svg';
import CategoryFilter from '../assets/icons/categoryFilter.svg';
import PieChartExpense from '../(components)/PieChartExpense';
import ProgressBarWithBtn from '../(components)/ProgressBarWithBtn';
import progressBarsExpenseData from '../library/progressBarsExpenseData';
import SCREENS from '../navigation/Screens';
import PieChartIncome from '../(components)/PieChartIncome';
import progressBarsIncomeData from '../library/progressBarsIncomeData';

const {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratio;

interface ProgressData {
  dotColor: string;
  text: string;
  price: string;
  priceColor: string;
  barColor: string;
  value: number;
}

import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store/store';
import {fetchTransactions} from '../store/transactionsSlice';

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
const FinancialExpenseScreen = ({navigation}: {navigation: any}) => {
  const financeSummary = useSelector(selectFinanceSummary);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const [isExpense, setExpense] = useState<boolean>(true);
  const toggleExpense = () => {
    setExpense(true);
  };

  const toggleIncome = () => {
    setExpense(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <CommonHeader title={'Financial Report'} />
      <View style={styles.financialHeader}>
        <SmallDownBtn text={'Month'} />
        <FinancialIcon />
      </View>
      <View style={styles.chartBox}>
        {isExpense ? (
          <>
            <PieChartExpense />
            <Text style={styles.totalExpense}>${financeSummary.expenses}</Text>
          </>
        ) : (
          <>
            <PieChartIncome />
            <Text style={styles.totalExpense}>${financeSummary.income}</Text>
          </>
        )}
      </View>
      <View style={styles.commonBtn}>
        <Pressable
          style={isExpense ? styles.roundBtnExpense : styles.roundBtnIncome}
          onPress={toggleExpense}>
          <Text
            style={
              isExpense ? styles.roundBtnExpenseText : styles.roundBtnIncomeText
            }>
            Expense
          </Text>
        </Pressable>
        <Pressable
          style={isExpense ? styles.roundBtnIncome : styles.roundBtnExpense}
          onPress={toggleIncome}>
          <Text
            style={
              isExpense ? styles.roundBtnIncomeText : styles.roundBtnExpenseText
            }>
            Income
          </Text>
        </Pressable>
      </View>
      <View style={styles.CategoryHeader}>
        <SmallDownBtn text={'Category'} />
        <CategoryFilter />
      </View>
      {isExpense ? (
        <>
          {progressBarsExpenseData?.map((item: ProgressData, i: number) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(SCREENS.DETAIL_TRANSACTION_EXPENSE, {
                    item,
                  });
                }}
                key={i}>
                <ProgressBarWithBtn
                  dotColor={item.dotColor}
                  text={item.text}
                  price={item.price}
                  priceColor={item.priceColor}
                  barColor={item.barColor}
                  value={item.value}
                />
              </TouchableOpacity>
            );
          })}
        </>
      ) : (
        <>
          {progressBarsIncomeData?.map((item: ProgressData, i: number) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(SCREENS.DETAIL_TRANSACTION_EXPENSE, {
                    item,
                  });
                }}
                key={i}>
                <ProgressBarWithBtn
                  dotColor={item.dotColor}
                  text={item.text}
                  price={item.price}
                  priceColor={item.priceColor}
                  barColor={item.barColor}
                  value={item.value}
                />
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </SafeAreaView>
  );
};

export default FinancialExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: pixelSizeHorizontal(16),
  },
  financialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingTop: pixelSizeVertical(25),
    paddingBottom: pixelSizeVertical(5),
  },
  chartBox: {
    position: 'relative',
  },
  totalExpense: {
    position: 'absolute',
    alignSelf: 'center',
    top: 120,
    fontSize: fontPixel(35),
    fontWeight: '700',
    color: COLOR.black,
  },
  commonBtn: {
    height: heightPixel(56),
    backgroundColor: COLOR.borderLight,
    borderRadius: widthPixel(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: widthPixel(3),
    marginTop: pixelSizeVertical(30),
    marginBottom: pixelSizeVertical(10),
  },
  roundBtnExpense: {
    backgroundColor: COLOR.violet,
    borderRadius: widthPixel(32),
    width: widthPixel(167),
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundBtnExpenseText: {
    paddingHorizontal: pixelSizeHorizontal(5),
    paddingVertical: pixelSizeVertical(5),
    fontSize: fontPixel(16),
    fontWeight: '500',
    color: COLOR.white,
  },
  roundBtnIncome: {
    borderRadius: widthPixel(32),
    width: widthPixel(167),
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundBtnIncomeText: {
    paddingHorizontal: pixelSizeHorizontal(5),
    paddingVertical: pixelSizeVertical(5),
    fontSize: fontPixel(16),
    fontWeight: '500',
    color: COLOR.black,
  },
  CategoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: pixelSizeVertical(15),
  },
});
