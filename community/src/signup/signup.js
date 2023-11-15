import "./signup.css";

const SignUp = () => {
    
    const signUp = () => {
        const userId = document.querySelector("#userId");
        const password = document.querySelector("#password");
        const formData = new FormData();
        formData.set("userId", userId.value);
        formData.set("password", password.value);
        fetch("http://localhost:8080/signup", {method: "post", body: formData})
        .then(response=>{
            console.log(response);
            if(response.ok) {
                alert("가입이 완료되었습니다.");
                window.location.pathname = "/";
            }
            else {
                alert("가입 실패");
                window.location.pathname = "/signup";
            }
        })
    }

    return (
        <>
        <div id="signup">
            <label>아이디<input id="userId" type="text"></input></label>
            <label>비밀번호<input id="password" type="password"></input></label>
            <button onClick={signUp}>가입</button>
        </div>
        </>
    )
}

export default SignUp;