import { StyleSheet, View } from "react-native";

import Ball from "./components/Ball";

const App = () => {
  return (
    <View style={styles.container}>
      <Ball />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
