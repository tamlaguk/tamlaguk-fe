import React, { useState, useEffect } from 'react';
import Header from "../components/header.js";
import styled from 'styled-components';
import ReviewImage from "../images/reviewbase.png";
import NextImage from "../images/next.png";
import TypewriterText from '../components/typewriter';

const ReviewPage = () => {
  const [placeName, setPlaceName] = useState('');
  const [text, setText] = useState('');

  const fetchPlaceName = async () => {
    // 여기서 실제 API 호출을 통해 데이터를 받아옵니다.
    const name = "서울타워"; // 예시 데이터
    setPlaceName(name);
  };

  const fetchText = async () => {
    // 여기서 실제 API 호출을 통해 데이터를 받아옵니다.
    const fetchedText = "강아지 귀여워 귀여운건 힐링 힐링은 좋아"; // 예시 데이터
    setText(fetchedText);
  };

  useEffect(() => {
    fetchPlaceName();
    fetchText();
  }, []);

  const handleSearchClick = () => {
    const kakaoUrl = `https://map.kakao.com/?q=${encodeURIComponent(placeName)}`;
    window.location.href = kakaoUrl;
  };

  const handleNextClick = async () => {
    await fetchPlaceName(); // 새로운 이름과 텍스트를 받아오는 로직
    await fetchText();
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
        <SearchButtonContainer>
          <SearchButton onClick={handleSearchClick}>
            {placeName} 검색하기
          </SearchButton>
        </SearchButtonContainer>
      </BackgroundContainer>
    </Container>
  );
};

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
  top: 0; /* 상단에 위치하도록 수정 */
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /* 투명도 20%의 검은색 */
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
  z-index: 3; 
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
  z-index: 4; 
`;

const NextButton = styled.img`
  position: absolute;
  top: 50%;
  right: 10px; /* 오른쪽에 10px 간격 */
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  width: 35px; /* 적절한 크기로 조절 */
  height: 35px; /* 적절한 크기로 조절 */
  cursor: pointer;
  z-index: 2; /* Overlay와 같은 z-index 설정 */
`;

export default ReviewPage;
