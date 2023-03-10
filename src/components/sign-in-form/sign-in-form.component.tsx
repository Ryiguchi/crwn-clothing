import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.action';

import {
  SignInContainer,
  ButtonsContainer,
  StyledLink,
} from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') {
        alert('The password you entered is incorrect');
        return;
      }
      if (err.code === 'auth/user-not-found') {
        alert('There is no account with that email address');
      } else console.log(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  return (
    <>
      <SignInContainer>
        <h2>Already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          ></FormInput>
          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          ></FormInput>

          <ButtonsContainer>
            <Button type="submit">Sign in</Button>
            <Button
              type="button"
              buttonType={BUTTON_TYPE_CLASSES.google}
              onClick={signInWithGoogle}
            >
              Google Sign In
            </Button>
          </ButtonsContainer>
          <span>Forgot your password? </span>
          <StyledLink to="/forgot">
            {' '}
            Click here to reset your password.
          </StyledLink>
        </form>
      </SignInContainer>
    </>
  );
};

export default SignInForm;
