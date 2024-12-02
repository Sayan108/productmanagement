import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import ListWithIcons, {Item} from './listWithIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {
  addNewCartInList,
  setCurrentCart,
  setInitialCurrentCart,
  updateCurrentCategory,
} from '../../redux/silces/cart.slice';
import {ICart} from '../../redux/redux.constants';
import {genetateUUID} from '../../redux/utils';
import {allItems as items} from '../../products.config';
import Layout from '../layOut';

const HomePageComponent = ({navigation}: {navigation: any}) => {
  const {cartList, currentCart} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const handleButtonClick = (item: Item) => {
    dispatch(updateCurrentCategory(item.text));
    const cartItem: ICart = {
      id: genetateUUID().toString(),
      totalAmount: '0',
      items: [],
    };

    if (currentCart.id === '') {
      dispatch(setInitialCurrentCart(cartItem));
    }
    navigation.navigate('subproduct');
  };

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={{padding: 10, flex: 1}}>
      <Text style={styles.headerText}>Product Management</Text>
      <Layout headerText="Categories" navigation={() => {}} hideButton>
        <View style={{flex: 1}}>
          {/* <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search categories..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor={'black'}
            />
          </View> */}
          <ScrollView>
            <ListWithIcons
              items={filteredItems}
              navigation={navigation}
              handleClick={handleButtonClick}
            />
          </ScrollView>
        </View>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  searchContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  searchInput: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 28,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default HomePageComponent;
