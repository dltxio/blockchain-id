﻿﻿import React, {useState, useEffect} from "react";
import { Text, View, Platform, Image } from "react-native";
import styles from "../../styles";
import EmailClaim from "./EmailClaim";
import { useRootStore } from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import DateClaim from "./DateClaim";
import OtherClaim from "./OtherClaim";
import MobileClaim from "./MobileClaim";
import SelectClaim from "./SelectClaim";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Claim = () => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const uploadFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: '*/*'
      });
   
      if (result.type === 'success') {
        await AsyncStorage.setItem('document_url', result.uri);
      }
    } catch(err) {
      console.log('err', err);
    }
    
  };

  const uploadPhotoFromLibrary = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      })
      console.log(result)
      if (!result.cancelled) {
        await AsyncStorage.setItem('library_url', result.uri);
      }
    } catch(err) {
      console.log('err', err);
    }
  };

  const uploadPhotoFromCamera = async () => {
    try {
      // Ask the user for the permission to access the camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
      const result = await ImagePicker.launchCameraAsync();
      // Explore the result
      console.log(result);
      if (!result.cancelled) {
        await AsyncStorage.setItem('camera_url', result.uri);
      }
    } catch(err) {
      console.log('err', err);
    }
  };

  const rootStore = useRootStore();
  const claim = rootStore.Assets.selectedClaim;

  if (!claim) {
    return <View>{/* TODO: error handling for this case */}</View>;
  }

  const renderClaim = (type: string) => {
    switch (type) {
      case "DOB":
        return <DateClaim item={claim} uploadFile={uploadFile} />;
      case "Email":
        return <EmailClaim item={claim} />;
      case "Mobile":
        return <MobileClaim item={claim} />;
      case "18+":
        return (
          <SelectClaim
            item={claim}
            uploadFile={uploadFile}
            uploadPhotoFromCamera={uploadPhotoFromCamera}
            uploadPhotoFromLibrary={uploadPhotoFromLibrary}
          />
        );
      default:
        return <OtherClaim item={claim} uploadFile={uploadFile} />;
    }
  };

  return (
    <View style={styles.claim.root}>
      <Text style={styles.claim.title}>{claim?.type}</Text>
      <Text style={styles.claim.label}>{claim?.description}</Text>
      {renderClaim(claim.type || "")}
    </View>
  );
};

export default observer(Claim);
