import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/homePage';
import Cartpage from './screens/cartPage';
import SubProductList from './components/subProducts';
import AddBillingAddress from './screens/billingAddress';
import BillScreen from './screens/billScreen';

const Routes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Group>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            initialParams={{id: 0}}
          />
          <Stack.Screen
            name="cart"
            component={Cartpage}
            initialParams={{id: -1}}
          />
          <Stack.Screen name="subproduct" component={SubProductList} />
          <Stack.Screen name="billingaddress" component={AddBillingAddress} />
          <Stack.Screen
            name="billingscreen"
            component={BillScreen}
            initialParams={{id: -1}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
