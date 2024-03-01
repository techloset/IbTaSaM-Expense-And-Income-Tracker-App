import React from 'react';
import {Text, StyleSheet, Pressable, ViewStyle} from 'react-native';
import {COLOR} from '../style/GlobalStyles';
import ratio from '../style/ratio';
import Right from '../assets/icons/right.svg';

interface FinancialReportProps {
  handleFunc: () => void;
}

const {fontPixel, pixelSizeHorizontal} = ratio;

const FinancialReport: React.FC<FinancialReportProps> = ({handleFunc}) => {
  return (
    <Pressable style={styles.financialReportcontainer} onPress={handleFunc}>
      <Text style={styles.financialReportContent}>
        See your financial report
      </Text>
      <Right style={styles.rightArrow} />
    </Pressable>
  );
};

export default FinancialReport;

const styles = StyleSheet.create({
  financialReportcontainer: {
    backgroundColor: COLOR.violetLight,
    borderRadius: fontPixel(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  financialReportContent: {
    color: COLOR.violet,
    fontSize: fontPixel(16),
    fontWeight: '400',
    padding: fontPixel(16),
  },
  rightArrow: {
    paddingRight: pixelSizeHorizontal(45),
  },
} as {[key: string]: ViewStyle});
