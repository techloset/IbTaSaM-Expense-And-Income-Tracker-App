import React from 'react';
import {View, StyleSheet} from 'react-native';
import PieChart from 'react-native-pie-chart';
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';

const {pixelSizeVertical} = ratio;

const PieChartIncome: React.FC = () => {
  const widthAndHeight: number = 250;
  const series: number[] = [80, 150];
  const sliceColor: string[] = [COLOR.black, COLOR.green];

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

export default PieChartIncome;

const styles = StyleSheet.create({
  pieChartContainer: {
    alignSelf: 'center',
    paddingVertical: pixelSizeVertical(20),
  },
});
