import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {ICartItem} from '../redux/redux.constants';
import {
  Category,
  LargeCategoryName,
  genetateUUID,
  getCategoryEnumValueByString,
} from '../redux/utils';
import {RootState} from '../redux';
import {updateCartInList, updateCurrentCart} from '../redux/silces/cart.slice';
import {toPascalCase} from '../products.config';

const AddToCartCard = (props: any) => {
  const dropdown = ['10 cm', '20 cm', '30 cm', '40 cm', '50 cm'];
  const {item, setSelectedItem} = props;
  const [cartItem, setCartItem] = useState({
    count: parseInt(item?.quantity ?? 1),
    selectedItem: '',
    productName: '',
    totalAmount: item?.unitPrice,
  });
  const [showDropDown, setShowDropDown] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(true);

  const dispatch = useDispatch();
  const {currentCategory} = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (text: string) => {
    if (/^\d+$/.test(text)) {
      setCartItem(prevState => ({...prevState, count: parseInt(text)}));
    } else if (text === '') {
      setCartItem(prevState => ({...prevState, count: 0}));
    }
  };

  const handleAddToCartClick = () => {
    const newCartItem: ICartItem = {
      id: genetateUUID(),
      productName: cartItem.productName,
      productPrice: item?.unitPrice.toString(),
      totalPrice: cartItem.totalAmount.toString(),
      count: cartItem.count,
    };
    dispatch(updateCurrentCart(newCartItem));

    setSelectedItem(null);
  };

  useEffect(() => {
    if (cartItem.count > 0) {
      setShouldDisable(false);

      const name: string = `${
        LargeCategoryName[currentCategory as keyof typeof Category]
      } ${toPascalCase(item.title)}`;
      setCartItem(prevState => ({
        ...prevState,
        productName: name,
        totalAmount: (
          cartItem.count * parseFloat(item?.unitPrice ?? 0)
        ).toFixed(2),
      }));
    } else setShouldDisable(true);
  }, [cartItem.count, cartItem.selectedItem]);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.iconContainer}>
          <Icon name="list-alt" size={24} color="black" />
        </View>
        <Text style={styles.productName}>
          {toPascalCase(item.title) ?? 'Product Name'}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          disabled
          style={styles.dropdownContainer}
          onPress={() => {}}>
          <Text style={styles.dropdownText}>
            {'₹ ' + cartItem?.totalAmount}
          </Text>
        </TouchableOpacity>

        <View style={styles.counterContainer}>
          <TextInput
            value={cartItem.count.toString()}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
            style={styles.counterInput}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={{backgroundColor: 'primary'}}
          disabled={shouldDisable}
          mode="contained"
          onPress={handleAddToCartClick}>
          + Add to Cart
        </Button>
      </View>

      <Modal
        transparent={true}
        visible={showDropDown}
        onRequestClose={() => setShowDropDown(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowDropDown(false)}>
          <View style={styles.modalContainer}>
            <RadioButton.Group
              onValueChange={newValue => {
                setCartItem(prevState => ({
                  ...prevState,
                  selectedItem: newValue,
                }));
                setShowDropDown(false);
              }}
              value={cartItem.selectedItem}>
              {dropdown?.map((item, index) => (
                <View key={index} style={styles.dropdownItem}>
                  <RadioButton value={item} color={'black'} />
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderColor: 'black',
    width: 348,
    borderWidth: 1,
    backgroundColor: 'rgba(103, 80, 164,0.1)',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  dropdownContainer: {
    flex: 1,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    height: 45,
    paddingHorizontal: 10,
  },
  dropdownText: {
    color: 'black',
    textAlign: 'center',
  },
  counterText: {
    fontSize: 24,
    justifyContent: 'space-between',
    color: 'black',
    alignSelf: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    overflow: 'hidden',
    width: '40%',
    height: 45,
  },
  counterButton: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 6,
  },
  price: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    paddingRight: 20,
    alignSelf: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownItemText: {
    marginLeft: 8,
    color: 'black',
  },
});

export default AddToCartCard;
