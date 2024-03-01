import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {COLOR} from '../style/GlobalStyles';
import ratio from '../style/ratio';
import CameraIcon from '../assets/icons/camera.svg';
import GalleryIcon from '../assets/icons/gallery.svg';
import FileIcon from '../assets/icons/file.svg';

const {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratio;

interface AttachModelProps {
  isVisible: boolean;
  modelCancel: () => void;
  boxVisible: () => void;
  openCamraData: () => void;
}

const AttachModel: React.FC<AttachModelProps> = ({
  isVisible,
  modelCancel,
  boxVisible,
  openCamraData,
}) => {
  return (
    <Modal style={styles.model} isVisible={isVisible}>
      <TouchableOpacity
        style={styles.closeLine}
        onPress={modelCancel}></TouchableOpacity>
      <View style={styles.modelBtnContainer}>
        <TouchableOpacity style={styles.btn}>
          <CameraIcon />
          <Text style={styles.btnText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={openCamraData}>
          <GalleryIcon />
          <Text style={styles.btnText}>Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={boxVisible}>
          <FileIcon />
          <Text style={styles.btnText}>Document</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AttachModel;

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
  modelBtnContainer: {
    flexDirection: 'row',
    paddingVertical: pixelSizeVertical(8),
    justifyContent: 'space-between',
    marginTop: pixelSizeVertical(30),
  },
  btn: {
    width: pixelSizeHorizontal(107),
    height: pixelSizeVertical(91),
    backgroundColor: COLOR.borderLight,
    borderRadius: widthPixel(16),
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  btnText: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.violet,
  },
});
