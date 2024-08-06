import React from "react";
import Header from "../components/header"; // Header 컴포넌트의 경로 수정
import styled from "styled-components";
import Smallticket from "../images/ticketSmall.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tabbar from "../components/tabbar.js";

const categories = [
  { label: "무료", value: "무료" },
  { label: "유료", value: "유료" },
];

const TourPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = async (category) => {
    try {
      const response = await axios.get(`http://localhost:8081/place-review?category=${category}`);
      console.log("Response data:", response.data); // 응답 데이터 콘솔에 출력
      const filteredData = response.data;
      navigate("/review", { state: { data: filteredData, type: "tour" } });
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

export default TourPage;

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
  height: 781px;
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
  margin: 10px 0;
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
  height: 200px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const TicketText = styled.span`
  position: absolute;
  font-size: 40px;
  right: 50px;
  top: 60px;
  color: #154d78;
`;
