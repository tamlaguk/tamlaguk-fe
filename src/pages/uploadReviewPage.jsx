import Header from "../components/header.js";
import styled from 'styled-components';
import SearchModal from "../components/upload.js";
import Tabbar from "../components/tabbar.js";

const UploadReviewPage = () => {
  return (
    <>
        <Header showBackButton={true}/>
        <SearchModal/>
        <Tabbar/>
    </>
  );
};

export default UploadReviewPage;