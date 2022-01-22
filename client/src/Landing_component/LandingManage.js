import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { signupModalOnAction } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(to top, #a8f2ff, #d2f7ff);
`;

const WomanImg = styled.img`
  position: absolute;
  width: 40%;
  height: 70%;
  left: 10%;
  bottom: 17%;
`;

const Fish = styled.img`
  position: absolute;
  width: 9%;
  height: 15%;
  top: 20%;
  right: 12%;
`;

const TextContainer = styled.div`
  position: absolute;
  right: 15%;
  display: flex;
  flex-direction: column;

  /* border: 2px dashed red; */
`;

const MainText = styled.div`
  font-weight: 900;
  font-size: 2.5rem;
  color: #092011;
  margin-bottom: 20px;
  color: #191919;
`;

const SearchText = styled.div`
  text-align: left;
  margin-bottom: 10%;
  z-index: 999;
  font-size: 1.4rem;
  line-height: 150%;
  font-family: "Kfont";
`;

const SearchTitle = styled.div`
  display: flex;
  font-size: 1.7rem;
  font-weight: 650;
  color: #092011;
  /* font-family: "Kfont"; */
  cursor: pointer;
`;

const IconCover = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;

function LandingManage() {
  const state = useSelector((state) => state.authReducer);
  const { isLogin } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    const txtTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".text",
        start: "120px 90%",
        end: "top 10%",
        toggleActions: "play none restart pause",
        // markers: true,
      },
    });
    txtTimeline.from(".text", { opacity: 0, y: 50, duration: 1 });
    txtTimeline.from(".text1", { opacity: 0, y: 60, duration: 1 });

    const txt = gsap.timeline({
      scrollTrigger: {
        trigger: ".text",
        start: "120px 60%",
        end: "top 10%",
        toggleActions: "play none restart pause",
        // markers: true,
      },
    });
    txt.from(".fish", { opacity: 0, y: 100, duration: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".text",
        start: "120px 90%",
        end: "top 10%",
        toggleActions: "play none restart pause",
        // markers: true,
      },
    });
    tl.from(".womanImg", { opacity: 0, x: -100, duration: 1 });
  }, []);

  return (
    <Container>
      <WomanImg
        className="womanImg"
        src="https://iconmage.s3.ap-northeast-2.amazonaws.com/메인여자인물3.png"
        alt="메인여자인물3.png"
      />
      <Fish
        className="fish"
        src="https://iconmage.s3.ap-northeast-2.amazonaws.com/해파리.png"
        alt="해파리.png"
      />
      <TextContainer>
        <MainText className="text">주간 수족관 관리</MainText>
        <SearchText className="text">
          어항 관리가 필요하세요?<br></br>Under the Sea에서 도와드립니다.
        </SearchText>

        <div className="text1">
          {isLogin ? (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/manage"
            >
              <SearchTitle>
                관리페이지
                <IconCover>
                  <FontAwesomeIcon size="1x" icon={faAngleDoubleRight} />
                </IconCover>
              </SearchTitle>
            </Link>
          ) : (
            <SearchTitle onClick={() => dispatch(signupModalOnAction)}>
              관리페이지
              <IconCover>
                <FontAwesomeIcon size="1x" icon={faAngleDoubleRight} />
              </IconCover>
            </SearchTitle>
          )}
        </div>
      </TextContainer>
      {/* <Sqaure /> */}
    </Container>
  );
}

export default LandingManage;
