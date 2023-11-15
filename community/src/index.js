import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import PostPage from './post/post.js';
import {MainPage} from './main/main.js';
import PostingPage from "./posting/posting.js";
import BoardPage from './board/board.js';
import SignUp from './signup/signup.js'
import Login from './login/login.js';
import './index.css';
import { useState } from 'react';
import api_key from './api_key.js';

const boardList = ["React", "Node.js", "MySQL", "MongoDB"];
const localURL = 'http://localhost:3000';

function Home() {
    return( //리액트 라우터를 통해 멀티페이지 구현(React는 기본적으로 싱글페이지를 지원)
        <>
        <div id='container'>
            <BrowserRouter>
                <Routes>
                    <Route path='*' element={
                        <>
                            <Header/>
                            <main>
                                <Sidebar/>
                                <div id='contents'>
                                    <Routes>
                                        <Route path='/' element={<><MainPage/><ChatGPT/></>}></Route>
                                        <Route path='/board/:boardName' element={<><BoardPage/><ChatGPT/></>}></Route>
                                        <Route path='/post/:postId' element={<><PostPage/><ChatGPT/></>}></Route>
                                        <Route path='/posting' element={<><PostingPage/><ChatGPT/></>}></Route>
                                    </Routes>
                                </div>
                            </main>
                        </>
                    }></Route>
                    <Route path='/signup' element={<SignUp/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
        {/* <ChatGPT/> */}
        </>
    );
}

const Header = () => { // 사이트 이름과 로고
    return(
        <header>
            <h1 id='header_logo'><Link to="/">Develop Together</Link></h1>
            <LoginAndSignUp/>
        </header>
    )
}

const Sidebar = () => { // 사이드바
    return(
        <div id='sidebar'>
            {boardList.map((item) => (
                <li key={item}><Link to={`/board/${item}`}>{item}</Link></li>
            ))}
        </div>
    )
}

const LoginAndSignUp = () => {
    let sessionId;
    let userId;
    const logout = () => {
        document.cookie = `userId=${userId}; expires=Thu 01 Jan 1970 00:00:00 UTC`;
        if(document.cookie === ""){
            window.location.pathname = "/";
        }
    }

    if(document.cookie !== ""){
        const cookies = document.cookie.split(";");
        for(const cookie of cookies){
            [sessionId, userId] = cookie.split("=");
            if(sessionId === "userId"){
                return(
                    <div id='user_info'>
                        <p id='userId'>환영합니다 {userId}님</p>
                        <button onClick={logout}>로그아웃</button>
                    </div>
                );
            }
        }
    }
    else{
        return(
            <>
            <Link to={"/login"} id='login_btn'>로그인</Link>
            <Link to={"/signup"} id='signup_btn'>회원가입</Link>
            </>
        )
    }
}

const ChatGPT = () => {
    const [response_text, setResponse] = useState("");
    const api_request = () => {
        const text = document.querySelector("#request_text").value;
        if(hasCookie() && text !== ""){
            setResponse("잠시만 기다려주세요.")
            const apiKey = api_key;
            const url = "https://api.openai.com/v1/chat/completions";
            const header = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            }
            const data = {
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": text}],
                "temperature": 0.7
            }
            fetch(url, {method: "POST", headers: header, body: JSON.stringify(data)})
            .then(response=>response.json())
            .then(response=>{
                setResponse(response.choices[0].message.content);
                document.querySelector("#request_text").value = "";
            })
        }
    }
    return(
        <div id='chatgpt'>
            <textarea type='text' id='request_text' placeholder='ChatGPT에게 물어보세요.'></textarea>
            <button onClick={api_request}>요청</button>
            <p id='response_text'>{response_text}</p>
        </div>
    )
}

const hasCookie = () => {  //로그인 확인을 위해 캐시에 로그인정보가 있는지 확인
    const cookies = document.cookie.split(";");
    for(const cookie of cookies){
        const [sessionId,userId] = cookie.split("=");
        if(sessionId === "userId"){
            return userId;
        }
        else{return false;}
    }
}

export {boardList, localURL, hasCookie};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home/>);