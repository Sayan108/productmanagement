import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

interface IhelperTextProps {
  type: 'error' | 'info';
  text: string;
  show: boolean;
}

const HelperText = (props: IhelperTextProps) => {
  const {type, text, show} = props;
  const Style = StyleSheet.create({
    error: {
      color: 'red',
      fontSize: 12,
      display: show ? 'flex' : 'none',
    },
    info: {color: 'green', fontSize: 12},
  });

  return (
    <View>
      <Text style={Style.error}>{text}</Text>
    </View>
  );
};

export default HelperText;
