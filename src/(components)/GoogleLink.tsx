import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import GoogleIcon from '../assets/icons/google.svg';
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';

const {pixelSizeVertical, widthPixel, heightPixel, fontPixel} = ratio;

interface GoogleLinkProps {
  handleFunc: () => void;
}
const GoogleLink: React.FC<GoogleLinkProps> = ({handleFunc}) => {
  return (
    <TouchableOpacity onPress={handleFunc} style={styles.inputContainer}>
      <GoogleIcon />
      <Text style={styles.signText}>Sign Up with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleLink;

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
    paddingRight: pixelSizeVertical(16),
    gap: 10,
  },
  signText: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.black,
  },
});
