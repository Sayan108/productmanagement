import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import AddToCartCard from './addToCart';
import {Button, TextInput} from 'react-native-paper';
import Layout from './layOut';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {findSubCategoriesArray, toPascalCase} from '../products.config';
import {filterArrayByString} from '../redux/utils';

const SubProductList = ({navigation}: {navigation: any}) => {
  const currentCartList = useSelector(
    (state: RootState) => state.cart.currentCart,
  );
  const currentCategory = useSelector(
    (state: RootState) => state.cart.currentCategory,
  );

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const handleNavigation = () => {
    navigation.navigate('home');
  };

  useEffect(() => {
    const data = findSubCategoriesArray(currentCategory);
    setItems(data);
    setFilteredItems(data);
  }, [currentCategory]);

  useEffect(() => {
    setFilteredItems(filterArrayByString(items, searchText));
  }, [searchText, items]);

  return (
    <Layout
      headerText={`Sub products for "${currentCategory}"`}
      navigation={handleNavigation}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${currentCategory}`}
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="black"
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          {filteredItems.map((item, index) => (
            <Pressable key={index}>
              {index === selectedItem ? (
                <AddToCartCard item={item} setSelectedItem={setSelectedItem} />
              ) : (
                <View
                  onTouchEnd={() => setSelectedItem(index)}
                  style={styles.item}>
                  <Text style={styles.text}>{toPascalCase(item.title)}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          mode="contained"
          disabled={currentCartList.items.length === 0}
          onPress={() => navigation.navigate('cart')}>
          Checkout
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
    color: 'black',
  },
  container: {
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  item: {
    width: 328,
    height: 64,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
  },
  text: {
    color: 'black',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    flexDirection: 'column',
    marginRight: 20,
  },
  button: {
    justifyContent: 'space-between',
    marginBottom: 20,
    color: 'purple',
  },
});

export default SubProductList;
