import Header from "../components/header.js";
import styled from 'styled-components';
import SearchModal from "../components/upload.js";

const UploadReviewPage = () => {
  return (
    <>
        <Header showBackButton={true}/>
        <SearchModal/>
    </>
  );
};

export default UploadReviewPage;