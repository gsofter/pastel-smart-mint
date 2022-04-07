import { ethers, upgrades } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { PastelSmartMintCollectionFactory__factory } from "../../src/types/factories/PastelSmartMintCollectionFactory__factory";
import type { PastelSmartMintCollectionFactory } from "../../src/types/PastelSmartMintCollectionFactory";
import { Signers } from "../types";
import { shouldBehaveLikePastelSmartMintCollectionFactory } from "./PastelSmartMintCollectionFactory.behavior";

describe("PastelSmartMintCollectionFactory", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];

    const factory: PastelSmartMintCollectionFactory__factory = <PastelSmartMintCollectionFactory__factory>(
      await ethers.getContractFactory("PastelSmartMintCollectionFactory")
    );

    this.collectionFactory = <PastelSmartMintCollectionFactory>await upgrades.deployProxy(factory);
    await this.collectionFactory.deployed();
  });

  shouldBehaveLikePastelSmartMintCollectionFactory();
});
