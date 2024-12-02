import * as React from 'react';
import {BottomNavigation, TouchableRipple} from 'react-native-paper';

import {StyleSheet, Text, View} from 'react-native';
import HomePageComponent from '../components/homePageComponent';

import Orderscreen from './orderSccreen';
import Cartscreen from './cartScreen';

const HomeScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {id = 0} = route.params;

  const [index, setIndex] = React.useState(id ?? 0);

  const handleIndexChange = (params: number) => {
    setIndex(params);
  };
  const homePageRoute = () => <HomePageComponent navigation={navigation} />;

  const cartPageRoute = () => (
    <Cartscreen navigation={navigation} handleBack={handleIndexChange} />
  );
  const OrdersPage = () => (
    <Orderscreen navigation={navigation} handleBack={handleIndexChange} />
  );

  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'cart',
      title: 'Cart',
      focusedIcon: 'cart',
      unfocusedIcon: 'cart-outline',
    },
    {
      key: 'orders',
      title: 'Orders',
      focusedIcon: 'timer-sand-full',
      unfocusedIcon: 'timer-sand-empty',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: homePageRoute,
    cart: cartPageRoute,
    orders: OrdersPage,
  });

  React.useEffect(() => {
    setIndex(id);
  }, []);

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      style={styles.bottomNavigation}
      // activeColor="rgba(245, 71, 73, 0.1)"
      // activeIndicatorStyle={{shadowColor: 'rgba(245, 71, 73, 0.1)'}}
    />
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor: 'red', // Example background color
    borderTopWidth: 1, // Example border style
    borderTopColor: 'gray', // Example border color
  },
});

export default HomeScreen;
