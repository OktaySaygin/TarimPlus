import React, {useEffect, useState} from 'react';
import Container from '../../helpers/Container';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../../helpers/Text';
import {
  getIconColor,
  getPlaceholderColor,
  getThemeColor,
  screenWidth,
} from '../../utils';
import FastImage from 'react-native-fast-image';
import config from '../../api/config';
import {useSelector} from 'react-redux';

function MyGardenPage(props) {
  const profileData = useSelector(state => state.homeReducer.profileData);
  const [searchText, setSearchText] = useState('');
  const [filtre, setFiltre] = useState('Hepsi');
  const [data, setData] = useState([]);

  const handleMyGarden = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('token', profileData?.data[0]?.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    let data = [];
    try {
      await fetch(
        config.API_URL + '/the_field_image_with_predict',
        requestOptions,
      )
        .then(response => response.json())
        .then(json => {
          if (json?.status) {
            data = json.items;
          }
        });
    } catch (e) {
      console.warn('error: ', e);
    }
    return data;
  };

  useEffect(() => {
    handleMyGarden().then(res => {
      setData(res);
    });
  }, []);

  const renderHeaderItem = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'red',
          }}>
          {/* kendim ekledigim bu galery iconuna button ekleyecem */}
          <FastImage
            source={require('./../../assets/backgrounds/galery2.png')}
            style={{
              width: 70,
              aspectRatio: 1,
              marginTop: 10,
            }}
            resizeMode={'contain'}
          />
          <FastImage
            source={require('./../../assets/icons/mainLogo.png')}
            style={{
              width: 70,
              aspectRatio: 1,
              alignSelf: 'flex-end',
              marginTop: 10,
            }}
            resizeMode={'contain'}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{color: '#5B8E55', width: (screenWidth - 100) / 2}}
            type={'italicBold'}
            size={22}
            numberOfLines={1}>
            {props?.route?.params.data?.name}
          </Text>

          <View
            style={{
              height: 40,
              alignItems: 'center',
              backgroundColor: '#F5F5F5',
              width: (screenWidth + 20) / 2,
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <FastImage
              source={require('../../assets/icons/search.png')}
              style={{width: 24, aspectRatio: 1, marginHorizontal: 10}}
              resizeMode={'contain'}
            />
            <TextInput
              style={{color: getIconColor(false), flex: 1, height: '100%'}}
              placeholder={''}
              placeholderTextColor={getPlaceholderColor(false)}
              onChangeText={query => {
                setSearchText(query);
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => setFiltre('Hepsi')}
            style={{
              backgroundColor: filtre === 'Hepsi' ? '#8DD284' : 'white',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: filtre === 'Hepsi' ? 'white' : 'gray',
                padding: 10,
              }}
              type={'bold'}>
              Hepsi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFiltre('Sebze')}
            style={{
              backgroundColor: filtre === 'Sebze' ? '#8DD284' : 'white',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: filtre === 'Sebze' ? 'white' : 'gray',
                padding: 10,
              }}
              type={'bold'}>
              Sebze
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFiltre('Meyve')}
            style={{
              backgroundColor: filtre === 'Meyve' ? '#8DD284' : 'white',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: filtre === 'Meyve' ? 'white' : 'gray',
                padding: 10,
              }}
              type={'bold'}>
              Meyve
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFiltre('Tarlam')}
            style={{
              backgroundColor: filtre === 'Tarlam' ? '#8DD284' : 'white',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: filtre === 'Tarlam' ? 'white' : 'gray',
                padding: 10,
              }}
              type={'bold'}>
              Tarlam
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: screenWidth - 60,
          marginVertical: 6,
          borderRadius: 30,
          height: 140,
          shadowOpacity: 0.2,
          shadowRadius: 1,
          shadowOffset: {
            height: 5,
            width: 2,
          },
          elevation: 6,
          backgroundColor: 'white',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <View style={{marginHorizontal: 10}}>
            <FastImage
              source={{uri: item?.predictImageUrl}}
              style={{width: 100, aspectRatio: 1}}
              resizeMode={'contain'}
            />
          </View>
          <View
            style={{
              height: '70%',
              width: '55%',
              justifyContent: 'space-evenly',
            }}>
            <Text size={18} style={{fontWeight: 'bold'}}>
              {item?.predictClasses}
            </Text>
            <Text size={12} color={'gray'}>
              Create an Aepod
            </Text>
            <Text size={12} color={'#61B458'}>
              Water Level
            </Text>

            <View
              style={{
                height: 5,
                backgroundColor: '#E2E2E2',
                width: '100%',
                borderRadius: 10,
                overflow: 'hidden',
                flexDirection: 'row',
              }}>
              <View
                style={{flex: 3, backgroundColor: '#61B458', borderRadius: 10}}
              />
              <View style={{flex: 7, borderRadius: 10}} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (data?.length < 1) {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Container>
      <ScrollView
        style={{marginHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          ListHeaderComponent={() => renderHeaderItem()}
          style={{width: '100%'}}
          contentContainerStyle={{alignItems: 'center'}}
        />
        <View style={{width: '100%', height: 70, backgroundColor: 'white'}} />
      </ScrollView>
    </Container>
  );
}
export default React.memo(MyGardenPage);
