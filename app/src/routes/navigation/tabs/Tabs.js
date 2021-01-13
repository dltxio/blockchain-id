import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import { colors } from "theme";

// stack navigators
import { ClaimsNavigator } from "../stacks";
import {SettingsNavigator, VendorsNavigator} from "../stacks/Stacks";

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }) => {
        const iconFromRouteName = {
          "Claims": "address-book",
          "3rd Parties": "university",
          "Settings": "cog",
        };

        return (
          <FontIcon
            name={iconFromRouteName[route.name] ?? "square"}
            color={focused ? colors.lightPurple : colors.gray}
            size={20}
            solid
          />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.lightPurple,
      inactiveTintColor: colors.gray,
      style: {
        // backgroundColor: "white",
        // borderTopColor: "gray",
        // borderTopWidth: 1,
        // paddingBottom: 5,
        // paddingTop: 5,
      },
    }}
    initialRouteName="Claims"
    swipeEnabled={false}
  >
    <Tab.Screen name="Claims" component={ClaimsNavigator} />
    <Tab.Screen name="3rd Parties" component={VendorsNavigator} />
    <Tab.Screen name="Settings" component={SettingsNavigator} />
  </Tab.Navigator>
);

export default TabNavigator;
