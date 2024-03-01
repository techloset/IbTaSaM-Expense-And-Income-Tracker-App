import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../style/GlobalStyles';
import ratio from '../style/ratio';

const {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratio;

interface TransactionModelProps {
  isVisible: boolean;
  modelCancel: () => void;
  modelSuccess: () => void;
  text: string;
  description: string;
}

const TransactionModel: FunctionComponent<TransactionModelProps> = ({
  isVisible,
  modelCancel,
  modelSuccess,
  text,
  description,
}) => {
  return (
    <Modal style={styles.model} isVisible={isVisible}>
      <TouchableOpacity
        style={styles.closeLine}
        onPress={modelCancel}></TouchableOpacity>
      <View style={styles.modelContainer}>
        <Text style={styles.modelHeading}>{text}</Text>
        <Text style={styles.modelSubHeading}>{description}</Text>
      </View>
      <View style={styles.modelBtnContainer}>
        <TouchableOpacity style={styles.modelBtnLight} onPress={modelCancel}>
          <Text style={styles.modelBtnLightText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modelBtnDark} onPress={modelSuccess}>
          <Text style={styles.modelBtnDarkText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default TransactionModel;

const styles = StyleSheet.create({
  model: {
    backgroundColor: COLOR.white,
    borderTopEndRadius: widthPixel(24),
    borderTopStartRadius: widthPixel(24),
    width: '100%',
    height: heightPixel(191),
    marginTop: pixelSizeHorizontal(550),
    marginBottom: pixelSizeHorizontal(1),
    marginLeft: pixelSizeVertical(1),
    padding: pixelSizeHorizontal(16),
    display: 'flex',
    justifyContent: 'flex-start',
  },
  closeLine: {
    borderWidth: widthPixel(4),
    width: widthPixel(36),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(50),
    alignSelf: 'center',
  },
  modelContainer: {
    gap: 10,
    paddingVertical: pixelSizeVertical(15),
  },
  modelHeading: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    textAlign: 'center',
    color: COLOR.black,
  },
  modelSubHeading: {
    fontSize: fontPixel(16),
    fontWeight: '500',
    textAlign: 'center',
    color: COLOR.baseLight,
  },
  modelBtnContainer: {
    flexDirection: 'row',
    gap: widthPixel(16),
    paddingVertical: pixelSizeVertical(8),
  },
  modelBtnLight: {
    width: pixelSizeHorizontal(164),
    height: pixelSizeVertical(56),
    backgroundColor: COLOR.borderLight,
    borderRadius: widthPixel(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelBtnLightText: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.violet,
  },
  modelBtnDark: {
    width: pixelSizeHorizontal(164),
    height: pixelSizeVertical(56),
    backgroundColor: COLOR.violet,
    borderRadius: widthPixel(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelBtnDarkText: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.white,
  },
});