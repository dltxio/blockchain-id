import AsyncStorage from "@react-native-async-storage/async-storage";
import { types, Instance, flow } from "mobx-state-tree";
import { AssetType, fetchAssets } from "../helpers/assets";

export const Claim = types
  .model({
    key: types.identifier,
    type: types.string,
    description: types.string,
    value: types.maybe(types.string),
    verify: false,
    verifiedBy: types.array(types.string),
  })
  .views((self) => ({
    get isVerified() {
      // TODO: figure out how this should work
      return true;
    },
  }))
  .actions((self) => ({
    setValue: flow(function* (value: any) {
      self.value = value;
      const claimDataString: string | null = yield AsyncStorage.getItem(
        self.key,
      );
      let claimData = JSON.parse(claimDataString || "{}");
      claimData.value = value;
      claimData.verify = true;
      yield AsyncStorage.setItem(self.key, JSON.stringify(claimData));
    }),
  }));
export interface IClaim extends Instance<typeof Claim> {}

export const Vendor = types.model({
  key: types.identifier,
  url: types.string,
  name: types.string,
  description: types.string,
  registration: types.string,
  affiliation: types.maybe(types.string),
});

export const AssetStore = types
  .model({
    claims: types.array(Claim),
    vendors: types.array(Vendor),
  })
  .volatile((self) => ({
    selectedClaimKey: "",
    selectedVendorKey: "",
  }))
  .views((self) => ({
    get selectedClaim() {
      return self.claims.find((claim) => claim.key === self.selectedClaimKey);
    },
    get selectedVendor() {
      return self.vendors.find(
        (vendor) => vendor.key === self.selectedVendorKey,
      );
    },
    get selectedVendorClaims() {
      return self.claims.filter((claim) =>
        claim.verifiedBy.includes(self.selectedVendorKey),
      );
    },
  }))
  .actions((self) => ({
    setClaimKey: (key: string) => {
      self.selectedClaimKey = key;
    },
    setVendorKey: (key: string) => {
      self.selectedVendorKey = key;
    },
    loadClaims: flow(function* () {
      const claims: any[] = yield fetchAssets(AssetType.Claims);
      self.claims = yield Promise.all(
        claims.map(async (claim) => {
          const claimDataString = await AsyncStorage.getItem(claim.key);
          return { ...claim, ...JSON.parse(claimDataString || "{}") };
        }),
      );
    }),
    loadVendors: flow(function* () {
      const vendors = yield fetchAssets(AssetType.Vendors);
      self.vendors = vendors;
    }),
  }));
