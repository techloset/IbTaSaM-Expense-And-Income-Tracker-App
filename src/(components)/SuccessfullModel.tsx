import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../style/GlobalStyles';
import ratio from '../style/ratio';
import SuccessIcon from '../assets/icons/success.svg';

const {widthPixel, heightPixel, fontPixel, pixelSizeHorizontal} = ratio;

interface SuccessModelProps {
  isVisible: boolean;
  description: string;
}

const SuccessModel: FunctionComponent<SuccessModelProps> = ({
  isVisible,
  description,
  modelCancel,
}) => {
  return (
    <Modal
      style={styles.model}
      onBackdropPress={modelCancel}
      backdropOpacity={0.8}
      isVisible={isVisible}>
      <View style={styles.modelContainer}>
        <TouchableOpacity>
          <SuccessIcon />
        </TouchableOpacity>
        <Text style={styles.modelSubHeading}>{description}</Text>
      </View>
    </Modal>
  );
};

export default SuccessModel;

const styles = StyleSheet.create({
  model: {
    backgroundColor: COLOR.white,
    borderRadius: widthPixel(24),
    width: widthPixel(328),
    height: heightPixel(144),
    marginTop: pixelSizeHorizontal(280),
    marginBottom: pixelSizeHorizontal(280),
    padding: pixelSizeHorizontal(16),
    display: 'flex',
    alignSelf: 'center',
  },
  modelContainer: {
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: COLOR.black,
  },
});
