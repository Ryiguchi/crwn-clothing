import { useSelector, useDispatch } from 'react-redux';

import AccountSidebar from '../account-sidebar/account-sidebar.component';
import ChangeName from '../../components/change-name/change-name.component';
import ChangeEmail from '../../components/change-email/change-email.component';

import { selectUserSettingsMenu } from '../../store/user/user.selector';

import { changeUserSettingsMenu } from '../../store/user/user.action';

import { AccountSettingsContainer } from './account-settings.styles';

const AccountSettings = () => {
  const dispatch = useDispatch();

  const userSettingsMenu = useSelector(selectUserSettingsMenu);

  const changeMenu = (menu) => {
    console.log(menu);
    dispatch(changeUserSettingsMenu(menu));
  };

  return (
    <AccountSettingsContainer>
      <AccountSidebar callBack={changeMenu} />
      {userSettingsMenu === 'changeName' ? <ChangeName /> : ''}
      {userSettingsMenu === 'changeEmail' ? <ChangeEmail /> : ''}
      {/* {userSettingsMenu === 'changePassword' ? <ChangePassword /> : ''} */}
    </AccountSettingsContainer>
  );
};

export default AccountSettings;
