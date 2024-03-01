import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../style/GlobalStyles';
import BackIcon from '../assets/icons/backWite.svg';
import TrashIcon from '../assets/icons/trash.svg';
import ratio from '../style/ratio';

const {pixelSizeVertical, fontPixel} = ratio;

interface ExpenseCommonHeaderProps {
  title: string;
  handleFun: () => void;
}

const ExpenseCommonHeader: React.FC<ExpenseCommonHeaderProps> = ({
  title,
  handleFun,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.authHeaderContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={handleFun}>
          <TrashIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExpenseCommonHeader;

const styles = StyleSheet.create({
  authHeaderContainer: {
    paddingTop: pixelSizeVertical(44),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontPixel(18),
    textAlign: 'center',
    color: COLOR.white,
    fontWeight: '600',
  },
});
