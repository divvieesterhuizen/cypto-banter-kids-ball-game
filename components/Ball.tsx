import React, { FC } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import { BallProps } from "../types";

const Ball: FC<BallProps> = ({ ballSize }) => {
  return <Text>Ball with size: {ballSize}</Text>;
};

export default Ball;
