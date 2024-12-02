import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EmptyPage from './emptyPage';

// Define the type for the order items
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

// Define the type for the component props
interface OrderListProps {
  orders: any[];
  onItemPress: (id: any) => void;
}

const Cartlist: React.FC<OrderListProps> = ({orders, onItemPress}) => {
  // console.log(orders, 'orders');
  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <EmptyPage text="No cart avilable!" />
      ) : (
        <>
          {orders.map(order => (
            <Pressable
              key={order.id}
              onPress={() => onItemPress(order)}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#e0e0e0' : '#ffffff',
                  transform: pressed ? [{scale: 0.98}] : [{scale: 1}],
                },
                styles.pressable,
              ]}>
              <View style={styles.row}>
                <Icon name="cart-outline" size={24} color="#4CAF50" />
                <Text style={styles.text}>
                  {order?.cartName ?? 'No name'} ₹ {order?.totalAmount}
                </Text>
              </View>
            </Pressable>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  pressable: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Cartlist;
