import Main from "./page/Main";
import Guide from "./page/Guide";
import Search from "./page/Search";
import Manage from "./page/Manage";
import Mypage from "./page/Mypage";
import ManageDetail from "./Manage2Component/ManagaDetail";
import ManageAddInfo from "./page/ManageAddInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SeaWaterGuide from "./page/SeaWaterGuide";
import FreshWaterGuide from "./page/FreshWaterGuide";
import HoneyTips from "./Tips_component/HoneyTips";
import WriteTips from "./Tips_component/WriteTips";
import PostTips from "./Tips_component/PostTips";
import Login from "./modalComponent/Login";
import Logout from "./modalComponent/Logout";
import SignUp from "./modalComponent/SignUp";
import { useState, useEffect } from "react";
import axios from "axios";
import { loginAction, loginModalOnAction } from "./store/actions";
import NearbyAquarium from "./page/NearbyAquarium";

function App() {
  const state = useSelector((state) => state.modalReducer);
  const loginState = useSelector((state) => state.authReducer);
  const conData = useSelector((state) => state.conInfoReducer);
  const dispatch = useDispatch();
  const { isLoginModal, isSignupModal, isLogoutModal } = state;
  const { isLogin } = loginState;

  const month = new Date().getMonth() + 1;

  // 구글 소셜 로그인
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get("code");
  // 소셜로그인 토큰 받아오기
  const getAccessToken = (authorizationCode) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/user/auth/google/callback`, {
        authorizationCode,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.data.data.token);
        dispatch(loginAction);
      });
  };

  // 로그인 상태 확인
  const checkLogin = (accessToken) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/user/status`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        const result = res.data.status;
        if (result === 1) {
          dispatch(loginAction);
        } else if (result === 2) {
          dispatch(loginModalOnAction);
        }
      });
  };

  const getConInfo = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/container/${id}/${month}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      {
        withCredentials: true,
      }
    );
    // console.log("response:", response.data.data);
    localStorage.setItem("conInfo", JSON.stringify(response.data.data));
    return response.data.data;
  };

  const accessToken = localStorage.getItem("accessToken");
  const [containerList, setContainerList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/container/all`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((res) => {
        // console.log("전체 수조목록", res.data.data);
        setContainerList(res.data.data);
        // console.log("수조목록", containerList);
      });
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
    checkLogin(accessToken);
  }, []);

  const idList = containerList.map((container) => container.id);

  //-----------------------------------------------

  const [aquaInfo, setAquaInfo] = useState({
    container_id: "",
    container_name: "",
    size: "",
    theme: "",
  });
  const [condata, setCondata] = useState({});
  const [size, setSize] = useState({
    width: 0,
    height: 0,
    vertical: 0,
  });
  const handleInputValue = (e) => {
    setAquaInfo({
      ...aquaInfo,
      [e.target.name]: e.target.value,
    });
  };

  const getSize = (e) => {
    setSize({
      ...size,
      [e.target.name]: e.target.value,
    });
  };
  const getWaterVolum = () => {
    let waterVolum = Math.floor(
      (size.width * size.height * size.vertical) / 1000
    );
    if (waterVolum > 0) {
      setAquaInfo({
        ...aquaInfo,
        size: waterVolum,
      });
    }
  };

  const containerAddRequest = () => {
    // localStorage.setItem("accessToken", res.data.token);

    const accessToken = localStorage.getItem("accessToken");
    getWaterVolum();
    console.log("아쿠아인포", aquaInfo);

    console.log("토큰!", token);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_API}/container/add`,
        { data: aquaInfo },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("추가성공!");
        console.log("응답이 뭘까?", res);
        setAquaInfo({
          ...aquaInfo,
          container_id: res.data.data.id,
        });
        // data: {id: 3, user_id: 1, container_name: '예쁜수족관', size: '20', theme: 'FO', …}
        // message: "Container is successfully added"
      })
      .catch((err) => console.log(err));
  };

  const [token, setToken] = useState("");
  const [selConId, setSelConId] = "";
  const handleSelConId = (selConId) => setSelConId(selConId);
  const handleToken = (token) => {
    setToken(token);
  };
  const handleCondata = (e) => setCondata(e);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/guide" element={<Guide />}></Route>
        <Route path="/seawaterguide" element={<SeaWaterGuide />}></Route>
        <Route path="/freshwaterguide" element={<FreshWaterGuide />}></Route>
        <Route path="/honeytips" element={<HoneyTips />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/writetips" element={<WriteTips token={token} />}></Route>
        <Route path="/posttips/:tip_id" element={<PostTips />}></Route>
        <Route path="/nearbyaquarium" element={<NearbyAquarium />}></Route>
        <Route
          path="/manage"
          element={
            <Manage
              aquaInfo={aquaInfo}
              containerList={containerList}
              handleCondata={handleCondata}
            />
          }
        ></Route>
        <Route
          path="/manage/:container_id"
          /* 넘겨받은 아이디 중에 디테일 선택했을 때 아이디만 보여줘야한다 */
          element={
            <ManageDetail
              idList={idList}
              condata={condata}
              setCondata={setCondata}
            />
          }
        ></Route>
        <Route
          path="/manage/addInfo"
          element={
            <ManageAddInfo
              token={token}
              handleInputValue={handleInputValue}
              getSize={getSize}
              containerAddRequest={containerAddRequest}
            />
          }
        ></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
      </Routes>
      {isLoginModal && <Login handleToken={handleToken} />}
      {isLogoutModal && <Logout />}
      {isSignupModal && <SignUp />}
    </BrowserRouter>
  );
}
export default App;
