import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { modalOff } from "../store/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

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
  width: 20%;
  height: 30%;
  background: white;
  flex-direction: column;
  position: relative;
  justify-content: center;
  display: flex;
  border-radius: 20px;
  align-items: center;
`;
const CloseBtnContainer = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 10%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
`;

const CloseBtn = styled.div`
  cursor: pointer;
  font-size: 2rem;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ShowContainer = styled.div`
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* border: 1px solid red; */
`;

const Form = styled.form`
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 95%;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20%;
  font-family: "Kfont";
  font-weight: bold;
  font-size: 1.25rem;
  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
  height: 30px;
`;

const Btn = styled.button`
  width: 100%;
  height: 30px;
  border-style: none;
  border-radius: 4px;
  background: #108dee;
  display: flex;
  justify-content: center;
  align-items: center;
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

function Deadfish({ container_id }) {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const [fishList, setFishList] = useState([]);
  const [fishDeadInfo, setFishDeadInfo] = useState({
    fish_name: "",
    fish_num: "",
  });
  const conInfo = JSON.parse(localStorage.getItem("conInfo"));
  const fish_list2 = conInfo.fish_list.map((el) => {
    return el.fish_name;
  });
  const handleInputValue = (e) => {
    setFishDeadInfo({
      ...fishDeadInfo,
      [e.target.name]: e.target.value,
    });
  };

  const fishRemoveRequest = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_API}/container/${container_id}/fish`,
        {
          data: fishDeadInfo,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        localStorage.setItem("conInfo", JSON.stringify(response.data.data));
        dispatch(modalOff);
      })
      .catch((err) => console.log(err));
  };

  return (
    <DarkBackGround>
      <ModalContainer>
        <CloseBtnContainer>
          <CloseBtn>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => dispatch(modalOff)}
              color="#e5e5e5"
            />
          </CloseBtn>
        </CloseBtnContainer>
        <ShowContainer>
          <Form>
            <Text>폐사정보를 입력해주세요</Text>
            <Input
              placeholder="어종을 입력해주세요"
              type="text"
              name="fish_name"
              onChange={handleInputValue}
              list="fishName"
              autocomplete="off"
            />
            <datalist id="fishName">
              {fish_list2.map((el, idx) => (
                <option
                  className="fish-option"
                  value={el}
                  label={el}
                  key={idx}
                ></option>
              ))}
            </datalist>
            <Input
              placeholder="마릿수를 입력해주세요"
              type="number"
              name="fish_num"
              onChange={handleInputValue}
            />
            <Btn type="button" onClick={fishRemoveRequest}>
              폐사기록추가
            </Btn>
          </Form>
        </ShowContainer>
      </ModalContainer>
    </DarkBackGround>
  );
}

export default Deadfish;
