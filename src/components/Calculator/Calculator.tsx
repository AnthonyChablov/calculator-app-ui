import Container from "../Layout/Separator/Container/Container";
import Header from "./components/Header/Header";
import Display from "./components/Display/Display";
import Separator from "../Layout/Separator/Separator";
import ButtonGrid from "./components/Buttons/ButtonGrid";
import useCalculator from "./hooks/useCalculator";

const Calculator = () => {
  const { expression, handleButtonClick, handleReset, onEvaluate } =
    useCalculator();

  return (
    <>
      <Container className="py-10 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 ">
        <Header />
        <Separator size="small" />
        <Display value={expression} />
        <Separator size="small" />
        <ButtonGrid
          onButtonClick={handleButtonClick}
          resetGrid={handleReset}
          onEvaluate={onEvaluate}
        />
      </Container>
    </>
  );
};

export default Calculator;
