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

const Ball: FC<BallProps> = ({}) => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const [isBallSizeSmall, setIsBallSizeSmall] = useState<boolean>(false);
  const ballSize = isBallSizeSmall ? screenWidth * 0.1 : screenWidth * 0.3;

  const positionX = useSharedValue(screenWidth / 2 - ballSize / 2);
  const positionY = useSharedValue(screenHeight / 2 - ballSize / 2);

  const handleToggleBallSize = () => {
    setIsBallSizeSmall(!isBallSizeSmall);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    width: ballSize,
    height: ballSize,
    borderRadius: ballSize / 2,
    backgroundColor: "#FF0000",
    position: "absolute",
    top: positionY.value,
    left: positionX.value,
  }));

  const moveBall = (event: { x: number; y: number; z: number }) => {
    positionX.value = Math.min(
      Math.max(positionX.value + event.y, 0),
      screenWidth - ballSize
    );
    positionY.value = Math.min(
      Math.max(positionY.value + event.x, 0),
      screenHeight - ballSize
    );
  };

  const moveButtonToCenterScreen = () => {
    positionX.value = screenWidth / 2 - ballSize / 2;
    positionY.value = screenHeight / 2 - ballSize / 2;
  };

  useEffect(() => {
    Gyroscope.setUpdateInterval(16);
    const subscription = Gyroscope.addListener((data) => {
      moveBall(data);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <Animated.View style={[animatedStyles]}></Animated.View>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleToggleBallSize}
        >
          <Text style={styles.buttonText}>Toggle Ball Size</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#016AAA" }]}
          onPress={moveButtonToCenterScreen}
        >
          <Text style={styles.buttonText}>Center Ball On Screen</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#015FFF",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Ball;
