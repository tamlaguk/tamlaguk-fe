import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header.js";
import styled, { keyframes } from "styled-components";
import BaseImage from "../images/baseBig.png";
import Cloud from "../images/cloud.png";
import Tabbar from "../components/tabbar.js";

const MainPage = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <Container>
        <Header />
        <ImageWrapper>
          <Image src={BaseImage} alt="Base Image" />
          <CloudWrapper
            style={{ top: "20%", left: "9%" }}
            onClick={() => navigateTo("/food")}
          >
            <CloudImage src={Cloud} alt="Cloud Image" />
            <CloudText>식당</CloudText>
          </CloudWrapper>
          <CloudWrapper
            style={{ top: "8%", left: "56%" }}
            onClick={() => navigateTo("/leisure")}
          >
            <CloudImage src={Cloud} alt="Cloud Image" />
            <CloudText>레저</CloudText>
          </CloudWrapper>
          <CloudWrapper
            style={{ top: "43%", left: "65%" }}
            onClick={() => navigateTo("/tour")}
          >
            <CloudImage src={Cloud} alt="Cloud Image" />
            <CloudText>관광</CloudText>
          </CloudWrapper>
        </ImageWrapper>
        <Tabbar />
      </Container>
    </>
  );
};

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 781px;
`;

const Image = styled.img`
  width: 390px;
  height: auto;
`;

const CloudWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    animation: ${bounce} 2s infinite;
  }
`;

const CloudImage = styled.img`
  width: 130px;
  height: auto;
`;

const CloudText = styled.div`
  position: absolute;
  top: 60%;
  left: 53%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
  color: #57727f;
`;
export default MainPage;
