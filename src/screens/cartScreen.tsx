import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Layout from '../components/layOut';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import {setCurrentCart} from '../redux/silces/cart.slice';
import Cartlist from '../components/cartListComponent';

const Cartscreen = ({
  navigation,
  handleBack,
}: {
  navigation: any;
  handleBack: any;
}) => {
  const {cartList} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const handleItemClick = (item: any) => {
    dispatch(setCurrentCart(item));
    navigation.navigate('cart', {id: item.id});
  };

  // console.log(cartList, 'cartlist');
  return (
    <Layout
      headerText="Cart "
      navigation={() => {
        handleBack(0);
      }}>
      <ScrollView>
        <Cartlist orders={cartList} onItemPress={handleItemClick} />
      </ScrollView>
    </Layout>
  );
};

export default Cartscreen;
