import React, { useEffect, useState } from "react";
import Header from "../components/header"; // Header 컴포넌트의 경로 수정
import styled from "styled-components";
import axios from "axios";
import Tabbar from "../components/tabbar";

const UserPage = ({ userId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token"); // 토큰을 localStorage에서 가져옴
        const response = await axios.get(
          `http://localhost:8081/${userId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [userId]);

  return (
    <>
      <Container>
        <Header showBackButton={true} />
        <Content>
          <Title>작성한 리뷰보기</Title>
          {reviews.length > 0 ? (
            <ReviewList>
              {reviews.map((review) => (
                <ReviewItem key={review.foodReviewld || review.placeReviewld}>
                  <RestaurantName>
                    {review.foodStoreName || review.placeStoreName}
                  </RestaurantName>
                  <ReviewText>{review.textContent}</ReviewText>
                  {review.voiceContentUrl && (
                    <AudioPlayer controls>
                      <source src={review.voiceContentUrl} type="audio/m4a" />
                      Your browser does not support the audio element.
                    </AudioPlayer>
                  )}
                </ReviewItem>
              ))}
            </ReviewList>
          ) : (
            <NoReviews>작성한 리뷰가 없습니다.</NoReviews>
          )}
        </Content>
      </Container>
      <Tabbar />
    </>
  );
};

export default UserPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Content = styled.div`
  padding-top: 70px; /* 헤더 아래에 여백 추가 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e3ecf1;
  width: 390px;
`;

const Title = styled.h1`
  font-size: 20px;
  color: #154d78;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewItem = styled.div`
  background: #f8f9fa;
  width: 330px;
  padding: 20px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RestaurantName = styled.h2`
  margin: 0 0 10px;
  font-size: 1.5em;
  color: #333;
`;

const ReviewText = styled.p`
  margin: 0 0 10px;
  font-size: 1em;
  color: #666;
`;

const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 10px;
`;

const NoReviews = styled.p`
  font-size: 1.2em;
  height: 662px;
  color: #666;
`;
