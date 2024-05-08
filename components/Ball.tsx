import React, { FC, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Gyroscope } from "expo-sensors";

import { BallProps } from "../types";

const Ball: FC<BallProps> = ({  }) => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const [isBallSizeSmall, setIsBallSizeSmall] = useState<Boolean>(false);
  const ballSize = isBallSizeSmall ? screenWidth * 0.1 : screenWidth * 0.3;

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

   const handleToggleBallSize = () => {
     setIsBallSizeSmall(!isBallSizeSmall);
   };

   const animatedStyles = useAnimatedStyle(() => ({
     width: ballSize,
     height: ballSize,
     borderRadius: ballSize / 2,
     backgroundColor: "red",
     position: "absolute",
     top: positionY.value,
     left: positionX.value,
   }));



   return (
     <>
       <Animated.View style={[styles.box, animatedStyles]} />
       <View style={styles.container}>
         <Button onPress={handleToggleBallSize} title="Toggle Ball Size" />
       </View>
     </>
   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    marginVertical: 50,
  },
  // text: {
  //   textAlign: "center",
  // },
  // buttonContainer: {
  //   flexDirection: "row",
  //   alignItems: "stretch",
  //   marginTop: 15,
  // },
  // button: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#eee",
  //   padding: 10,
  // },
  // middleButton: {
  //   borderLeftWidth: 1,
  //   borderRightWidth: 1,
  //   borderColor: "#ccc",
  // },
});

export default Ball;
