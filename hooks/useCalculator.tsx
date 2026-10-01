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
  };

  const toggleSign = () => {
    if (number === "0") return;

    if (number.startsWith("-")) {
      setNumber(number.substring(1));
    } else {
      setNumber("-" + number);
    }
  };

  const deleteLastNumber = () => {
    // calculateResult();

    // let currentSign = "";
    // let temporalNumber = number;

    // if (formula.split(" ").length > 1) {
    //   setFormula(formula.slice(0, -1));
    // } else {
    //   if (number.includes("-")) {
    //     currentSign = "-";
    //     temporalNumber = number.substring(1);
    //   }

    //   if (temporalNumber.length > 1) {
    //     return setNumber(currentSign + temporalNumber.slice(0, -1));
    //   } else {
    //     setNumber("0");
    //   }
    // }

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

    lastOperation.current = undefined;
    setPrevNumber("0");

    console.log({ result });

    console.log({ formula });
  };

  const buildNumber = (numberString: string) => {
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
