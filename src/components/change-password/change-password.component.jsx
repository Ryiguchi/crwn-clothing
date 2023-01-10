import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentUser } from '../../store/user/user.selector';

import { changePasswordStart } from '../../store/user/user.action';

import FormInput from '../form-input/form-input.component';
import { StyledButton, Form } from '../change-name/change.name.styles';

import { getAuth, reauthenticateWithCredential } from 'firebase/auth';

const initialFormFieldValue = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(initialFormFieldValue);
  const currentUser = useSelector(selectCurrentUser);

  const { oldPassword, newPassword, confirmPassword } = formFields;

  const changePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords don"t match');
      return;
    }
    dispatch(changePasswordStart(oldPassword, newPassword));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  if (!currentUser) return;
  return (
    <>
      <Form onSubmit={changePassword}>
        <FormInput
          type="password"
          label="Old password"
          required
          name="oldPassword"
          onChange={handleChange}
          value={oldPassword}
        ></FormInput>
        <FormInput
          type="password"
          label="New password"
          required
          name="newPassword"
          onChange={handleChange}
          value={newPassword}
        ></FormInput>
        <FormInput
          type="password"
          label="Confirm new password"
          required
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        ></FormInput>
        <StyledButton type="submit">SAVE</StyledButton>
      </Form>
    </>
  );
};

export default ChangePassword;
