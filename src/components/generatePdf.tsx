import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {Button} from 'react-native-paper';

// import * as sok from '../assets/images/logo.jpg'

function GeneratePDF() {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const {currentOrder} = useSelector((state: RootState) => state.order);

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      const html = `<html>
  <head>
    <style>
      body {
        font-family: 'Helvetica';
        font-size: 12px;
        position: relative;
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
      }
      body::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
     
        background-size: cover;
        background-position: center;
        opacity: 0.25;
        z-index: -1;
      }
      header, footer {
        height: 50px;
        background-color: #fff;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
      }
      header img {
        height: 100%;
        margin-right: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
      }
      th, td {
        border: 1px solid #000;
        padding: 5px;
      }
      th {
        background-color: #ccc;
      }
    </style>
  </head>
  <body>
    <header>
    <div><img src="https://imgs.search.brave.com/5-Z9EXmHZ88cesnv9dPacOdU7FNG-66hkhVgTVh-yro/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtd2l4bXAtZWQz/MGE4NmI4YzRjYTg4/Nzc3MzU5NGMyLndp/eG1wLmNvbS9pLzk1/OTY1MTkxLWZkOWIt/NDNiZC1iMzJhLTFh/MDBlNTViMGUwMi9k/MnBnczZhLTgwMDZi/ZjI2LTJmMTEtNDE1/OC1iOWExLWQwMjQ2/ODhiODQzMy5qcGc"  alt="Company Logo"></div>
      <h1>Invoice for Order #${currentOrder.id.substring(0, 6)}</h1>
    </header>
    <h1>Order Summary</h1>
    <table>
      <tr>
        <th>Order ID</th>
        <td>${currentOrder.id.substring(0, 6)}</td> 
      </tr>
      <tr>
        <th>Order Date</th>
        <td>${
          currentOrder?.orderDate
            ? currentOrder?.orderDate
            : new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
        }</td>
      </tr>
      <tr></tr>
      <tr>
        <th>Order Total</th>
        <td>₹${(
          parseFloat(currentOrder.totalAmount) +
          parseFloat(currentOrder.totalAmount) * 0.18
        ).toFixed(2)}</td>
      </tr>
    </table>
    <h1>Order Details</h1>
    <table>
      <tr>
        <th>Product ID</th>
        <th>Product Name</th>
        <th>Product Qty</th>
        <th>Product Price</th>
      </tr>
      ${currentOrder.items
        .map(
          line => `
        <tr>
          <td>${line.id.substring(0, 6)}</td>
          <td>${line.productName}</td>
          <td>${line.count}</td>
          <td>₹ ${line.totalPrice}</td>
        </tr>
      `,
        )
        .join('')}
      <tr></tr>
    </table>
    <h1>Price Summary</h1>
    <table>
      <tr></tr>
      <tr>
        <td>Sub Total</td>
        <td>₹${parseFloat(currentOrder.totalAmount)}</td>
      </tr>
      <tr>
        <td>Tax</td>
        <td>₹${(parseFloat(currentOrder.totalAmount) * 0.18).toFixed(2)}</td>
      </tr>
      <tr>
        <td>Total</td>
        <td>₹${(
          parseFloat(currentOrder.totalAmount) +
          parseFloat(currentOrder.totalAmount) * 0.18
        ).toFixed(2)}</td>
      </tr>
      <tr></tr>
    </table>
  
  </body>
</html>
`;
      const options = {
        html,
        fileName: `INVOICE-${currentOrder.id.substring(0, 6).toUpperCase()}`,
        directory: 'Invoices',
      };
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF saved to ${file.filePath}`);

      setIsLoading(false);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Button mode="contained" onPress={() => generatePDF()}>
      <Text style={styles.text}>
        {isLoading ? 'Generating...' : 'Generate PDF'}
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  button: {
    height: 'auto',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
});

export default GeneratePDF;
