import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';

import { resetPasswordStart } from '../../store/user/user.action';

const defaultFormFields = {
  email: '',
};

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormFields({ email: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(resetPasswordStart(email));
    resetFormFields();
  };

  return (
    <div>
      <h2>Forgot your Password?</h2>
      <span>
        Enter you email and we'll send you an email with a link to reset your
        password.
      </span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        ></FormInput>
        <Button>SEND</Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
