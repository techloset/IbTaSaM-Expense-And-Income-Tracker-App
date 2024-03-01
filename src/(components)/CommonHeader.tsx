import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ratio from '../style/ratio';
import BackIcon from '../assets/icons/back.svg';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../style/GlobalStyles';

const {pixelSizeVertical, fontPixel} = ratio;

interface CommonHeaderProps {
  title: string;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.authHeaderContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View />
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  authHeaderContainer: {
    paddingTop: pixelSizeVertical(44),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontPixel(18),
    textAlign: 'center',
    color: COLOR.black,
    fontWeight: '600',
    marginRight: pixelSizeVertical(28),
  },
});