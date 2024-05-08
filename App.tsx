import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from "react-native";

import Ball from './components/Ball';

const App = () => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const ballSize = screenWidth * 0.3;

  return (
    <View style={styles.container}>
      <Ball ballSize={ballSize} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
