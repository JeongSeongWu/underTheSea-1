import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginModalOnAction,
  logoutAction,
  signupModalOnAction,
} from "../store/actions";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 10vh;
  background: #d2f7ff;
  /* box-shadow: 0px 0px 10px #adb5bd; */
  /* background: white; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* z-index: 999; */
`;

const Img = styled.img`
  width: 13vw;
  margin-left: 1%;
`;

const Login = styled.div`
  /* border: 1px solid red; */
  padding: 10px;
  font-family: "Kfont";
  cursor: pointer;
  :hover {
    color: #008eff;
  }
`;

const Manage = styled.div`
  /* border: 1px solid red; */
  padding: 10px;
  font-family: "Kfont";
  cursor: pointer;
  :hover {
    color: #008eff;
  }
`;

const Mypage = styled.div`
  /* border: 1px solid red; */
  padding: 10px;
  font-family: "Kfont";
  cursor: pointer;
  :hover {
    color: #008eff;
  }
`;

const Signup = styled.div`
  /* border: 1px solid red; */
  border-radius: 8px;
  padding: 10px;
  font-family: "Kfont";
  cursor: pointer;
  background: #008eff;
  color: white;
  position: relative;
  :hover::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Signout = styled.div`
  /* border: 1px solid red; */
  border-radius: 5px;
  padding: 10px;
  font-family: "Kfont";
  cursor: pointer;
  background: #008eff;
  color: white;
  position: relative;
  :hover::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Search = styled.div`
  /* border: 1px solid red; */
  padding: 10px;
  font-family: "Kfont";
  cursor: pointer;
  :hover {
    color: #008eff;
  }
`;
const Guide = styled.div`
  /* border: 1px solid red; */
  padding: 10px;
  font-family: "Kfont";
  cursor: pointer;
  :hover {
    color: #008eff;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  font-size: 1.1rem;
  /* border: 1px solid red; */
  justify-content: space-around;
  margin-right: 2%;
  width: 370px;
  font-family: "Kfont";
`;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);
  const { isLogin } = state;
  const accessToken = localStorage.getItem("accessToken");
  // console.log(accessToken, "QQQQQQQQ");
  const goToHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    axios
      .post(
        `http://localhost:80/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        localStorage.setItem("accessToken", "");
        dispatch(logoutAction);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Img src="/로고.png" alt="" onClick={goToHome} />
      <BtnContainer>
        <Link style={{ textDecoration: "none", color: "black" }} to="/guide">
          <Guide>가이드</Guide>
        </Link>
        <Link style={{ textDecoration: "none", color: "black" }} to="/search">
          <Search>검색</Search>
        </Link>
        {isLogin ? (
          <>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/manage"
            >
              <Manage>관리</Manage>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/mypage"
            >
              <Mypage>마이페이지</Mypage>
            </Link>
            {/* <Signout onClick={handleLogout}>로그아웃</Signout> */}
          </>
        ) : (
          <>
            <Login onClick={() => dispatch(loginModalOnAction)}>로그인</Login>
            <Signup onClick={() => dispatch(signupModalOnAction)}>
              회원가입
            </Signup>
          </>
        )}
        {!isLogin ? (
          <></>
        ) : (
          <>
            <Signout onClick={handleLogout}>로그아웃</Signout>
          </>
        )}
        {/* <Signup onClick={() => dispatch(signupModalOnAction)}>회원가입</Signup> */}
      </BtnContainer>
    </Container>
  );
}

export default Header;
