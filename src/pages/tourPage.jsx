import React from 'react';
import Header from '../components/header';
import styled from 'styled-components';

const TourPage = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export default TourPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;