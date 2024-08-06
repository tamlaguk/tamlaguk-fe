import React, { useEffect, useState } from 'react';
import Header from '../components/header'; // Header 컴포넌트의 경로 수정
import styled from 'styled-components';
import Tabbar from "../components/tabbar.js";

const mockReviews = [
  {
    id: 1,
    restaurantName: '한식당',
    text: '주차장이 넓고 반찬이 깔끔해요!',
    audio: 'https://www.example.com/audio1.m4a'
  },
  {
    id: 2,
    restaurantName: '해녀서핑',
    text: '해녀가 직접 알려주는 서핑보드! 빠져도 안다치게 잡아줘요!.',
    audio: 'https://www.example.com/audio2.m4a'
  },
  {
    id: 3,
    restaurantName: '한라산',
    text: '더운날 올라가려니 너무 힘드네요 ㅠㅠ.',
    audio: 'https://www.example.com/audio3.m4a'
  }
];

const UserPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token'); // 토큰을 localStorage에서 가져옴
        // 실제 API 호출을 주석 처리하고 목 데이터를 사용합니다.
        // const response = await axios.get('/user-reviews', {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });
        // setReviews(response.data);

        // 목 데이터를 사용하여 리뷰 설정
        setReviews(mockReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
    <Container>
      <Header showBackButton={true} />
      <Content>
        <Title>작성한 리뷰보기</Title>
        {reviews.length > 0 ? (
          <ReviewList>
            {reviews.map((review) => (
              <ReviewItem key={review.id}>
                <RestaurantName>{review.restaurantName}</RestaurantName>
                <ReviewText>{review.text}</ReviewText>
                {review.audio && (
                  <AudioPlayer controls>
                    <source src={review.audio} type="audio/m4a" />
                    Your browser does not support the audio element.
                  </AudioPlayer>
                )}
              </ReviewItem>
            ))}
          </ReviewList>
        ) : (
          <NoReviews>작성한 리뷰가 없습니다. 등록해 주세요!</NoReviews>
        )}
      </Content>
    </Container>
    <Tabbar/>
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
  background-color: #E3ECF1;
  width: 390px;
`;


const Title = styled.h1`
  font-size: 20px;
  color: #154D78;
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
  color: #666;
`;
