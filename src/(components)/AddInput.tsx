import {StyleSheet, TextInput, TextStyle, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {COLOR} from '../style/GlobalStyles';
import ratio from '../style/ratio';

interface AddInputProps {
  placeholder: string;
  value: string;
  changeText: (text: string) => void;
}

const {widthPixel, fontPixel, heightPixel, pixelSizeVertical} = ratio;

const AddInput: FC<AddInputProps> = ({placeholder, value, changeText}) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={COLOR.baseLight}
      placeholder={placeholder}
      value={value}
      onChangeText={changeText}
    />
  );
};

export default AddInput;

const styles = StyleSheet.create({
  input: {
    height: heightPixel(56),
    width: widthPixel(343),
    borderWidth: fontPixel(1),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(16),
    fontSize: fontPixel(18),
    alignSelf: 'center',
    paddingStart: pixelSizeVertical(16),
  } as TextStyle & ViewStyle,
});
