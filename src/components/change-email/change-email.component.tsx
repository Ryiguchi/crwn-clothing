import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { changeUserEmailStart } from '../../store/user/user.action';

import { Form, StyledButton } from '../change-name/change.name.styles';

const initialFormFieldValue = {
  email: '',
};

const ChangeEmail = () => {
  const dispatch = useDispatch();
  const [formField, setFormField] = useState(initialFormFieldValue);
  const currentUser = useSelector(selectCurrentUser);

  const { email } = formField;

  const changeEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentUser) {
      dispatch(changeUserEmailStart(currentUser, email));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFormField({ email: value });
  };

  return (
    <>
      <Form onSubmit={changeEmail}>
        <FormInput
          type="email"
          label="New email address"
          required
          name="email"
          onChange={handleChange}
          value={email}
        ></FormInput>
        <StyledButton>SAVE</StyledButton>
      </Form>
    </>
  );
};

export default ChangeEmail;
