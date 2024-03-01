import React from 'react';
import {Text, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';
import AttachmentIcon from '../assets/icons/attachment.svg';

const {fontPixel, pixelSizeVertical, widthPixel, heightPixel} = ratio;

interface Props {
  handleFunc: () => void;
}

const AttachInputDoc: React.FC<Props> = ({handleFunc}) => {
  return (
    <TouchableOpacity style={styles.inputContainer} onPress={handleFunc}>
      <AttachmentIcon />
      <Text style={styles.input}>Add attachment</Text>
    </TouchableOpacity>
  );
};

export default AttachInputDoc;

const styles = StyleSheet.create({
  inputContainer: {
    height: heightPixel(56),
    width: widthPixel(343),
    borderWidth: fontPixel(1),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingEnd: pixelSizeVertical(16),
    borderStyle: 'dashed',
  },
  input: {
    fontSize: fontPixel(16),
    fontWeight: '400',
    paddingStart: pixelSizeVertical(5),
  },
} as {[key: string]: ViewStyle});
