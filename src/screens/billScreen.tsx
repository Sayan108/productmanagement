import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, DataTable, Text} from 'react-native-paper';
import Layout from '../components/layOut';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import GeneratePDF from '../components/generatePdf';

const TableExample = ({navigation, route}: {navigation: any; route: any}) => {
  const {currentOrder} = useSelector((state: RootState) => state.order);
  const {id} = route.params;

  const handleNavigation = () => {
    navigation.navigate('home');
  };

  return (
    <Layout headerText="Order details" navigation={handleNavigation}>
      <View>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{flex: 9, justifyContent: 'flex-start'}}>
              Item
            </DataTable.Title>
            <DataTable.Title style={{flex: 1, justifyContent: 'flex-end'}}>
              Price
            </DataTable.Title>
          </DataTable.Header>

          {currentOrder.items.map(item => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell
                style={{
                  flex: 7,
                  justifyContent: 'flex-start',
                }}>
                <Text numberOfLines={2} ellipsizeMode="tail">
                  {item.productName} X {item.count}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 3, justifyContent: 'flex-end'}}>
                ₹ {item.totalPrice}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Row>
            <DataTable.Cell style={{flex: 7, justifyContent: 'flex-start'}}>
              {'Item price'}
            </DataTable.Cell>
            <DataTable.Cell style={{flex: 3, justifyContent: 'flex-end'}}>
              ₹ {currentOrder.totalAmount}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={{flex: 7, justifyContent: 'flex-start'}}>
              {'Tax'}
            </DataTable.Cell>
            <DataTable.Cell style={{flex: 3, justifyContent: 'flex-end'}}>
              ₹ {(parseFloat(currentOrder.totalAmount) * 0.18).toFixed()}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={{flex: 7, justifyContent: 'flex-start'}}>
              {'Total price'}
            </DataTable.Cell>
            <DataTable.Cell style={{flex: 3, justifyContent: 'flex-end'}}>
              ₹{' '}
              {(
                parseFloat(currentOrder.totalAmount) +
                parseFloat(currentOrder.totalAmount) * 0.18
              ).toFixed(2)}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <View style={{padding: 15}}>
          <Text style={styles.billingAddressTitle}>Billing Address</Text>
          <Text style={styles.billingAddressText}>
            {currentOrder.billingAddress}
          </Text>
        </View>
        <View style={{padding: 15}}>
          <GeneratePDF />
        </View>
      </View>
    </Layout>
  );
};

export default TableExample;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  billingAddressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  billingAddressText: {
    fontSize: 16,
    marginTop: 5,
  },
});
