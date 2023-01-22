import { useSelector, useDispatch } from 'react-redux';

import AccountSidebar from '../account-sidebar/account-sidebar.component';
import ChangeName from '../../components/change-name/change-name.component';
import ChangeEmail from '../../components/change-email/change-email.component';
import ChangePassword from '../../components/change-password/change-password.component';

import { selectUserSettingsMenu } from '../../store/user/user.selector';

import { changeUserSettingsMenu } from '../../store/user/user.action';
import { USER_SETTINGS_MENU_OPTIONS } from '../../store/user/user.types';

import { AccountSettingsContainer } from './account-settings.styles';

const AccountSettings = () => {
  const dispatch = useDispatch();

  const userSettingsMenu = useSelector(selectUserSettingsMenu);

  const changeMenu = (menu: USER_SETTINGS_MENU_OPTIONS) => {
    dispatch(changeUserSettingsMenu(menu));
  };

  return (
    <AccountSettingsContainer>
      <AccountSidebar callBack={changeMenu} />
      {userSettingsMenu === USER_SETTINGS_MENU_OPTIONS.CHANGE_NAME && (
        <ChangeName />
      )}
      {userSettingsMenu === USER_SETTINGS_MENU_OPTIONS.CHANGE_EMAIL && (
        <ChangeEmail />
      )}
      {userSettingsMenu === USER_SETTINGS_MENU_OPTIONS.CHANGE_PASSWORD && (
        <ChangePassword />
      )}
    </AccountSettingsContainer>
  );
};

export default AccountSettings;
