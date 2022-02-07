import React, { useState } from "react";
import Footer from "../component/Footer";
import Header2 from "../component/Header2";
import NearbyAquarium from "./NearbyAquarium";
import styled from "styled-components";
// import MapContainer from './Sections/MapContainer'

const Input = styled.input`
  width: 80%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 20%;
  height: 100%;
`;

const SearchContainer = styled.form`
  display: flex;
  position: absolute;
  top: 13%;
  left: 1%;
  width: 20%;
  height: 40px;
  z-index: 99;
`;
function AquaSearch() {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("인풋텍스트", InputText);

    setPlace(InputText);
    console.log("플레이스", Place);
    setInputText("");
  };

  return (
    <>
      <Header2 />
      <SearchContainer onSubmit={handleSubmit}>
        <Input
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          value={InputText}
        />
        <Button type="submit">검색</Button>
      </SearchContainer>
      <NearbyAquarium searchPlace={Place}></NearbyAquarium>
      <Footer />
    </>
  );
}

export default AquaSearch;
