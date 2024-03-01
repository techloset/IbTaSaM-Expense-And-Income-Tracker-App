import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';

const {widthPixel, heightPixel, fontPixel} = ratio;

interface BtnLargeProps {
  text: string;
  handleFunc: () => void;
}

const BtnLarge: React.FC<BtnLargeProps> = ({text, handleFunc}) => {
  return (
    <TouchableOpacity onPress={handleFunc} style={styles.btn}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BtnLarge;

const styles = StyleSheet.create({
  btn: {
    width: widthPixel(343),
    height: heightPixel(56),
    backgroundColor: COLOR.violet,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: widthPixel(16),
  },
  btnText: {
    color: COLOR.white,
    fontSize: fontPixel(18),
  },
});