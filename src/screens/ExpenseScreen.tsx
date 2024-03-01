import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';
import {ImageSourcePropType} from 'react-native';

const AttachmentSmallImg: ImageSourcePropType = require('../assets/imgs/attachmentSmall.png');
import BtnLarge from '../(components)/BtnLarge';
import AttachModel from '../(components)/AttachModel';
import SuccessfullModel from '../(components)/SuccessfullModel';
import AddInput from '../(components)/AddInput';
import AttachInputDoc from '../(components)/AttachInputDoc';
import DownIcon from '../assets/icons/down.svg';
import CloseIcon from '../assets/icons/closeSmall.svg';
import IncomeExpenseHeader from '../(components)/IncomeExpenseHeader';
import ToggleSwitch from 'toggle-switch-react-native';
import Modal from 'react-native-modal';
import {db} from '../config/firebase';
import auth from '@react-native-firebase/auth';
import SCREENS from '../navigation/Screens';

const shopping: ImageSourcePropType = require('../assets/imgs/shopping.png');
const subscription: ImageSourcePropType = require('../assets/imgs/subscription.png');
const food: ImageSourcePropType = require('../assets/imgs/food.png');
const salary: ImageSourcePropType = require('../assets/imgs/salary.png');
const transportation: ImageSourcePropType = require('../assets/imgs/transport.png');

