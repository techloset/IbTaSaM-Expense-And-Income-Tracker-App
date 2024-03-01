import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../assets/icons/whitearrow.svg';
import {COLOR} from '../style/GlobalStyles';
import ratio from '../style/ratio';

const {pixelSizeVertical, fontPixel} = ratio;

interface Props {
  title: string;
}

const IncomeExpenseHeader: React.FC<Props> = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.authHeaderContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View />
      </View>
    </View>
  );
};

export default IncomeExpenseHeader;

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
    marginRight: pixelSizeVertical(28),
  },
});
