import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  // Modal,
  // Pressable,
} from 'react-native';
// import {RadioButton, TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CartItem = (props: any) => {
  // const dropdown = ['10 cm', '20 cm', '30 cm', '40 cm', '50 cm'];
  const {item} = props;
  // console.log(item, 'Dropdown');
  const [quantity, setQuantity] = useState<any>(item?.quantity ?? 1);
  const [showDropDown, setShowDropDown] = useState(false);
  // const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    setQuantity(parseInt(item.quantity ?? 1));
  }, [item.quantity]);

  const handleQuantityChange = (text: string) => {
    if (/^\d+$/.test(text)) {
      setQuantity(parseInt(text));
    } else if (text === '') {
      setQuantity(0);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.iconContainer}>
          <Icon name="list-alt" size={24} color="black" />
        </View>
        <Text style={styles.productName}>
          {item.productName ?? 'Product Name'}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setShowDropDown(true)}>
          <Text style={styles.dropdownText}>
            {'Total price - ₹ ' + item?.totalPrice}
          </Text>
        </TouchableOpacity>
        <View style={styles.counterContainer}>
          <Text style={styles.dropdownText}>{'Quantity -' + item?.count}</Text>
          {/* <TextInput
            value={quantity.toString()}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
            style={styles.counterInput}
          /> */}
          {/* Uncomment if you want to use increment/decrement buttons */}
          {/* <TouchableOpacity onPress={handleDecrement} style={styles.counterButton}>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIncrement} style={styles.counterButton}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <Text style={styles.price}>{'Unit price ₹  ' + item?.productPrice}</Text>

      {/* <Modal
        transparent={true}
        visible={showDropDown}
        onRequestClose={() => setShowDropDown(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowDropDown(false)}>
          <View style={styles.modalContainer}>
            <RadioButton.Group
              onValueChange={newValue => {
                setSelectedItem(newValue);
                setShowDropDown(false);
              }}
              value={selectedItem}>
              {dropdown.map((dropdownItem, index) => (
                <View key={index} style={styles.dropdownItem}>
                  <RadioButton value={dropdownItem} color={'black'} />
                  <Text style={styles.dropdownItemText}>{dropdownItem}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>
        </Pressable>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 10,
    borderBottomColor: 'gray',
    borderWidth: 1,
    borderColor: 'black',
    width: 380,
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    // marginRight: 10,
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
    alignItems: 'center',
    paddingLeft: 10,
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

export default CartItem;
