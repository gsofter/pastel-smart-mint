import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { PastelSmartMintCollectionFactory } from "../../src/types/PastelSmartMintCollectionFactory";
import { Signers } from "../types";
import { shouldBehaveLikePastelSmartMintCollectionFactory } from "./PastelSmartMintCollectionFactory.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];
  });

  describe("PastelSmartMintCollectionFactory", function () {
    beforeEach(async function () {
      const factoryArtifact: Artifact = await artifacts.readArtifact("PastelSmartMintCollectionFactory");
      this.collectionFactory = <PastelSmartMintCollectionFactory>(
        await waffle.deployContract(this.signers.admin, factoryArtifact)
      );
    });

    shouldBehaveLikePastelSmartMintCollectionFactory();
  });
});
