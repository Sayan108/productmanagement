import {View, Text, ScrollView, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import CartItem from '../components/cartItem';
import {Button, Modal, TextInput} from 'react-native-paper';
import Layout from '../components/layOut';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import {addNewOrderInList, setCurrentOrder} from '../redux/silces/order.slice';
import {
  addNewCartInList,
  clearCurrentCart,
  removeCartItem,
  setCurrentCart,
  setInitialCurrentCart,
} from '../redux/silces/cart.slice';
import {ICart, cartInitialState} from '../redux/redux.constants';
// Correct import for Pressable

const Cartpage = ({navigation, route}: {navigation: any; route: any}) => {
  const {id = -1} = route.params;
  const [showDropDown, setShowDropDown] = useState(false);
  const [draftName, setDraftName] = useState('');
  const dispatch = useDispatch();
  const {currentCart} = useSelector((state: RootState) => state.cart);

  const handleNavigation = () => {
    navigation.navigate(id === -1 ? 'subproduct' : 'home', {id: 1});
  };

  return (
    <Layout navigation={handleNavigation} headerText="Cart page">
      {currentCart.items.length === 0 ? (
        <Text>No cart item found</Text>
      ) : (
        <ScrollView>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            {currentCart?.items?.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <CartItem item={item} />
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              mode="contained"
              onPress={() => {
                dispatch(addNewOrderInList(currentCart));
                dispatch(setCurrentOrder(currentCart));
                dispatch(removeCartItem(currentCart));
                dispatch(clearCurrentCart(cartInitialState.currentCart));
                navigation.navigate('billingaddress');
              }}>
              {'Confirm order'}
            </Button>

            <Button
              style={styles.button}
              mode="outlined"
              onPress={() => setShowDropDown(true)}>
              {'Save as draft'}
            </Button>
          </View>

          <Modal
            visible={showDropDown}
            onDismiss={() => setShowDropDown(false)}
            contentContainerStyle={styles.modalContainer}>
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowDropDown(false)}
            />
            <View style={styles.modalContent}>
              <TextInput
                maxLength={50}
                autoFocus
                value={draftName}
                label="Draft name"
                mode="outlined"
                onChangeText={(text: string) => setDraftName(text)}
                placeholder="Draft one"
                placeholderTextColor="gray"
                activeOutlineColor="red"
                style={styles.textInput}
              />
              <Button
                mode="contained"
                onPress={() => {
                  setShowDropDown(false);
                  const newObj: ICart = {...currentCart, cartName: draftName};
                  dispatch(addNewCartInList(newObj));
                  dispatch(setInitialCurrentCart(cartInitialState.currentCart));

                  navigation.navigate('home', {id: 1});
                }}
                style={styles.saveButton}>
                Save
              </Button>
            </View>
          </Modal>
        </ScrollView>
      )}
    </Layout>
  );
};

export default Cartpage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  cartItem: {
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    width: '80%',
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  textInput: {
    width: '100%',
    marginBottom: 20,
  },
  saveButton: {
    width: '100%',
  },
});
