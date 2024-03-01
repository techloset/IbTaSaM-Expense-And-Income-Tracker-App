import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {ImageSourcePropType} from 'react-native';

const updateProfileImg: ImageSourcePropType = require('../assets/imgs/updateProfile.png');
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';
import CommonHeader from '../(components)/CommonHeader';
import Edit from '../assets/icons/edit.svg';
import BtnLarge from '../(components)/BtnLarge';
import AddInput from '../(components)/AddInput';
import {db} from '../config/firebase';
import auth from '@react-native-firebase/auth';

const {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratio;

const UpdateProfileScreen: React.FC = () => {
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const userEmail: string = auth().currentUser?.email || '';
  const updateProfile = async () => {
    if (!email) {
      showToast('Please Enter Email');
      return;
    }
    if (!name) {
      showToast('Please Enter Name');
      return;
    }

    try {
      setLoading(true);
      const getId = await db
        .collection('Users')
        .doc(userEmail)
        .collection('Login')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            const id = documentSnapshot.id;
            setUserId(id);
          });
        });

      db.collection('Users')
        .doc(userEmail)
        .collection('Login')
        .doc(userId)
        .update({
          email: email,
          name: name,
        });
      setEmail('');
      setName('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <CommonHeader title={'Update Profile'} />
      <View style={styles.updateProfileImgContainer}>
        <Image source={updateProfileImg} />
        <View style={styles.editIcon}>
          <Edit />
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email</Text>
        <AddInput
          value={email}
          changeText={setEmail}
          placeholder={'Add Email'}
        />
        <Text style={styles.fieldLabel}>Name</Text>
        <AddInput value={name} changeText={setName} placeholder={'Add Name'} />
      </View>
      <View style={styles.updateProfileBtn}>
        <BtnLarge
          handleFunc={updateProfile}
          text={
            loading ? (
              <ActivityIndicator size="small" color={COLOR.white} />
            ) : (
              'Update Profile'
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  updateProfileImgContainer: {
    position: 'relative',
    paddingVertical: pixelSizeVertical(40),
    alignSelf: 'center',
  },
  editIcon: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: COLOR.white,
    backgroundColor: COLOR.white,
    borderWidth: fontPixel(1),
    borderRadius: widthPixel(50),
    padding: fontPixel(10),
    position: 'absolute',
    top: 135,
    left: 92,
  },
  fieldContainer: {
    gap: 10,
  },
  fieldLabel: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.black,
    paddingTop: pixelSizeVertical(20),
    paddingLeft: pixelSizeHorizontal(8),
  },
  updateProfileBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
});
