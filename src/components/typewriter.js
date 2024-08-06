import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TypewriterText = ({ fullText }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!fullText) return;

    setText(''); // 텍스트 초기화

    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => {
        const nextChar = fullText.charAt(index);
        index++;
        return prev + nextChar;
      });

      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 100); // 타자기 효과 속도 조절

    return () => clearInterval(interval);
  }, [fullText]);

  return <Text>{text}</Text>;
};

const Text = styled.p`
  font-size: 20px;
  color: #fff;
  font-weight: bold; /* 폰트를 굵게 설정 */
`;


export default TypewriterText;
