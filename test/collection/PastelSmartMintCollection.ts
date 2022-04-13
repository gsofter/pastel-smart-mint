import { ethers, upgrades } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { PastelSmartMintCollection } from "../../src/types/PastelSmartMintCollection";
import type { PastelSmartMintCollection__factory } from "../../src/types/factories/PastelSmartMintCollection__factory";
import { Signers } from "../types";
import { shouldBehaveLikePastelSmartMintCollection } from "./PastelSmartMintCollection.behavior";

describe("PastelSmartMintCollection", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];

    const collectionFactory: PastelSmartMintCollection__factory = <PastelSmartMintCollection__factory>(
      await ethers.getContractFactory("PastelSmartMintCollection")
    );

    this.collection = <PastelSmartMintCollection>(
      await upgrades.deployProxy(collectionFactory, [
        "Sample Collection",
        "SCOLLECTION",
        "base_uri",
        100,
        5,
        "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd",
        "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd",
      ])
    );
    await this.collection.deployed();
  });

  shouldBehaveLikePastelSmartMintCollection();
});