const {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratio;

interface ExpenseScreenProps {
  route: {
    params: {
      titleHeader: string;
      backColor: string;
    };
  };
  navigation: any;
}

const ExpenseScreen: React.FC<ExpenseScreenProps> = ({route, navigation}) => {
  const {titleHeader, backColor} = route.params;
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const [loading, setLoading] = useState<boolean>(false);

  const [category, setCategory] = useState<string>('');
  const [CategoryImgSrc, setCategoryImgSrc] = useState<string>('');
  const [categoriesModalVisible, setCategoriesModalVisible] =
    useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: 'Shopping',
      image: shopping,
      imgSrc: require('../assets/imgs/shopping.png'),
    },
    {
      id: 2,
      name: 'Subscription',
      image: subscription,
      imgSrc: require('../assets/imgs/subscription.png'),
    },
    {
      id: 3,
      name: 'Food',
      image: food,
      imgSrc: require('../assets/imgs/food.png'),
    },
    {
      id: 4,
      name: 'Salary',
      image: salary,
      imgSrc: require('../assets/imgs/salary.png'),
    },
    {
      id: 5,
      name: 'Transportation',
      image: transportation,
      imgSrc: require('../assets/imgs/transport.png'),
    },
  ]);

  const selectCategory = (categoryName: string, categoryImg: string) => {
    setCategory(categoryName);
    setCategoryImgSrc(categoryImg);
    setCategoriesModalVisible(false);
  };

  const [isModalFirst, setModalFirst] = useState(false);
  const [isModalSecond, setModalSecond] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalSuccess, setModalSuccess] = useState(false);
  const [isBox, setBox] = useState(true);

  const toggleModelFirst = () => {
    if (!money) {
      showToast('Enter Payment');
      return;
    }
    setModalFirst(!isModalFirst);
  };

  const toggleModelSecond = () => {
    if (!category) {
      showToast('Select Category');
      return;
    }
    if (!description) {
      showToast('Add Description');
      return;
    }
    setModalSecond(!isModalSecond);
    setModalFirst(!isModalFirst);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleBox = () => {
    setBox(!isBox);
    setModalVisible(false);
  };

  const [money, setMoney] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const now = new Date();

  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const dateString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSubmit = async () => {
    if (!bankValue) {
      showToast('Select Bank');
      return;
    }

    try {
      setLoading(true);
      const userEmail: string = auth().currentUser?.email || '';

      const transactionData: TransactionData = {
        money: money,
        category: category,
        description: description,
        transactionType: titleHeader,
        time: timeString,
        date: dateString,
        categoryImgSrc: CategoryImgSrc,
        bank: bankValue,
      };
      const collectionName: string = `${userEmail}`;

      const docRef = await db
        .collection('Users')
        .doc(collectionName)
        .collection('UsersTransation')
        .add(transactionData);

      setLoading(false);
      toggleModalSuccess();
      setMoney('');
      setCategory('');
      setDescription('');
      setBankValue('');
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const toggleModalSuccess = () => {
    setModalSuccess(!isModalSuccess);
    setTimeout(() => {
      navigation.navigate(SCREENS.TRANSACTION);
    }, 3000);
  };

  const toggleCategoryModal = () => {
    setCategoriesModalVisible(!categoriesModalVisible);
  };

  let dotStyle;
  switch (category) {
    case 'Shopping':
      dotStyle = [styles.dot, styles.dotGreen];
      break;
    case 'Subscription':
      dotStyle = [styles.dot, styles.dotYellow];
      break;
    case 'Food':
      dotStyle = [styles.dot, styles.dotRed];
      break;
    case 'Salary':
      dotStyle = [styles.dot, styles.dotBlack];
      break;
    case 'Transportation':
      dotStyle = [styles.dot, styles.dotGray];
      break;
    default:
      dotStyle = styles.dot; // Default style for an empty dot
  }

  // Bank Data
  const [bankModel, setBankModel] = useState<string>(false);
  const [bankValue, setBankValue] = useState<string>('');
  const [bank, setBank] = useState<Bank[]>([
    {
      id: 1,
      name: 'HBL',
    },
    {
      id: 2,
      name: 'Paypal',
    },
    {
      id: 3,
      name: 'JazzCash',
    },
    {
      id: 4,
      name: 'EasyPaisa',
    },
    {
      id: 5,
      name: 'UBL',
    },
  ]);

  const selectBank = bankName => {
    setBankValue(bankName);
    setBankModel(!bankModel);
  };

  const bankModelFun = () => {
    setBankModel(!bankModel);
  };

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: backColor,
          },
        ]}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
        <View style={styles.topBox}>
          <IncomeExpenseHeader title={titleHeader} />
          <Text style={styles.much}>How much?</Text>
          <View style={styles.HowMuchContainer}>
            <Text style={[styles.price]}>$</Text>
            <TextInput
              style={[styles.price]}
              placeholder="0"
              placeholderTextColor={'white'}
              value={money}
              onChangeText={text => setMoney(text)}
              onSubmitEditing={() => toggleModelFirst()}
              keyboardType="numeric"
            />
          </View>
        </View>
      </SafeAreaView>

      {/* 1st Model */}
      <Modal
        backdropOpacity={0}
        style={styles.model1}
        onBackdropPress={toggleModelFirst}
        isVisible={isModalFirst}>
        <TouchableOpacity
          style={styles.closeLine}
          onPress={toggleModelFirst}></TouchableOpacity>
        <View style={styles.Box1Inputs}>
          <TouchableOpacity
            style={styles.categoriesTextContainer}
            onPress={() => setCategoriesModalVisible(true)}>
            <Text style={styles.categoryText}>
              {category || 'Select Category'}
            </Text>
            <DownIcon width={32} />
          </TouchableOpacity>
          <AddInput changeText={setDescription} placeholder={'Description'} />
          <AttachInputDoc handleFunc={toggleModal} />
        </View>
        <BtnLarge handleFunc={toggleModelSecond} text={'Continue'} />
      </Modal>

      {/* 2nd Model */}
      <Modal
        style={styles.model2}
        backdropOpacity={0.4}
        onBackdropPress={toggleModelSecond}
        isVisible={isModalSecond}>
        <TouchableOpacity
          style={styles.closeLine}
          onPress={toggleModelSecond}></TouchableOpacity>
        <View style={styles.bottomBox2}>
          <View style={styles.inputContainer}>
            <View style={styles.inputBtn}>
              <View style={dotStyle} />
              <Text style={styles.subcription}>
                {category || 'No Category Selected'}
              </Text>
            </View>
            <DownIcon width={32} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={description || 'No Description Entered'}
            />
          </View>
          <TouchableOpacity
            style={styles.categoriesTextContainer}
            onPress={() => bankModelFun()}>
            <Text style={styles.categoryText}>
              {bankValue || 'Select Bank'}
            </Text>
            <DownIcon width={32} />
          </TouchableOpacity>
          <View style={styles.imgContainer}>
            <Image source={AttachmentSmallImg} />
            <CloseIcon style={styles.closeIconsty} />
          </View>
          <View style={styles.toggelInput}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Repeat</Text>
              <Text style={styles.subTitile}>Repeat transaction</Text>
            </View>
            <View>
              <ToggleSwitch
                isOn={false}
                onColor={COLOR.green}
                offColor={COLOR.borderLight}
                size="medium"
                onToggle={isOn => isOn}
              />
            </View>
          </View>
          <BtnLarge
            text={
              loading ? (
                <ActivityIndicator size="small" color={COLOR.white} />
              ) : (
                'Continue'
              )
            }
            handleFunc={handleSubmit}
          />
        </View>
      </Modal>

      {/* Category Model */}
      <Modal
        style={styles.model3}
        transparent={true}
        visible={categoriesModalVisible}
        onRequestClose={toggleCategoryModal}>
        <View style={styles.modalContainer}>
          <FlatList
            data={categories}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.categoryItemContainer}
                onPress={() => selectCategory(item.name, item.imgSrc)}>
                <Image source={item.image} />
                <Text style={styles.categoryItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Bank Model */}
      <Modal
        style={styles.model3}
        transparent={true}
        visible={bankModel}
        onRequestClose={bankModelFun}>
        <View style={styles.modalContainer}>
          <FlatList
            data={bank}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.categoryItemContainer}
                onPress={() => selectBank(item.name)}>
                <Text style={styles.categoryItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* Image, File and Open Camera Model */}
      <AttachModel
        isVisible={isModalVisible}
        modelCancel={toggleModal}
        boxVisible={toggleBox}
      />
      {/* Transaction Successfull Model */}
      <SuccessfullModel
        description={'Transaction has been successfully added'}
        isVisible={isModalSuccess}
        modelCancel={toggleModalSuccess}
      />
    </>
  );
};

