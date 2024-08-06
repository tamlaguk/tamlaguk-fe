// Header.js
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logoImage from "../images/logo.png";
import backImage from "../images/back.png";

const Header = ({ showBackButton = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      {showBackButton && (
        <BackButton onClick={handleBackClick}>
          <img src={backImage} alt="뒤로가기 버튼" />
        </BackButton>
      )}
      <Logo src={logoImage} alt="로고" />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 390px;
  height: 63px;
  background-color: #f8f8f8;
  padding: 0 10px;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  img {
    width: 24px; /* 버튼 크기에 맞게 조절 */
    height: 24px;
  }
`;

const Logo = styled.img`
  width: auto;
  height: 40px; /* 로고 크기에 맞게 조절 */
  margin: 0 auto;
`;
