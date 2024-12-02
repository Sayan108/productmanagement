import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export interface Props {
  children: React.ReactNode;
  navigation: any;
  headerText: string;
  hideButton?: boolean;
}
const Layout = (props: Props) => {
  const {children, navigation, headerText, hideButton} = props;
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        {hideButton === undefined ? (
          <Icon
            name="arrow-left"
            size={35}
            color="black"
            onPress={navigation}
          />
        ) : null}
        <Text style={styles.title}>{headerText}</Text>
      </Appbar.Header>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 30,
    color: 'black',
  },
});

export default Layout;
