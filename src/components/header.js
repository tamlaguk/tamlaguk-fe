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
  width: 390px;
  height: 63px;
  background-color: #E3ECF1;
  padding: 0 10px;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 5px;
  img {
    width: 20px; /* 버튼 크기에 맞게 조절 */
    height: 20px;
  }
`;

const Logo = styled.img`
  height: 40px; /* 로고 크기에 맞게 조절 */
  margin-left: 8px;
`;
