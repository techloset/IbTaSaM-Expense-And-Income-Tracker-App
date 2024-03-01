import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';

interface ProgressBarWithBtnProps {
  text: string;
  price: string;
  priceColor: string;
  dotColor: string;
  barColor: string;
  value: number;
}

const {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratio;

const ProgressBarWithBtn: FC<ProgressBarWithBtnProps> = ({
  text,
  price,
  priceColor,
  dotColor,
  barColor,
  value,
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.smallDownBtnContainer}>
          <View
            style={[
              styles.smallDownBtnColor,
              {backgroundColor: dotColor},
            ]}></View>
          <Text style={styles.smallDownBtnText}>{text}</Text>
        </View>
        <Text style={[styles.containerText, {color: priceColor}]}>{price}</Text>
      </View>
      <Progress.Bar
        progress={value}
        width={360}
        height={10}
        color={barColor}
        unfilledColor={COLOR.borderLight}
        borderRadius={50}
        borderWidth={0}
      />
    </>
  );
};

export default ProgressBarWithBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: pixelSizeVertical(8),
  },
  smallDownBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: fontPixel(1),
    borderColor: COLOR.borderLight,
    borderRadius: widthPixel(50),
    paddingHorizontal: pixelSizeHorizontal(16),
    paddingVertical: pixelSizeVertical(8),
  },
  smallDownBtnColor: {
    width: widthPixel(12),
    height: heightPixel(14),
    borderRadius: widthPixel(50),
  },
  smallDownBtnText: {
    fontSize: fontPixel(14),
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: '500',
  },
  containerText: {
    fontSize: fontPixel(24),
    fontWeight: '500',
  },
});
