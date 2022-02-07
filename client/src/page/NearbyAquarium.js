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
const { kakao } = window;

function NearbyAquarium({ searchPlace }) {
  useEffect(() => {
    console.log("유즈이펙트는 실행되니?");
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 999 });
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return <MapContainer id="myMap"></MapContainer>;
}
export default NearbyAquarium;
