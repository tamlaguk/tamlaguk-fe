import Header from "../components/header.js";
import styled from 'styled-components';

const MainPage = () => {
  return (
    <Container>
      <Header/>
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export default MainPage;