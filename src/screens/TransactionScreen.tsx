import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../style/GlobalStyles';
import ratio from '../style/ratio';
import FinancialReport from '../(components)/FinancialReport';
import Right from '../assets/icons/right.svg';
import Filter from '../assets/icons/filter.svg';
import Filter1 from '../assets/icons/filter1.svg';
import BtnLarge from '../(components)/BtnLarge';
import SCREENS from '../navigation/Screens';
import SmallDownBtn from '../(components)/SmallDownBtn';

const {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratio;

import Transactions from '../(components)/Transactions';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTransactions} from '../store/transactionsSlice';
import {RootState} from '../store/store';
import {createSelector} from '@reduxjs/toolkit';

interface useTransactionsProps {}

const selectTransactions = (state: RootState) =>
  state.transactions.transactions;

export const selectTransactionsData = createSelector(
  [selectTransactions],
  transactions => {
    const transactionData = transactions;

    return {
      transactionData,
    };
  },
);
const TransactionScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {transactionData} = useSelector(selectTransactionsData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isFilter, setFilter] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleFilter = () => {
    toggleModal();
    setFilter(true);
  };

  const resetToggle = () => {
    setFilter(false);
    setModalVisible(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
        <View style={styles.recentTransactionHeader}>
          <SmallDownBtn text={'Month'} />
          {!isFilter ? (
            <Filter onPress={toggleModal} />
          ) : (
            <Filter1 onPress={toggleModal} />
          )}
        </View>
        <FinancialReport
          handleFunc={() => navigation.navigate(SCREENS.FINANCIAL_EXPENSE)}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.recentTransactionHeader}>
            <Text style={styles.recentTransactionText}>Today</Text>
          </View>
          <Transactions data={transactionData} />
        </ScrollView>
      </SafeAreaView>

      <Modal style={styles.model} isVisible={isModalVisible}>
        <TouchableOpacity
          style={styles.closeLine}
          onPress={toggleModal}></TouchableOpacity>
        <View style={styles.filterTransaction}>
          <Text style={styles.filterTransactionText}>Filter Transaction</Text>
          <Text style={styles.filterResetBtn} onPress={resetToggle}>
            Reset
          </Text>
        </View>
        <View style={styles.filterBy}>
          <Text style={styles.filterTransactionText}>Filter By</Text>
          <View style={styles.filterByContainer}>
            <TouchableOpacity style={styles.filterByBtnLight}>
              <Text style={styles.filterByBtnTextLight}>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterByBtnDark}>
              <Text style={styles.filterByBtnTextDark}>Expense</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.filterBy}>
          <Text style={styles.filterTransactionText}>Sort By</Text>
          <View style={styles.filterByContainer}>
            <TouchableOpacity style={styles.filterByBtnLight}>
              <Text style={styles.filterByBtnTextLight}>Highest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterByBtnLight}>
              <Text style={styles.filterByBtnTextLight}>Lowest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterByBtnLight}>
              <Text style={styles.filterByBtnTextLight}>Newest</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.filterByBtnLight}>
            <Text style={styles.filterByBtnTextLight}>Oldest</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterBy}>
          <Text style={styles.categoryText}>Category</Text>
        </View>
        <View style={styles.filterCategoryContainer}>
          <Text style={styles.filterCategoryText}>
            See your financial report
          </Text>
          <View style={styles.rightArrowContainer}>
            <Text style={styles.select}>0 Selected</Text>
            <Right style={styles.rightArrow} />
          </View>
        </View>
        <BtnLarge text={'Apply'} handleFunc={toggleFilter} />
      </Modal>
    </>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: pixelSizeHorizontal(16),
  },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    borderWidth: fontPixel(1),
    borderColor: COLOR.borderLight,
    borderRadius: widthPixel(16),
    paddingHorizontal: pixelSizeHorizontal(16),
    paddingVertical: pixelSizeVertical(8),
  },
  headerTitle: {
    fontSize: fontPixel(14),
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: '500',
  },
  recentTransactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: pixelSizeVertical(28),
    paddingBottom: pixelSizeVertical(15),
  },
  recentTransactionText: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.black,
  },
  recentTransactionContainer: {
    width: '100%',
    height: pixelSizeVertical(89),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  leftContent: {
    gap: 10,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: pixelSizeVertical(12),
  },
  title: {
    fontSize: fontPixel(16),
    color: COLOR.black,
    fontWeight: '500',
  },
  description: {
    fontSize: fontPixel(13),
    color: COLOR.baseLight,
    fontWeight: '500',
  },
  right: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: pixelSizeVertical(12),
  },
  paymentRed: {
    fontSize: fontPixel(16),
    color: COLOR.red,
    fontWeight: '600',
  },
  paymentGreen: {
    fontSize: fontPixel(16),
    color: COLOR.green,
    fontWeight: '600',
  },
  time: {
    fontSize: fontPixel(15),
    color: COLOR.baseLight,
    fontWeight: '500',
  },

  model: {
    backgroundColor: COLOR.white,
    borderTopEndRadius: widthPixel(24),
    borderTopStartRadius: widthPixel(24),
    width: '100%',
    height: heightPixel(495),
    marginTop: pixelSizeHorizontal(240),
    marginBottom: pixelSizeHorizontal(1),
    marginLeft: pixelSizeVertical(1),
    padding: pixelSizeHorizontal(16),
    display: 'flex',
    justifyContent: 'flex-start',
  },
  closeLine: {
    borderWidth: widthPixel(4),
    width: widthPixel(36),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(50),
    alignSelf: 'center',
  },

  filterTransaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: pixelSizeVertical(15),
    marginBottom: pixelSizeVertical(20),
  },
  filterTransactionText: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.black,
  },
  filterResetBtn: {
    fontSize: fontPixel(14),
    fontWeight: '500',
    color: COLOR.violet,
    backgroundColor: COLOR.violetLight,
    paddingVertical: pixelSizeVertical(8),
    paddingHorizontal: pixelSizeHorizontal(16),
    borderRadius: fontPixel(40),
  },
  filterByContainer: {
    flexDirection: 'row',
    gap: widthPixel(8),
    paddingVertical: pixelSizeVertical(20),
  },
  filterByBtnLight: {
    width: pixelSizeHorizontal(98),
    height: pixelSizeVertical(42),
    borderWidth: widthPixel(1),
    borderRadius: widthPixel(24),
    borderColor: COLOR.baseLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterByBtnDark: {
    width: pixelSizeHorizontal(98),
    height: pixelSizeVertical(42),
    borderWidth: widthPixel(1),
    borderRadius: widthPixel(24),
    borderColor: COLOR.violetLight,
    backgroundColor: COLOR.violetLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterByBtnTextLight: {
    fontSize: fontPixel(14),
    fontWeight: '500',
    color: COLOR.black,
  },
  filterByBtnTextDark: {
    fontSize: fontPixel(14),
    fontWeight: '500',
    color: COLOR.violet,
  },
  categoryText: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.black,
    marginTop: pixelSizeVertical(15),
  },
  filterCategoryContainer: {
    marginVertical: pixelSizeVertical(10),
    borderRadius: fontPixel(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterCategoryText: {
    color: COLOR.black,
    fontSize: fontPixel(16),
    fontWeight: '500',
    paddingVertical: pixelSizeVertical(16),
  },
  rightArrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    color: COLOR.baseLight,
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  rightArrow: {
    paddingRight: pixelSizeHorizontal(45),
  },
} as {[key: string]: ViewStyle});
