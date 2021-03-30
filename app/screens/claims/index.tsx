import React, { useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import styles from "../../styles";
import { useNavigation } from "@react-navigation/core";
import { useRootStore } from "../../store/rootStore";
import { cast } from "mobx-state-tree";
import { observer } from "mobx-react-lite";

type ClaimsListItemProps = {
  onPress: () => void;
  type: string;
  description: string;
};

const ClaimListItem = ({ onPress, type, description }: ClaimsListItemProps) => (
  <TouchableOpacity
    style={styles.list.itemWrapper(styles.layout.window)}
    onPress={onPress}
  >
    <Text style={styles.list.itemName}>{type}</Text>
    <Text style={{ color: "#707070" }}>{description}</Text>
  </TouchableOpacity>
);

const ClaimSelector = () => {
  const navigation = useNavigation();
  const rootStore = useRootStore();
  const assetStore = rootStore.Assets;

  useEffect(() => {
    const claims = assetStore.loadClaims();
  }, []);

  if (assetStore.claims == null)
    return (
      <View style={styles.list.root as ViewStyle}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.list.root as ViewStyle}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, width: "100%" }}>
        {assetStore.claims.map((item, index) => {
          return (
            <ClaimListItem
              key={index}
              type={item.type}
              description={item.description}
              onPress={() => {
                rootStore.UI.update({ selectedClaim: cast(item) });
                navigation.navigate("Claim");
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default observer(ClaimSelector);
