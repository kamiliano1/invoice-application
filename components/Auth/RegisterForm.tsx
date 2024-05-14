import CardWrapper from "./CardWrapper";

export default function RegisterForm() {
  return (
    <CardWrapper
      headerLabel="Register"
      headerDescription="Let's get you started"
      buttonLabel="Register"
      redirectButtonDescription="Already have an account?"
      redirectButtonLabel="Login"
      redirectLink="/login"
    >
      Register FORMY
    </CardWrapper>
  );
}
