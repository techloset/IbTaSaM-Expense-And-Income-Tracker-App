import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Down from '../assets/icons/down.svg';
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';

interface SmallDownBtnProps {
  text: string;
}

const {widthPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} = ratio;

const SmallDownBtn: React.FC<SmallDownBtnProps> = ({text}) => {
  return (
    <TouchableOpacity style={styles.smallDownBtnContainer}>
      <Down />
      <Text style={styles.smallDownBtnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SmallDownBtn;

interface Styles {
  smallDownBtnContainer: ViewStyle;
  smallDownBtnText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  smallDownBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    borderWidth: fontPixel(1),
    borderColor: COLOR.borderLight,
    borderRadius: widthPixel(50),
    paddingHorizontal: pixelSizeHorizontal(16),
    paddingVertical: pixelSizeVertical(8),
  },
  smallDownBtnText: {
    fontSize: fontPixel(14),
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: '500',
  },
});
