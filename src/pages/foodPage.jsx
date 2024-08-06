import React from "react";
import Header from "../components/header"; // Header 컴포넌트의 경로 수정
import styled from "styled-components";
import Smallticket from "../images/ticketSmall.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tabbar from "../components/tabbar.js";

const categories = [
  { label: "한식", value: "korean" },
  { label: "일식", value: "japanese" },
  { label: "중식", value: "chinese" },
  { label: "양식", value: "western" },
  { label: "뷔페식", value: "buffet" },
];

const FoodPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = async (category) => {
    try {
      const response = await axios.get(`/food-review?category=${category}`);
      console.log("Response data:", response.data); // 응답 데이터 콘솔에 출력
      const filteredData = response.data;
      navigate("/review", { state: { data: filteredData } });
    } catch (error) {
      console.error("Error fetching data:", error); // 오류 콘솔에 출력
    }
  };

  return (
    <>
      <Container>
        <Header showBackButton={true} />
        <ImageColumn>
          {categories.map((category) => (
            <TicketButton
              key={category.value}
              onClick={() => handleButtonClick(category.value)}
            >
              <TicketImage src={Smallticket} alt={`${category.label} Ticket`} />
              <TicketText>{category.label}</TicketText>
            </TicketButton>
          ))}
        </ImageColumn>
      </Container>
      <Tabbar />
    </>
  );
};

export default FoodPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const ImageColumn = styled.div`
  display: flex;
  width: 390px;
  flex-direction: column;
  align-items: flex-end; /* 티켓을 오른쪽으로 정렬 */
  background-color: #e3ecf1; /* 배경색 설정 */
`;

const TicketButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: none;
  border: none;
  margin: 5px 0;
  cursor: pointer;
  padding: 0;
  transition: transform 0.3s;
  transform-origin: right;

  &:hover {
    transform: scale(1.05); /* 크기를 5% 키움 */
  }
`;

const TicketImage = styled.img`
  width: 340px;
  height: 160px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const TicketText = styled.span`
  position: absolute;
  font-size: 35px;
  right: 50px;
  top: 50px;
  color: #154d78;
`;
