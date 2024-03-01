import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import {COLOR} from '../style/GlobalStyles';
import ratio from '../style/ratio';
import SCREENS from '../navigation/Screens';
import {useNavigation} from '@react-navigation/native';

const {fontPixel, pixelSizeVertical, pixelSizeHorizontal} = ratio;

const shopping: ImageSourcePropType = require('../assets/imgs/shopping.png');
const subscription: ImageSourcePropType = require('../assets/imgs/subscription.png');
const food: ImageSourcePropType = require('../assets/imgs/food.png');
const salary: ImageSourcePropType = require('../assets/imgs/salary.png');
const transportation: ImageSourcePropType = require('../assets/imgs/transport.png');
const other: ImageSourcePropType = require('../assets/imgs/reset.png');

const Transactions = ({data}) => {
  const navigation = useNavigation();
  return (
    <>
      {data?.map((item, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigation.navigate(SCREENS.DETAIL_TRANSACTION_EXPENSE, {
                item,
              });
            }}
            style={styles.recentTransactionContainer}>
            <View style={styles.left}>
              {item.category == 'Shopping' ? (
                <>
                  <Image source={shopping} />
                </>
              ) : (
                  <>
                    <Image source={other} />
                  </>
                ) && item.category == 'Subscription' ? (
                <>
                  <Image source={subscription} />
                </>
              ) : (
                  <>
                    <Image source={other} />
                  </>
                ) && item.category == 'Food' ? (
                <>
                  <Image source={food} />
                </>
              ) : (
                  <>
                    <Image source={other} />
                  </>
                ) && item.category == 'Salary' ? (
                <>
                  <Image source={salary} />
                </>
              ) : (
                  <>
                    <Image source={other} />
                  </>
                ) && item.category == 'Transportation' ? (
                <>
                  <Image source={transportation} />
                </>
              ) : (
                <>
                  <Image source={other} />
                </>
              )}
              <View style={styles.leftContent}>
                <Text style={styles.title}>{item.category}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
            <View style={styles.right}>
              <Text
                style={
                  item.transactionType == 'Expense'
                    ? styles.paymentRed
                    : styles.paymentGreen
                }>
                {item.transactionType == 'Expense' ? '- $' : '+ $'} {item.money}
              </Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default Transactions;
const styles = StyleSheet.create({
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
});
