import React from 'react';
import {View, StyleSheet} from 'react-native';
import PieChart from 'react-native-pie-chart';
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';

const {pixelSizeVertical} = ratio;

const PieChartExpense: React.FC = () => {
  const widthAndHeight = 250;
  const series = [100, 130, 75];
  const sliceColor = [COLOR.red, COLOR.yellow, COLOR.violet];

  return (
    <View style={styles.pieChartContainer}>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.75}
        coverFill={COLOR.white}
      />
    </View>
  );
};

export default PieChartExpense;

const styles = StyleSheet.create({
  pieChartContainer: {
    alignSelf: 'center',
    paddingVertical: pixelSizeVertical(20),
  },
});
