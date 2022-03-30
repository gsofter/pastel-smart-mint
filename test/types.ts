import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { Fixture } from "ethereum-waffle";

import type { PastelSmartMintCollection } from "../src/types/PastelSmartMintCollection";
import type { PastelSmartMintCollectionFactory } from "../src/types/PastelSmartMintCollectionFactory";

declare module "mocha" {
  export interface Context {
    collection: PastelSmartMintCollection;
    collectionFactory: PastelSmartMintCollectionFactory;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
}
