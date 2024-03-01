import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  ToastAndroid,
} from 'react-native';
import {COLOR} from '../style/GlobalStyles';

import ratio from '../style/ratio';
import {ImageSourcePropType} from 'react-native';

const profile: ImageSourcePropType = require('../assets/imgs/profileImg.png');
import Edit from '../assets/icons/edit.svg';
import SCREENS from '../navigation/Screens';
import TransactionModel from '../(components)/TransactionModel';
import {DotIndicator} from 'react-native-indicators';
import auth from '@react-native-firebase/auth';
import {db} from '../config/firebase';

const ProfileScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const userEmail: string = auth().currentUser?.email || '';
  const [user, setUser] = useState<any>({});
  const getData = async () => {
    setLoading(true);
    const userCollection = await db
      .collection('Users')
      .doc(userEmail)
      .collection('Login')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setUser(documentSnapshot.data());
        });
      });

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        showToast('Logout Successful');
        navigation.navigate(SCREENS.LOGIN);
      })
      .catch(err => {
        Alert.alert('Something went wrong while logging out');
        console.log('err', err);
      });
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const profileScreenData = [
    {
      src: require('../assets/imgs/setting.png'),
      title: 'Setting',
    },
    {
      src: require('../assets/imgs/reset.png'),
      title: 'Reset Password',
      srcModel: () => navigation.navigate(SCREENS.RESET_PASSWORD),
    },
    {
      src: require('../assets/imgs/logout.png'),
      title: 'Logout',
      srcModel: toggleModal,
    },
  ];
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
        <View style={styles.profileContainer}>
          <View style={styles.left}>
            <Image source={profile} />
            <View style={styles.leftContent}>
              <Text style={styles.userName}>Username</Text>
              <Text style={styles.name}>
                {loading ? <DotIndicator size={9} color="black" /> : user.name}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.right}
            onPress={() => navigation.navigate(SCREENS.UPDATE_PROFILE)}>
            <Edit />
          </TouchableOpacity>
        </View>
        <View style={styles.profileBox}>
          {profileScreenData?.map((item, i) => {
            return (
              <Pressable key={i} style={styles.boxItem} onPress={item.srcModel}>
                <Image source={item.src} />
                <Text style={styles.title}>{item.title}</Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
      <TransactionModel
        isVisible={isModalVisible}
        modelCancel={toggleModal}
        modelSuccess={handleLogout}
        text={'Logout?'}
        description={'Are you sure do you wanna logout?'}
      />
    </>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.proBack,
    paddingHorizontal: ratio.pixelSizeHorizontal(20),
  },
  profileContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: ratio.pixelSizeVertical(60),
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: ratio.pixelSizeVertical(12),
  },
  leftContent: {
    gap: 2,
  },
  userName: {
    fontSize: ratio.fontPixel(14),
    color: COLOR.baseLight,
    fontWeight: '500',
  },
  name: {
    fontSize: ratio.fontPixel(24),
    color: COLOR.black,
    fontWeight: '600',
  },
  right: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: COLOR.borderLight,
    borderWidth: ratio.fontPixel(1),
    borderRadius: ratio.widthPixel(8),
    padding: ratio.fontPixel(8),
  },
  profileBox: {
    paddingTop: ratio.pixelSizeVertical(25),
    height: ratio.widthPixel(267),
    width: ratio.widthPixel(336),
    backgroundColor: COLOR.white,
    borderRadius: ratio.widthPixel(24),
    marginTop: ratio.pixelSizeVertical(-25),
    alignSelf: 'center',
    paddingHorizontal: ratio.pixelSizeVertical(25),
    paddingVertical: ratio.pixelSizeVertical(7.5),
    gap: 35,
  },
  boxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ratio.pixelSizeVertical(10),
  },
  title: {
    fontSize: ratio.fontPixel(16),
    color: COLOR.black,
    fontWeight: '500',
  },
});
