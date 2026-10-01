import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import CalculatorButton from "../../components/CalculatorButton";
import CustomText from "../../components/CustomText";
import { useCalculator } from "../../hooks/useCalculator";
import { gloobalStyles } from "../../styles/global-styles";

const CalculatorApp = () => {
  const {
    formula,
    prevNumber,
    buildNumber,
    clean,
    toggleSign,
    deleteLastNumber,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateSubResult,
    calculateResult,
  } = useCalculator();

  return (
    <View style={gloobalStyles.calculatorContainer}>
      {/* Resultados */}
      <CustomText variant="h1">{formula}</CustomText>

      {!formula.includes(" ") ? (
        <CustomText variant="h2"> </CustomText>
      ) : (
        <CustomText variant="h2">{prevNumber}</CustomText>
      )}

      {/* Filas de botones */}

      {/* Primera fila */}
      <View style={gloobalStyles.buttonRow}>
        <CalculatorButton
          label="C"
          blackText
          color={Colors.lightGray}
          onPress={clean}
        />
        <CalculatorButton
          label="+/-"
          blackText
          color={Colors.lightGray}
          onPress={toggleSign}
        />
        <CalculatorButton
          label="del"
          blackText
          color={Colors.lightGray}
          onPress={deleteLastNumber}
        />
        <CalculatorButton
          label="÷"
          color={Colors.orange}
          onPress={divideOperation}
        />
      </View>

      {/* Segunda fila */}
      <View style={gloobalStyles.buttonRow}>
        <CalculatorButton
          label="7"
          onPress={() => {
            buildNumber("7");
          }}
        />
        <CalculatorButton
          label="8"
          onPress={() => {
            buildNumber("8");
          }}
        />
        <CalculatorButton
          label="9"
          onPress={() => {
            buildNumber("9");
          }}
        />
        <CalculatorButton
          label="x"
          color={Colors.orange}
          onPress={multiplyOperation}
        />
      </View>

      {/* Tercera fila */}
      <View style={gloobalStyles.buttonRow}>
        <CalculatorButton
          label="4"
          onPress={() => {
            buildNumber("4");
          }}
        />
        <CalculatorButton
          label="5"
          onPress={() => {
            buildNumber("5");
          }}
        />
        <CalculatorButton
          label="6"
          onPress={() => {
            buildNumber("6");
          }}
        />
        <CalculatorButton
          label="-"
          color={Colors.orange}
          onPress={subtractOperation}
        />
      </View>

      {/* Cuarta fila */}
      <View style={gloobalStyles.buttonRow}>
        <CalculatorButton
          label="1"
          onPress={() => {
            buildNumber("1");
          }}
        />
        <CalculatorButton
          label="2"
          onPress={() => {
            buildNumber("2");
          }}
        />
        <CalculatorButton
          label="3"
          onPress={() => {
            buildNumber("3");
          }}
        />
        <CalculatorButton
          label="+"
          color={Colors.orange}
          onPress={addOperation}
        />
      </View>

      {/* Quinta fila */}
      <View style={gloobalStyles.buttonRow}>
        <CalculatorButton
          label="0"
          doubleSize
          onPress={() => {
            buildNumber("0");
          }}
        />
        <CalculatorButton
          label="."
          onPress={() => {
            buildNumber(".");
          }}
        />
        <CalculatorButton
          label="="
          color={Colors.orange}
          onPress={calculateResult}
        />
      </View>
    </View>
  );
};

export default CalculatorApp;