export default ExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBox: {
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  much: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.borderLight,
    marginTop: pixelSizeVertical(80),
  },
  HowMuchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: fontPixel(64),
    fontWeight: '600',
    color: COLOR.white,
    marginTop: pixelSizeVertical(5),
  },
  model1: {
    backgroundColor: COLOR.white,
    borderTopEndRadius: widthPixel(24),
    borderTopStartRadius: widthPixel(24),
    width: '100%',
    height: heightPixel(191),
    marginTop: pixelSizeHorizontal(430),
    marginBottom: pixelSizeHorizontal(1),
    marginLeft: pixelSizeVertical(1),
    padding: pixelSizeHorizontal(16),
    display: 'flex',
    justifyContent: 'flex-start',
  },
  model2: {
    backgroundColor: COLOR.white,
    borderTopEndRadius: widthPixel(24),
    borderTopStartRadius: widthPixel(24),
    width: '100%',
    height: heightPixel(191),
    marginTop: pixelSizeHorizontal(240),
    marginBottom: pixelSizeHorizontal(1),
    marginLeft: pixelSizeVertical(1),
    padding: pixelSizeHorizontal(16),
    display: 'flex',
    justifyContent: 'flex-start',
  },
  closeLine: {
    borderWidth: widthPixel(4),
    width: widthPixel(36),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(50),
    alignSelf: 'center',
  },
  bottomBox1: {
    backgroundColor: COLOR.white,
    height: heightPixel(336),
    borderTopLeftRadius: widthPixel(32),
    borderTopRightRadius: widthPixel(32),
    marginTop: pixelSizeVertical(215),
  },
  bottomBox1WithToggel: {
    backgroundColor: COLOR.white,
    height: heightPixel(336),
    borderTopLeftRadius: widthPixel(32),
    borderTopRightRadius: widthPixel(32),
    marginTop: pixelSizeVertical(100),
  },
  Box1Inputs: {
    gap: 15,
    marginTop: pixelSizeVertical(30),
    marginBottom: pixelSizeVertical(40),
  },
  bottomBox2: {
    backgroundColor: COLOR.white,
    height: heightPixel(545),
    borderTopLeftRadius: widthPixel(32),
    borderTopRightRadius: widthPixel(32),
    marginTop: pixelSizeVertical(5),
    paddingHorizontal: pixelSizeHorizontal(16),
    paddingTop: pixelSizeVertical(30),
    gap: 20,
  },

  inputBtn: {
    borderWidth: fontPixel(1),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(16),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: pixelSizeHorizontal(10),
    paddingVertical: pixelSizeVertical(5),
    marginLeft: pixelSizeHorizontal(20),
  },
  dot: {
    height: heightPixel(14),
    width: widthPixel(14),
    borderRadius: widthPixel(100),
  },
  dotGreen: {
    backgroundColor: COLOR.green,
  },
  dotYellow: {
    backgroundColor: COLOR.yellow,
  },
  dotBlack: {
    backgroundColor: COLOR.black,
  },
  dotRed: {
    backgroundColor: COLOR.black,
  },
  dotGray: {
    backgroundColor: COLOR.borderLight,
  },
  subcription: {
    fontSize: fontPixel(14),
    fontWeight: '500',
    color: COLOR.black,
  },
  inputContainer: {
    height: heightPixel(56),
    width: widthPixel(343),
    borderWidth: fontPixel(1),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingEnd: pixelSizeVertical(16),
  },
  input: {
    fontSize: fontPixel(18),
    paddingStart: pixelSizeVertical(16),
  },
  imgContainer: {
    position: 'relative',
  },
  closeIconsty: {
    position: 'absolute',
    left: 95,
    top: -8,
  },
  toggelInput: {
    height: heightPixel(56),
    width: widthPixel(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: pixelSizeHorizontal(16),
  },
  titleContainer: {
    gap: 3,
  },
  title: {
    fontSize: fontPixel(16),
    fontWeight: '500',
    color: COLOR.black,
  },
  subTitile: {
    fontSize: fontPixel(13),
    fontWeight: '500',
    color: COLOR.baseLight,
  },
  categoriesTextContainer: {
    height: heightPixel(56),
    width: widthPixel(343),
    borderWidth: fontPixel(1),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(16),
    alignSelf: 'center',
    paddingStart: pixelSizeVertical(16),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: pixelSizeHorizontal(10),
  },
  categoryText: {
    fontSize: fontPixel(16),
  },
  model3: {
    backgroundColor: COLOR.white,
    borderTopEndRadius: widthPixel(24),
    borderTopStartRadius: widthPixel(24),
    width: '100%',
    height: heightPixel(191),
    marginTop: pixelSizeHorizontal(540),
    marginBottom: pixelSizeHorizontal(1),
    marginLeft: pixelSizeVertical(1),
    padding: pixelSizeHorizontal(16),
    display: 'flex',
    justifyContent: 'flex-start',
  },
  categoryItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryItemText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    color: COLOR.baseLight,
    marginVertical: pixelSizeVertical(25),
  },
});
