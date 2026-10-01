import { useEffect, useRef, useState } from "react";

enum Operator {
  add = "+",
  subtract = "-",
  multiply = "*",
  divide = "÷",
}

export const useCalculator = () => {
  const [formula, setFormula] = useState("");

  const [number, setNumber] = useState("0");
  const [prevNumber, setPrevNumber] = useState("0");

  const lastOperation = useRef<Operator>(undefined);
  const isResultCalculated = useRef<boolean>(false);

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(" ").at(0);

      if (number === "0") {
        setFormula(`${firstFormulaPart} ${lastOperation.current}`);
      } else {
        setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
      }
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPrevNumber(subResult.toString());
  }, [formula]);

  const clean = () => {
    setNumber("0");
    setPrevNumber("0");
    setFormula("0");
    lastOperation.current = undefined;
    isResultCalculated.current = false;
  };

  const toggleSign = () => {
    isResultCalculated.current = false;
    if (number === "0") return;

    if (number.startsWith("-")) {
      setNumber(number.substring(1));
    } else {
      setNumber("-" + number);
    }
  };

  const deleteLastNumber = () => {
    isResultCalculated.current = false;
    // Caso 1: Si estamos parados en el operador (ej. "80 *") y el segundo número es "0", borramos el operador
    if (lastOperation.current && number === "0") {
      const firstFormulaPart = formula.split(" ").at(0) || "0";
      lastOperation.current = undefined;
      setFormula(firstFormulaPart);
      setNumber(firstFormulaPart);
      setPrevNumber("0");
      return;
    }

    // Caso 2: Borrado normal de dígitos en el número actual
    let currentSign = "";
    let temporalNumber = number;

    if (number.includes("-")) {
      currentSign = "-";
      temporalNumber = number.substring(1);
    }

    if (temporalNumber.length > 1) {
      return setNumber(currentSign + temporalNumber.slice(0, -1));
    }

    setNumber("0");
  };

  const setLastNumber = () => {
    // Calular resultado

    if (number.endsWith(".")) {
      setPrevNumber(number.slice(0, -1));
    }

    setPrevNumber(number);
    setNumber("0");
  };

  const changeOperation = (operator: Operator) => {
    isResultCalculated.current = false;

    if (lastOperation.current) {
      const firstFormulaPart = formula.split(" ").at(0);

      // Caso 1: Si el usuario aún no ha escrito el segundo número (number === "0")
      if (number === "0") {
        lastOperation.current = operator;
        setFormula(`${firstFormulaPart} ${operator}`);
      } else {
        // Caso 2: Si el usuario ya escribió un segundo número (ej. "42 + 5") y presiona otro operador
        const subResult = calculateSubResult();
        lastOperation.current = operator;
        setFormula(`${subResult} ${operator}`);
        setNumber("0");
      }
      return;
    }

    setLastNumber();
    lastOperation.current = operator;
    setFormula(`${formula} ${operator}`);
  };

  const divideOperation = () => {
    changeOperation(Operator.divide);
  };

  const multiplyOperation = () => {
    changeOperation(Operator.multiply);
  };

  const subtractOperation = () => {
    changeOperation(Operator.subtract);
  };

  const addOperation = () => {
    changeOperation(Operator.add);
  };

  const calculateSubResult = () => {
    const [firstNumber, operator, secondNumber] = formula.split(" ");

    const num1 = Number(firstNumber);
    const num2 = Number(secondNumber);

    if (isNaN(num2)) return num1;

    switch (lastOperation.current) {
      case Operator.add:
        return num1 + num2;
      case Operator.subtract:
        return num1 - num2;
      case Operator.multiply:
        return num1 * num2;
      case Operator.divide:
        return num1 / num2;
      default:
        throw new Error(`Operación ${operator} no reconocida`);
    }
  };

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(`${result}`);
    setNumber(`${result}`);

    lastOperation.current = undefined;
    setPrevNumber("0");
    isResultCalculated.current = true;
  };

  const buildNumber = (numberString: string) => {
    // Si se acaba de presionar "=" y se ingresa un nuevo número, se resetea todo para empezar una nueva operación
    if (isResultCalculated.current) {
      isResultCalculated.current = false;
      if (numberString === ".") {
        setNumber("0.");
        setFormula("0.");
        return;
      }
      setNumber(numberString);
      setFormula(numberString);
      return;
    }

    // Si recién seleccionamos el operador (ej. "10 -") y el usuario presiona "0"
    if (
      lastOperation.current &&
      formula.split(" ").length === 2 &&
      numberString === "0"
    ) {
      setFormula(`${formula} 0`);
      return;
    }

    // Verificar si ya existe el punto decimal
    if (number.includes(".") && numberString === ".") return;

    // Verificar si el número empieza con cero
    if (number.startsWith("0") || number.startsWith("-0")) {
      // Verificar si estamos escribiendo el punto decimal
      if (numberString === ".") {
        return setNumber(number + numberString);
      }

      // Verificar si es otro cero y no hay punto decimal
      if (numberString === "0" && number.includes(".")) {
        return setNumber(number + numberString);
      }

      // Evaluar si es diferente de cero, no hay punto decimal y el primer número es cero
      if (numberString !== "0" && !number.includes(".")) {
        return setNumber(numberString);
      }

      // Evitar el 0000.000
      if (numberString === "0" && !number.includes(".")) {
        return;
      }
    }

    return setNumber(number + numberString);
  };

  return {
    // Props
    formula,
    number,
    prevNumber,

    // Methods
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
  };
};
