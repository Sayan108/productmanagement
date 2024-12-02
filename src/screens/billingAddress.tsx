import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import HelperText from '../components/helperText';
import Layout from '../components/layOut';
import {useDispatch} from 'react-redux';
import {clearCart} from '../redux/silces/cart.slice';

const AddBillingAddress = ({navigation}: {navigation: any}) => {
  const [appointmentDetails, setAppointmentDetails] = useState<any>({});
  const [touchedFields, setTouchedFields] = useState<any>({});
  const dispatch = useDispatch();

  const handleNavigation = () => {
    navigation.navigate('cart');
  };

  const handleBlur = (field: string) => {
    setTouchedFields({...touchedFields, [field]: true});
  };

  return (
    <Layout navigation={handleNavigation} headerText="Add billing address">
      <ScrollView>
        <TextInput
          maxLength={50}
          autoFocus
          value={appointmentDetails?.fullname}
          label="Full name"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, fullname: text});
          }}
          onBlur={() => handleBlur('fullname')}
          style={styles.input}
          placeholder="John Doe"
          placeholderTextColor="gray"
          activeOutlineColor="red"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.fullname && !appointmentDetails?.fullname}
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={10}
          value={appointmentDetails?.patientPhone}
          label="Phone"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, patientPhone: text});
          }}
          onBlur={() => handleBlur('patientPhone')}
          style={styles.input}
          placeholder="1234567890"
          placeholderTextColor="gray"
          keyboardType="phone-pad"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.patientPhone && !appointmentDetails?.patientPhone}
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={200}
          value={appointmentDetails?.addressOne}
          label="Address 1"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, addressOne: text});
          }}
          onBlur={() => handleBlur('addressOne')}
          style={styles.input}
          placeholder="Address line 1"
          placeholderTextColor="gray"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.addressOne && !appointmentDetails?.addressOne}
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={100}
          value={appointmentDetails?.addressTwo}
          label="Address 2"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, addressTwo: text});
          }}
          onBlur={() => handleBlur('addressTwo')}
          style={styles.input}
          placeholder="Address line 2"
          placeholderTextColor="gray"
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={100}
          value={appointmentDetails?.city}
          label="City"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, city: text});
          }}
          onBlur={() => handleBlur('city')}
          style={styles.input}
          placeholder="Kolkata"
          placeholderTextColor="gray"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.city && !appointmentDetails?.city}
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={6}
          value={appointmentDetails?.pinCode}
          label="PIN code"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, pinCode: text});
          }}
          onBlur={() => handleBlur('pinCode')}
          style={styles.input}
          placeholder="700001"
          placeholderTextColor="gray"
          keyboardType="phone-pad"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.pinCode && !appointmentDetails?.pinCode}
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={100}
          value={appointmentDetails?.state}
          label="State"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, state: text});
          }}
          onBlur={() => handleBlur('state')}
          style={styles.input}
          placeholder="West Bengal"
          placeholderTextColor="gray"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.state && !appointmentDetails?.state}
        />

        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('billingscreen');
            dispatch(clearCart());
          }}
          style={styles.button}
          labelStyle={styles.buttonLabel}>
          Next
        </Button>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
    backgroundColor: 'white',
  },
  button: {
    alignSelf: 'center',
    marginTop: 24,
    width: '80%',
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddBillingAddress;
