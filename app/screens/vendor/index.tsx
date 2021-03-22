﻿﻿﻿import React from "react";
import { Text, View, FlatList, ViewStyle } from "react-native";
import styles from "../../styles";
import Button from "../../components/Button";
import vendorRegister from "../../helpers/site/register";
import { useRootStore } from "../../store/rootStore";
import { observer } from "mobx-react-lite";

const Vendor = () => {
  const rootStore = useRootStore();
  const vendor = rootStore.UI.selectedVendor;
  // const claims = rootStore.Assets.claims.filter(claim=> claim.vendorId == vendor.id)
  const claims: any[] = [];

  if (vendor == null) return null;

  return (
    <View style={styles.vendor.root as ViewStyle}>
      <Text style={styles.vendor.title}>{vendor.name}</Text>
      <Text style={styles.vendor.url}>{vendor.url}</Text>
      <Text style={styles.vendor.description}>{vendor.description}</Text>
      <View style={styles.vendor.claimsWrapper(styles.layout.window)}>
        <Text style={styles.vendor.claimsTitle}>Claims requested</Text>
        <FlatList
          data={claims}
          renderItem={({ item }) => (
            <Text style={styles.vendor.claimValue}>{Object.keys(item)[0]}</Text>
          )}
        />
      </View>
      <Button
        title="Register"
        style={styles.vendor.registerButton as ViewStyle}
        onPress={() => vendorRegister(vendor)}
      />
    </View>
  );
};

export default observer(Vendor);