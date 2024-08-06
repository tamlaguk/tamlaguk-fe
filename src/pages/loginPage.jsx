import React from 'react';
import styled from 'styled-components';
import KakaoLogin from 'react-kakao-login';
import Header from "../components/header.js";
import BaseImage from "../images/base.png";
import Kakaologin from "../images/kakaologin.png";

const LoginPage = () => {
  const handleKakaoLoginSuccess = (response) => {
    console.log(response);
    // 로그인 성공 후 처리할 로직을 추가하세요
  };

  const handleKakaoLoginFailure = (error) => {
    console.error(error);
    // 로그인 실패 시 처리할 로직을 추가하세요
  };

  return (
    <Container>
      <Header />
      <BackgroundImage src={BaseImage} alt="background" />
      <LoginButtonWrapper>
        <KakaoButton
          token="<YOUR_KAKAO_APP_KEY>"
          onSuccess={handleKakaoLoginSuccess}
          onFailure={handleKakaoLoginFailure}
          buttonText="카카오로 로그인"
          style={{ border: 'none', background: 'none', padding: 0 }}
        >
          <KakaoImage src={Kakaologin} alt="kakao login" />
        </KakaoButton>
      </LoginButtonWrapper>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  height: 100%;
  object-fit: cover;
`;

const LoginButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top:200px;
`;

const KakaoButton = styled(KakaoLogin)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KakaoImage = styled.img`
  width: 180px;
  height: auto;
`;
