import {useRef} from 'react';
import './posting.css';
import { boardList } from '..';
import { hasCookie } from '../index.js';
import {Editor} from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';

const myKey = 's1nxs79t3560zycvzo6ik44m88cir3ntx5e4yhd4w5vothf9';

const PostingPage = () => {
    const handleFilePicker = (cb, value, meta) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.onchange = function () {
            const file = this.files[0];

            const reader = new FileReader();
            reader.onload = function () {
            const id = 'blobid' + new Date().getTime();
            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
            const base64 = reader.result.split(',')[1];
            const blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
        };

        input.click();
    };

    const editorRef = useRef(null);
    const postSubmit = () => {
        const board = document.querySelector('#select_board');
        const title = document.querySelector('#title_box');
        const formdata = new FormData();
        formdata.set('title', title.value);
        formdata.set('board', board.value);
        formdata.set('content', editorRef.current.getContent());
        formdata.set('userId', hasCookie());
        const confirmPosting = window.confirm("게시글을 저장하시겠습니까?");
        window.addEventListener("beforeunload", (e)=>{
            e.preventDefault();
            e.returnValue = "";
        });
        if(confirmPosting){
            fetch('http://localhost:8080/post', {method: "POST", body: formdata})
            .then(response=>{
                if(!response.ok){
                    console.log(response.err);
                }
                else{
                    window.history.back();
                }
            })
        }
    };
  return (
    <>
    {(hasCookie()) ? (
        <>
        <select id='select_board' name='board'>
            {boardList.map(item=>(
                <option key={item} value={item}>{item}</option>
            ))}
        </select>
        <input id='title_box' type='text' placeholder='제목'></input>
        <Editor
            apiKey={myKey}
            onInit={(evt, editor) => editorRef.current = editor}
            init={{
            height: 1000,
            menubar: false,
            plugins: "advlist anchor autolink autosave charmap codesample " +
                "directionality emoticons help image insertdatetime " +
                "link lists media nonbreaking pagebreak " +
                "searchreplace table visualblocks visualchars wordcount",
            toolbar: "undo redo spellcheckdialog  | blocks fontfamily fontsizeinput | bold italic underline forecolor backcolor" +
                "| link image | align lineheight checklist bullist numlist | indent outdent | removeformat typography",
            file_picker_callback: handleFilePicker
            }}
        />
        <button onClick={postSubmit}>등록</button>
        </>
        ) : (
            <div id='noLogin'>비회원은 게시글을 작성하실 수 없습니다.</div>
        )}
    </>
  );
};

export default PostingPage;