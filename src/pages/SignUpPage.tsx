import WhiteButton from '../components/Auth/WhiteButton'

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="items-center">회원가입</div>
      <WhiteButton text=" 회원가입" navigateTo="signuppage" />
    </div>
  )
}

export default SignUpPage
