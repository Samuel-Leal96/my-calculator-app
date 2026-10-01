import { Text, type TextProps } from "react-native";
import { gloobalStyles } from "../styles/global-styles";

interface Props extends TextProps {
  variant?: "h1" | "h2";
}

const CustomText = ({ children, variant = "h1", ...rest }: Props) => {
  return (
    <Text
      style={[
        { color: "white" },
        variant === "h1" && gloobalStyles.mainResult,
        variant === "h2" && gloobalStyles.subResult,
      ]}
      numberOfLines={1}
      adjustsFontSizeToFit
      {...rest}
    >
      {children}
    </Text>
  );
};

export default CustomText;
