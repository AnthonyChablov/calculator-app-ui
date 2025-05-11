import Container from "../Layout/Separator/Container/Container";
import Header from "./components/Header/Header";
import Display from "./components/Display/Display";
import Separator from "../Layout/Separator/Separator";
import ButtonGrid from "./components/Buttons/ButtonGrid";
import useCalculator from "./hooks/useCalculator";

const Calculator = () => {
  const { expression, handleButtonClick, handleReset } = useCalculator();

  return (
    <>
      <Container className="py-10 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 ">
        <Header />
        <Separator size="small" />
        <Display value={expression} />
        <Separator size="medium" />
        <ButtonGrid onButtonClick={handleButtonClick} resetGrid={handleReset} />
      </Container>
    </>
  );
};

export default Calculator;
