import React, {useState} from 'react'
import "./LoginRegister.css"

function RegisterPage() {
  const [name, setName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");

  const onNameHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }
  const onEmailHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.currentTarget.value)
  }

  const onSubmit = (event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if(password !== confirmPassword) {
      return alert('비밀번호와 비밀번호확인은 같아야 합니다.')
    }
  }

  return (
    <div className="loginregister">
      <form>
          <div><input name="name" type="text" placeholder="이름" value={name} onChange={onNameHandler} class="loginregister__input"/></div>
          <div><input name="email" type="email" placeholder="이메일" value={email} onChange={onEmailHandler} class="loginregister__input"/></div>
          <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} class="loginregister__input"/></div>
          <div><input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={onConfirmPasswordHandler} class="loginregister__input"/></div>
          <div><button type="submit" onSubmit={onSubmit} class="loginregister__button">계정 생성하기</button></div>
      </form>
    </div>
  );
}
export default RegisterPage;