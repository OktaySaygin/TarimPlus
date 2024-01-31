import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import FastImage from "react-native-fast-image";
import { bindActionCreators } from "redux";
import { setProfile } from "../screens/login/store/action";
import { connect } from "react-redux";

const MyPhotos = (props) => {
  const [images, setImages] = useState(null);
  const loadPhotos = () => {
    const fetchParams = {
      first: 5,
      assetType: 'Photos',
      groupName: "myGarden" // iOS için bu parametre albüm adını belirtir.
    };

    CameraRoll.getPhotos(fetchParams).then((data) => {
      setImages(data.edges);
    }).catch((e) => {
      console.warn(e);
    });
  }
  const getPhotosFromAlbum = async () => {
    try {
      const photos = await CameraRoll.getPhotos({
        first: 6, // İlk 100 fotoğrafı getir. Bu değeri ihtiyacınıza göre artırabilir ya da azaltabilirsiniz.
        assetType: 'Photos',
        groupName: "myGarden" // iOS için bu parametre albüm adını belirtir.
      });

      const uris = photos.edges.map(photo => photo.node.image);
      return uris;
    } catch (error) {
      console.error("Fotoğraflar alınırken hata oluştu:", error);
    }
  }

  useEffect(() => {
    loadPhotos();
    //setData(photos);
  })

  if (!images) {
    return (
      <View>
        <ActivityIndicator/>
      </View>
    )
  }

  const renderItem = ({item, index}) => {
    return (
      <View style={{marginRight: 20, marginBottom: 20}}>
        <Image  source={{uri: item.node.image.uri}}
                style={{aspectRatio: 1, width: (props?.screenWidth - 60) / 2, borderRadius: 20}}/>
      </View>
    )
  }

  return(
    <View>
      <FlatList
        data={images}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{marginRight: 10}}
      />
    </View>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch,
  );

const mapStateToProps = state => {
  return {
    isDarkMode: state.homePage.isDarkMode,
    screenWidth: state.homePage.screenWidth,
    screenHeight: state.homePage.screenHeight,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(MyPhotos));
