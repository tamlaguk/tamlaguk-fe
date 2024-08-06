import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import homeImage from "../images/home.png";
import personImage from "../images/person.png";
import reviewImage from "../images/review.png";

const Tabbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/main");
  };
  const handleReviewClick = () => {
    navigate("/uploadReview");
  };
  const handlePersonClick = () => {
    navigate("/user");
  };

  return (
    <Container>
      <ButtonWrap>
        <Button onClick={handleReviewClick}>
          <img src={reviewImage} alt="리뷰하러가기 버튼" />
        </Button>
        <Button onClick={handleHomeClick}>
          <img src={homeImage} alt="홈 버튼" />
        </Button>
        <Button onClick={handlePersonClick}>
          <img src={personImage} alt="마이리뷰가기 버튼" />
        </Button>
      </ButtonWrap>
    </Container>
  );
};
export default Tabbar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonWrap = styled.div`
  width: 370px;
  display: flex;
  justify-content: space-evenly;
  background-color: #e3ecf1;
  padding: 10px;
`;

const Button = styled.div`
  img {
    width: 30px;
  }
`;
