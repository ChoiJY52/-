import "./login.css";

const Login = () => {

    const login = () => {
        const userId = document.querySelector("#userId").value;
        const password = document.querySelector("#password").value;
        const formData = new FormData();
        formData.set("userId", userId);
        formData.set("password", password);
        fetch("http://localhost:8080/login", {method: "post", body: formData})
        .then(response=>{
            console.log(response.ok);
            if(!response.ok){
                throw new Error();
            }
            else{
                return(response.json());
            }
        })
        .then(response=>{
            document.cookie = `userId=${response}; path=/`;
            window.location.pathname = "/";
        })
        .catch(err=>{
            console.log(err);
            alert("존재하지 않는 아이디입니다. 아이디 또는 비밀번호를 확인해주세요.");
        })
    }

    return (
        <>
        <div id="login">
            <label>아이디<input id="userId" type="text"></input></label>
            <label>비밀번호<input id="password" type="password"></input></label>
            <button onClick={login}>로그인</button>
        </div>
        </>
    )
}

export default Login;