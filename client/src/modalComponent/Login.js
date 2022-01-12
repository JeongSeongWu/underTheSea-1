import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { modalOff } from "../store/actions";

const DarkBackGround = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  width: 25%;
  height: 60%;
  background: white;
  flex-direction: column;
  position: relative;
  justify-content: center;
  display: flex;
  border-radius: 20px;
  align-items: center;

  z-index: 999;
`;
const CloseBtnContainer = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;

  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
`;
const Title = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  color: #108dee;
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 2px solid #108dee;
  margin-bottom: 30px;
`;
const Form = styled.form`
  width: 80%;
  height: 40%;
  display: flex;
  flex-direction: column;
`;
const Email = styled.input`
  width: calc(100%-10px);
  height: 30px;
  padding: 5px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const Pwd = styled.input`
  width: calc(100%-10px);
  height: 30px;
  padding: 5px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const LoginBtn = styled.button`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  background: #108dee;
  border-style: none;
  padding: 10px;
  border-radius: 4px;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  position: relative;
  :hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.07);
  }
`;
const GoogleBtn = styled.a`
  width: 100%;
  height: 50px;
  background: white;
  border: 2px solid #108dee;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: white;
  padding: 5px;
  font-size: 1.25rem;
  font-weight: bold;
  position: relative;
  box-sizing: border-box;
  :hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.07);
  }
`;
const GoogleIcon = styled.img`
  width: 30%;
`;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    user_pwd: "",
  });
  const handleInputValue = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = () => {
    const { email, user_pwd } = userData;

    if (email && user_pwd) {
      axios
        .post(`http://localhost:80/user/login`, { data: userData })
        .then((res) => {
          if (res.data.token) {
            navigate("/mypage");
          }
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <DarkBackGround>
      <ModalContainer>
        <CloseBtnContainer>
          <FontAwesomeIcon
            icon={faTimes}
            size="2x"
            onClick={() => dispatch(modalOff)}
          />
        </CloseBtnContainer>
        <Title>로그인</Title>
        <Form>
          <Email
            placeholder="이메일을 입력해주세요"
            type="email"
            name="email"
            onChange={handleInputValue}
          />
          <Pwd
            placeholder="비밀번호를 입력해주세요"
            type="password"
            name="user_pwd"
            onChange={handleInputValue}
          />

          <LoginBtn type="button" onClick={handleLogin}>
            로그인
          </LoginBtn>

          <GoogleBtn href="http://localhost:80/user/auth/google">
            {/* <FontAwesomeIcon icon={faGoogle} /> */}
            <GoogleIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/544px-Google_2015_logo.svg.png" />
          </GoogleBtn>
        </Form>
      </ModalContainer>
    </DarkBackGround>
  );
}

export default Login;
