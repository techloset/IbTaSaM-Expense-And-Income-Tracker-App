import React from 'react';
import {View, Text} from 'react-native';
import {COLOR} from '../style/GlobalStyles';

const BudgetScreen: React.FC = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.baseLight,
        flex: 1,
      }}>
      <Text style={{fontSize: 30, color: COLOR.violet}}>Budget</Text>
    </View>
  );
};

export default BudgetScreen;
