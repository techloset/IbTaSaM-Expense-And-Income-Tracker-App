import React from 'react';
import {View} from 'react-native';
import {LineChart, LineChartData} from 'react-native-gifted-charts';

const LineChartComponent: React.FC = () => {
  const data: LineChartData[] = [
    {
      value: 10,
      hideDataPoint: true,
    },
    {
      value: 200,
      hideDataPoint: true,
    },
    {
      value: 50,
      hideDataPoint: true,
    },
    {
      value: 420,
      hideDataPoint: true,
    },
    {
      value: 290,
      hideDataPoint: true,
    },
    {
      value: 440,
      hideDataPoint: true,
    },
    {
      value: 300,
      hideDataPoint: true,
    },
    {
      value: 280,
      hideDataPoint: true,
    },
    {
      value: 150,
      hideDataPoint: true,
    },
    {
      value: 150,
      hideDataPoint: true,
    },
  ];

  return (
    <View
      style={{
        position: 'relative',
        left: -70,
        width: '200%',
      }}>
      <LineChart
        thickness={8}
        color="#7F3DFF"
        maxValue={600}
        noOfSections={1}
        areaChart
        yAxisTextStyle={'#fff'}
        data={data}
        curved
        startFillColor={'rgb(127, 61, 255)'}
        endFillColor={'#fff'}
        startOpacity={0.3}
        endOpacity={0.7}
        spacing={60}
        backgroundColor="#fff"
        rulesColor="#fff"
        rulesType="solid"
        initialSpacing={-30}
        yAxisColor="#fff"
        xAxisColor="#fff"
      />
    </View>
  );
};

export default LineChartComponent;
