import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';
import DownIcon from '../assets/icons/down.svg';

interface Props {
  placeholder: string;
  value: string;
  changeText: (text: string) => void;
}

const {fontPixel, pixelSizeVertical, widthPixel, heightPixel} = ratio;

const DropInput: React.FC<Props> = ({placeholder, value, changeText}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLOR.baseLight}
        placeholder={placeholder}
        value={value}
        onChangeText={changeText}
      />
      <DownIcon />
    </View>
  );
};

export default DropInput;

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
    width:'90%'
  },
});
