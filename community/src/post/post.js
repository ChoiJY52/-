import {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import { hasCookie } from '../index.js';
import './post.css';

const PostPage = () => {
    const [contents, setContents] = useState([]);
    const [comments, setComments] = useState([]);
    const {postId} = useParams();
    
    const getComment = useCallback(() => {
        fetch(`http://localhost:8080/comment/${atob(postId)}`)
                .then(response=>response.json())
                .then(response=>{
                    setComments(response);
                })
                .catch(err=>{console.log(err)})
    }, [postId])

    useEffect(()=>{
        if(hasCookie()){
            fetch(`http://localhost:8080/post/${atob(postId)}`)
            .then(response=>response.json())
            .then(response=>{
                setContents(response);
                getComment();
                // fetch(`http://localhost:8080/comment/${atob(postId)}`)
                // .then(response=>response.json())
                // .then(response=>{
                //     setComments(response);
                // })
                // .catch(err=>{console.log(err)})
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },[postId, getComment])

    const submitComment = () => {
        const confirm = window.confirm("댓글을 등록하시겠습니까?");
        if(confirm){
            const content = document.querySelector('#comment_write_box');
            const formData = new FormData();
            formData.set("content", content.value);
            formData.set("userId", hasCookie());
            if(content.value===""){
                return;
            }
            formData.set("postId", atob(postId));
            fetch("http://localhost:8080/comment",{method: "POST", body: formData})
            .then(response=>{
                if(response.ok){
                    content.value = "";
                    getComment();
                    // window.location.pathname = `/post/${postId}`;
                }
            })
            .catch((err)=>console.log(err))
        }
    }

    const del_comment = (commentId) => {
        fetch(`http://localhost:8080/comment/${commentId}`, {method:"Delete"})
        .then(()=>getComment())
    }

    return(
        <>
        {(hasCookie()) ? (
            <>
            <div key={contents.postId} id='post'>
                <h2 id='post_title'>{contents.title}</h2>
                <div id={"content"} dangerouslySetInnerHTML={{__html: contents.content}}></div>
            </div>
            <div id='comments'>
                <textarea id='comment_write_box' placeholder='댓글 작성'></textarea>
                <button id='comment_submit_btn' onClick={submitComment}>등록</button>
                <div id='comments_box'>
                    {comments.length===undefined ? (<></>) : (comments.map(item=>{
                        return(
                            <div key={item.commentId} className='comment'>
                                {hasCookie()===item.userId?<p className='del_btn' onClick={()=>del_comment(item.commentId)}></p>:<></>}
                                <p className='userId'>{item.userId}</p>
                                <p>{item.content}</p>
                            </div>
                        )
                    }))}
                </div>
            </div>
            </>
        ) : (
            <div id='noLogin'>비회원은 열람하실 수 없습니다.</div>
        )}
        
        </>
    )
}

export default PostPage;