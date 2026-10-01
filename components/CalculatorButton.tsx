import { Colors } from "@/constants/Colors";
import { Pressable, Text } from "react-native";
import { gloobalStyles } from "../styles/global-styles";

import * as Haptics from "expo-haptics";

interface Props {
  label: string;
  color?: string;
  blackText?: boolean;
  doubleSize?: boolean;
  onPress: () => void;
}

const CalculatorButton = ({
  label,
  color = Colors.darkGray,
  blackText = false,
  doubleSize = false,
  onPress,
}: Props) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        ...gloobalStyles.button,
        backgroundColor: color,
        opacity: pressed ? 0.8 : 1,
        width: doubleSize ? 180 : 80,
      })}
      onPress={() => {
        Haptics.selectionAsync();

        onPress();
      }}
    >
      <Text
        style={{
          ...gloobalStyles.buttonText,
          color: blackText ? Colors.black : Colors.textPrimary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default CalculatorButton;
