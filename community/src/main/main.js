import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {boardList, localURL, hasCookie} from '../index.js';
import './main.css';

const MainPage = () => { // 각 게시판들의 내용을 모은 전체 게시판
    return(
        <>
        <button id='posting-btn'><Link to="/posting">글쓰기</Link></button>
        {boardList.map(item => (
            <Eachboard key={item} board={item}/>
        ))}
        </>
    )
}

const Eachboard = (props) => { // 각 게시판에 있는 게시글 목록
    const [data, setdata] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:8080/board/${props.board}`)
         .then(response=>response.json())
         .then(response=>{
            setdata(response);
         })
         .catch(err=>console.log(err))
    },[props.board])

    return(
        <div className='board_info'>
            <h3 className='boardName'><Link to={`/board/${props.board}`}>{props.board}</Link></h3>
            {data.length===0 ? (<h4>게시글이 없습니다.</h4>) : (data.map(item=>{
                return(
                    <div key={item.postId} className='post_info'>
                        {hasCookie()===item.userId?<p className='del_btn' onClick={()=>del_post(item.postId)}></p>:<></>}
                        <h3 className='title'><Link to={`${localURL}/post/${btoa(item.postId)}`}>제목 : {item.title}</Link></h3>
                        <p>글쓴이 : {item.userId}</p>
                    </div>
                )
            }))}
        </div>
    )
}

function del_post(postId){ // 게시글 삭제 요청
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if(confirm){
        fetch(`http://localhost:8080/post/${postId}`,{method:"Delete"})
        .then(response=>{if(!response.ok){
            throw new Error();
        }
        else {
            window.location.pathname = "/";
        }})
        .catch(err=>{
            console.log(err);
        })
    }
}

export {MainPage, del_post};