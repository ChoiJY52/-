import {React, useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import './board.css';
import {del_post} from '../main/main.js';
import { hasCookie } from '../index.js';

const BoardPage = () => {
    const {boardName} = useParams();
    const [data, setdata] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:8080/board/${boardName}`)
        .then(response=>response.json())
        .then(response=>{
            setdata(response);
        })
    },[boardName])

    return(
        <>
        <button id='posting-btn'><a href='/posting'>글쓰기</a></button>
        <h3>{boardName}</h3>
        {data.length===0 ? (<h4>게시글이 없습니다.</h4>) : (data.map((item)=>{
            console.log(item.postId)
            return(
                <div key={item.postId} className='post_info'>
                    {hasCookie()===item.userId?<p className='del_btn' onClick={()=>del_post(item.postId)}></p>:<></>}
                    <h3 className='title'><Link to={`/post/${btoa(item.postId)}`}>제목 : {item.title}</Link></h3>
                    <p>글쓴이 : {item.userId}</p>
                    {/* <div className='content' dangerouslySetInnerHTML={{__html: item.content}}></div> */}
                </div>
            )
        }))}
        </>
    )
}

export default BoardPage;