import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';
import EyeIcon from '../assets/icons/eye.svg';

const {fontPixel, pixelSizeVertical, widthPixel, heightPixel} = ratio;

interface PasswordInputProps {
  value: string;
  changeText: (text: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({value, changeText}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLOR.baseLight}
        placeholder="Password"
        value={value}
        onChangeText={changeText}
      />
      <EyeIcon />
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: heightPixel(56),
    width: widthPixel(343),
    borderWidth: fontPixel(1),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingEnd: pixelSizeVertical(16),
  },
  input: {
    fontSize: fontPixel(18),
    paddingStart: pixelSizeVertical(16),
    width: '90%',
  },
});
