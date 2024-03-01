import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLOR} from '../style/GlobalStyles';
import ratio from '../style/ratio';
import HomeFilterData from '../library/HomeFilterData';

const {widthPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} = ratio;

const HomeFilter: React.FC = () => {
  const [pressed, setPressed] = useState<number>(1);

  return (
    <View style={styles.filterContainer}>
      {HomeFilterData?.map((item: string, i: number) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => setPressed(i)}
            style={pressed === i ? styles.filter : styles.filterHover}>
            <Text
              style={
                pressed === i ? styles.filterText : styles.filterTextHover
              }>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default HomeFilter;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filter: {
    backgroundColor: COLOR.yellowLight,
    borderRadius: widthPixel(16),
  },
  filterText: {
    color: COLOR.yellow,
    textAlign: 'center',
    fontSize: fontPixel(14),
    fontWeight: '700',
    paddingVertical: pixelSizeVertical(8),
    paddingHorizontal: pixelSizeHorizontal(24),
  },
  filterHover: {
    borderRadius: widthPixel(16),
  },
  filterTextHover: {
    color: COLOR.baseLight,
    textAlign: 'center',
    fontSize: fontPixel(14),
    fontWeight: '700',
    paddingVertical: pixelSizeVertical(8),
    paddingHorizontal: pixelSizeHorizontal(24),
  },
});
