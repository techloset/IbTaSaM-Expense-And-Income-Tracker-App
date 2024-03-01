import React, {useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';
import CommonHeader from '../(components)/CommonHeader';
import BtnLarge from '../(components)/BtnLarge';
import AddInput from '../(components)/AddInput';
import auth, {firebase} from '@react-native-firebase/auth';
import SCREENS from '../navigation/Screens';

const {pixelSizeVertical, pixelSizeHorizontal} = ratio;

const ResetPasswordScreen: React.FC = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const handleResetPassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      showToast('Please fill all fields');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showToast('New passwords do not match');
      return;
    }

    const emailCred = firebase.auth.EmailAuthProvider.credential(
      auth().currentUser?.email || '',
      currentPassword,
    );

    setLoading(true);
    auth()
      .currentUser?.reauthenticateWithCredential(emailCred)
      .then(() => {
        return auth().currentUser?.updatePassword(newPassword);
      })
      .then(() => {
        showToast('Password updated successfully');
        setLoading(false);
        showToast('Please Login Again');
        navigation.navigate(SCREENS.LOGIN);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      })
      .catch((error: any) => {
        showToast('Error');
        console.log('Error', error.message);
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <CommonHeader title={'Reset Password'} />
      <View style={styles.fieldContainer}>
        <AddInput
          value={currentPassword}
          changeText={setCurrentPassword}
          placeholder={'Current Password'}
        />
        <AddInput
          value={newPassword}
          changeText={setNewPassword}
          placeholder={'New Password'}
        />
        <AddInput
          value={confirmNewPassword}
          changeText={setConfirmNewPassword}
          placeholder={'Retype new password'}
        />
      </View>
      <View style={styles.updateProfileBtn}>
        <BtnLarge
          text={
            loading ? (
              <ActivityIndicator size="small" color={COLOR.white} />
            ) : (
              'Change Password'
            )
          }
          handleFunc={handleResetPassword}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  fieldContainer: {
    paddingTop: pixelSizeVertical(40),
    gap: 25,
  },
  updateProfileBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
});
