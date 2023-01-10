import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { changeDisplayNameStart } from '../../store/user/user.action';

import { Form, StyledButton } from './change.name.styles';

const initialFormFieldValue = {
  name: '',
};

const ChangeName = () => {
  const dispatch = useDispatch();
  const [formField, setFormField] = useState(initialFormFieldValue);
  const currentUser = useSelector(selectCurrentUser);

  const { name } = formField;

  const changeDisplayName = (e) => {
    e.preventDefault();

    dispatch(changeDisplayNameStart(currentUser, name));
  };

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;

    setFormField({ [name]: value });
  };

  if (!currentUser) return;
  return (
    <>
      <Form onSubmit={changeDisplayName}>
        <FormInput
          label="New display name"
          required
          name="name"
          onChange={handleChange}
          value={name}
        ></FormInput>
        <StyledButton>SAVE</StyledButton>
      </Form>
    </>
  );
};

export default ChangeName;
