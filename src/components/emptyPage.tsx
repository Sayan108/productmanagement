// TextDisplay.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  text: string;
};

const EmptyPage: React.FC<Props> = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default EmptyPage;
