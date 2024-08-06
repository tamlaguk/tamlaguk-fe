import React, { useState, useEffect, useRef } from 'react';
import Header from "../components/header.js";
import styled, { keyframes } from 'styled-components';
import ReviewImage from "../images/reviewbase.png";
import NextImage from "../images/next.png";
import TypewriterText from '../components/typewriter';
import ExampleAudio from '../images/예시.m4a';

const ReviewPage = () => {
  const [placeName, setPlaceName] = useState('');
  const [text, setText] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [showButton, setShowButton] = useState(true);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const audioRef = useRef(null);

  const mockData = [
    {
      name: "서울타워",
      text: "강아지 귀여워 귀여운건 힐링 힐링은 좋아",
      audio: ExampleAudio
    },
    {
      name: "경복궁",
      text: "궁전의 아름다움, 역사의 숨결을 느끼다",
      audio: ExampleAudio
    },
    {
      name: "한강공원",
      text: "도시 속 자연, 휴식과 힐링의 공간",
      audio: ExampleAudio
    }
  ];

  const fetchData = async () => {
    const randomIndex = Math.floor(Math.random() * mockData.length);
    const data = mockData[randomIndex];

    setPlaceName(data.name);
    setText(data.text);
    setAudioSrc(data.audio);
  };

  const handleButtonClick = () => {
    setShowButton(false);
    setShowSearchButton(true);
    fetchData().then(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    });
  };

  const handleSearchClick = () => {
    const kakaoUrl = `https://map.kakao.com/?q=${encodeURIComponent(placeName)}`;
    window.location.href = kakaoUrl;
  };

  const handleNextClick = async () => {
    await fetchData();
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <Container>
      <Header showBackButton={true} />
      <BackgroundContainer>
        <BackgroundImage src={ReviewImage} alt="background" />
        <Overlay />
        <NextButton src={NextImage} alt="next" onClick={handleNextClick} />
        <TextContainer>
          <TypewriterText fullText={text} />
        </TextContainer>
        {showSearchButton && (
          <SearchButtonContainer>
            <SearchButton onClick={handleSearchClick}>
              {placeName} 바로가기
            </SearchButton>
          </SearchButtonContainer>
        )}
        {showButton && (
          <ButtonOverlay>
            <ConfirmButton onClick={handleButtonClick}>시작하기!</ConfirmButton>
          </ButtonOverlay>
        )}
      </BackgroundContainer>
      <audio ref={audioRef} src={audioSrc} />
    </Container>
  );
};

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

const BackgroundContainer = styled.div`
  position: relative;
  width: 390px;
  height: 781px;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const TextContainer = styled.div`
  position: absolute;
  width: 190px;
  height: 210px;
  top: calc(50% - 200px);
  left: calc(50% - 90px);
  padding: 10px;
  box-sizing: border-box;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchButtonContainer = styled.div`
  position: absolute;
  top: calc(50% + 180px);
  left: calc(50% - 130px);
  display: flex;
  justify-content: center;
  width: 260px;
  z-index: 4;
`;

const SearchButton = styled.button`
  width: 100%;
  height: 50px;
  padding: 8px 16px;
  background-color: #fff;
  color: black;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 20px;
`;

const NextButton = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  cursor: pointer;
  z-index: 2;
`;

const ButtonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const ConfirmButton = styled.button`
  padding: 15px 30px;
  background-color: #FCD354;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 18px;
  z-index: 4;
  animation: ${bounce} 1s infinite;
`;

export default ReviewPage;
