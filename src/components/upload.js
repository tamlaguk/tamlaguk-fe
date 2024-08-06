// search.js
import styled from "styled-components";
import Header from "./header";
import micImage from "../images/micicon.png";
import notRecordingImage from "../images/notRecording.png";
import recordingImage from "../images/Recording.png";
import stopvoiceImage from "../images/stopVoice.png"
import { useRef, useState,useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SearchModal = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [category, setCategory] = useState("맛집");
  const [inputValue, setInputValue] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef([]);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  const startRecording = async () => {
    // 기존 녹음 데이터 초기화
    setAudioUrl("");
    audioRef.current = [];
    setTimeLeft(15);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.start();

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioRef.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      audioRef.current = [];
    };

    setIsRecording(true);

    // 1초마다 남은 시간을 업데이트합니다.
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          stopRecording();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    clearInterval(timerRef.current);
  };

  const uploadAudio = async () => {
    if (audioUrl) {
      const audioBlob = await fetch(audioUrl).then((r) => r.blob());
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.wav");

      const uploadUrl = "";
      if (category === "맛집") {
        uploadUrl = "http://localhost:8081/food-review/";
      } else if (category === "레저") {
        uploadUrl = "http://localhost:8081/activity-review/";
      } else if (category === "관광지") {
        uploadUrl = "http://localhost:8081/place-review/";
      }
      try {
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("파일 업로드 완료");
        } else {
          console.error("파일 업로드 실패");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleConfirmClick = async () => {
    let uploadUrl = "";
    if (category === "맛집") {
      uploadUrl = "http://localhost:8081/food-review/";
    } else if (category === "레저") {
      uploadUrl = "http://localhost:8081/activity-review/";
    } else if (category === "관광지") {
      uploadUrl = "http://localhost:8081/place-review/";
    }

    try {
      const response = await fetch(uploadUrl, {
        method: "GET",
      });

      if (response.ok) {
        console.log("GET 요청 성공");
      } else {
        console.error("GET 요청 실패");
      }
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'ko' });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <Container>
      <Wrap>
        <CategoryButtons>
          <CategoryButton
            onClick={() => setCategory("맛집")}
            isActive={category === "맛집"}
          >
            맛집
          </CategoryButton>
          <CategoryButton
            onClick={() => setCategory("레저")}
            isActive={category === "레저"}
          >
            레저
          </CategoryButton>
          <CategoryButton
            onClick={() => setCategory("관광지")}
            isActive={category === "관광지"}
          >
            관광지
          </CategoryButton>
        </CategoryButtons>
        <SearchInputBox>
          {/* <a href="https://www.flaticon.com/kr/free-icons/" title="마이크 아이콘">마이크 아이콘 제작자: Kiranshastry - Flaticon</a> */}
          <MicContainer>
          <VoiceButton onClick={toggleListening}>
              <img src={listening ? stopvoiceImage : micImage} alt="원하는 곳 검색" />
            </VoiceButton>
          </MicContainer>
          <h1>정확한 명칭을 말해주세요</h1>
          <h2>"사라오름"</h2>
          <h2>"온앤온서프"</h2>
          <h2>"흑돈가"</h2>
        </SearchInputBox>
        <ShowInputBox>
          <Input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          />
          <Button onClick={handleConfirmClick}>확인</Button>
        </ShowInputBox>
        {isRecording && <div>{timeLeft}s</div>}
        {audioUrl && (
          <div>
            <audio src={audioUrl} controls />
          </div>
        )}
        <RecordButton onClick={startRecording} disabled={isRecording || inputValue==""}>
          <img
            src={isRecording||inputValue=="" ? notRecordingImage : recordingImage}
            alt="녹음 버튼"
          />
        </RecordButton>
        <ButtonContainer>
          <button onClick={uploadAudio} disabled={!audioUrl}>
            업로드
          </button>
        </ButtonContainer>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 781px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e3ecf1;
  width: 390px;
  height: 100%;
`;
const CategoryButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const CategoryButton = styled.button`
  background-color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;

  ${({ isActive }) =>
    isActive &&
    `
      background-color: lightgray;
      font-weight: bold;
    `}
`;
const MicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 35px;
`;

const VoiceButton = styled.div`
  width: 50px;
  cursor: pointer;
  img {
    width: 40px;
  }
`;

const SearchInputBox = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 295px;
  height: 226px;

  h1 {
    font-size: 23px;
  }
  h2 {
    margin: 16px;
    font-size: 17px;
  }
`;

const ShowInputBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  width: 335px;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  outline: none;
  padding: 10px;
  width: 220px;
  margin-left: 11px;
`;

const Button = styled.button`
  background-color: #e3eaf1;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-left: 30px;
`;

const RecordButton = styled.button`
  margin-top: 10px;
  background-color: transparent;
  border: 0px;
  img {
    width: 50px;
  }
`;

const ButtonContainer = styled.button`
  margin-top: 10px;
  border: 0px;
  background-color: transparent;
  button {
    background-color: white;
    width: 60px;
    height: 40px;
    border-radius: 12px;
    border: 0px;
    margin: 10px;
    font-size: 15px;
    cursor: pointer;
  }
`;

export default SearchModal;