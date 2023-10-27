// 로그인 화면, 로그인 기능 


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Component } from "react";
import HomeView from './HomeView';



function Login() {

    const [InputId, setInputId] = useState('');
    const [InputPw, setInputPw] = useState(''); 
    const [ getID, setGetID ] = useState('');

	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 

	// login 버튼 클릭 -> 입력한 값 axios로 flask router로 전달 
    const onClickLogin = () => {
        axios.post('/Login', {'ID' : InputId, 'PW' : InputPw}, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
            console.log(response);
            setGetID(response.data);
        })
        .catch(err => console.log(err));
    }

    return (
        <>
                    <div class="Login">
                        <h1>Login Form</h1>
                        <div class="Login_info">
                            <h2>ID</h2>
                            <input type="text" name="ID"
                                fw-filter="isFill&amp;isFill&amp;isMin[4]&amp;isMax[16]&amp;isIdentity"
                                fw-label="아이디" fw-msg="" class="inputTypeText" placeholder="" value={InputId}
                                required onChange={handleInputId}/>
                            
                            <h2>Password</h2>
                            <input id="password" name="password"
                                    fw-filter="isFill&amp;isMin[4]&amp;isMax[16]" fw-label="비밀번호" fw-msg=""
                                    autocomplete="off" maxlength="16" value={InputPw} type="password" required onChange={handleInputPw}/>
                        </div>                   
                    </div>
                    <div class="bt_wrap">
                        <button type="submit" class="on" form="LoginForm" onClick={onClickLogin}>로그인</button>
                        <a href="/home">취소</a>
                    </div>

                

        </>
    ); 
}


export default Login;