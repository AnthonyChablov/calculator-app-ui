import Container from "../Layout/Separator/Container/Container";
import Header from "./Header/Header";
import Screen from "./Screen/Screen";
import Separator from "../Layout/Separator/Separator";

const Calculator = () => {
  return (
    <>
      <Container className="py-10 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 ">
        <Header />
        <Separator size="small" />
        <Screen />
        <Separator size="medium" />
      </Container>
    </>
  );
};

export default Calculator;
