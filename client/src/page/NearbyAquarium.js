import styled from "styled-components";
import Header2 from "../component/Header2";
import Footer from "../component/Footer";
import React, { useRef, useEffect } from "react";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

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
  top: 2%;
  left: 1%;
  width: 20%;
  height: 40px;
  z-index: 99;
`;

function NearbyAquarium() {
  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };
  let mapContainer = document.getElementById("myMap");
  let mapOption = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };
  //   let map = new window.kakao.maps.Map(mapContainer, mapOption)
  useEffect(() => {
    // 지도생성
    new window.kakao.maps.Map(mapContainer, mapOption);
    // 장소 검색 객체
    new window.kakao.maps.services.Places();
    return () => {};
  }, []);

  //   useEffect(() => {
  //     new window.kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
  //     return () => {};
  //   }, []);

  return (
    <>
      <Header2 />
      <MapContainer id="myMap" ref={container}></MapContainer>
      <Footer />
    </>
  );
}
export default NearbyAquarium;
