import CardWrapper from "./CardWrapper";

export default function LoginForm() {
  return (
    <CardWrapper
      headerLabel="Login"
      headerDescription="Add your details below to get back into the app"
      buttonLabel="Login"
      redirectButtonDescription="Don't have an account?"
      redirectButtonLabel="Create account"
      redirectLink="/register"
    >
      FORMY
    </CardWrapper>
  );
}
