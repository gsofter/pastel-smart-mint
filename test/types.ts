import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { Fixture } from "ethereum-waffle";

import type { PastelSmartMintCollection } from "../src/types/PastelSmartMintCollection";
import type { PastelSmartMintDrop } from "../src/types/PastelSmartMintDrop";
import type { PastelSmartMintCollectionFactory } from "../src/types/PastelSmartMintCollectionFactory";
import type { PastelSmartMintDropFactory } from "../src/types/PastelSmartMintDropFactory";

declare module "mocha" {
  export interface Context {
    collection: PastelSmartMintCollection;
    collectionFactory: PastelSmartMintCollectionFactory;
    drop: PastelSmartMintDrop;
    dropFactory: PastelSmartMintDropFactory;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
}
