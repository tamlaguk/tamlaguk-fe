import React from "react";
import styled, { keyframes } from "styled-components";
import KakaoLogin from "react-kakao-login";
import BaseImage from "../images/base2.png";
import Airplanin from "../images/airplain.png";
import Kakaologin from "../images/kakaologin.png";

const LoginPage = () => {
  const handleKakaoLoginSuccess = (response) => {
    console.log(response);
    const { profile, access_token } = response;
    console.log("사용자 프로필: ", profile);
    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem("kakao_token", access_token);
    // /main 페이지로 이동
    window.location.href = "/main";
  };

  const handleKakaoLoginFailure = (error) => {
    console.error(error);
    alert("로그인에 실패했습니다!");
  };

  console.log("Kakao JS Key: ", process.env.REACT_APP_KAKAO_JS_KEY); // 디버깅 코드 추가

  return (
    <Container>
      <BackgroundImage src={BaseImage} alt="background" />
      <AirplaneImage src={Airplanin} alt="airplane" />
      <LoginButtonWrapper>
        <KakaoButton
          token={process.env.REACT_APP_KAKAO_JS_KEY} // 환경 변수 사용
          onSuccess={handleKakaoLoginSuccess}
          onFailure={handleKakaoLoginFailure}
          buttonText="카카오로 로그인"
          style={{ border: "none", background: "none", padding: 0 }}
        >
          <KakaoImage src={Kakaologin} alt="kakao login" />
        </KakaoButton>
      </LoginButtonWrapper>
    </Container>
  );
};

export default LoginPage;

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
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  height: 100%;
  object-fit: cover;
`;

const AirplaneImage = styled.img`
  position: absolute;
  width: 200px;
  height: auto;
  transform: translate(-50%, -50%);
  animation: ${bounce} 2s infinite;
`;

const LoginButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 200px;
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
