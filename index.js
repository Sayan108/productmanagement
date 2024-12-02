/**
 * @format
 */
import {store, persistor} from './src/redux';
import {AppRegistry, Image, View, StyleSheet} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ActivityIndicator} from 'react-native-paper';
import {PaperProvider, Text} from 'react-native-paper';
// import {theme} from './src/theme/theme';

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate
      loading={
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      }
      persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // You can set a background color if needed
  },
  logo: {
    width: 200, // Adjust to your logo size
    height: 50, // Adjust to your logo size
    marginBottom: 20,
  },
});
