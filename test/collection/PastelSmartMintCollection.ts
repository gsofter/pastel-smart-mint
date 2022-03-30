import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { PastelSmartMintCollection } from "../../src/types/PastelSmartMintCollection";
import { Signers } from "../types";
import { shouldBehaveLikePastelSmartMintCollection } from "./PastelSmartMintCollection.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];
  });

  describe("PastelSmartMintCollection", function () {
    beforeEach(async function () {
      const collectionArtifact: Artifact = await artifacts.readArtifact("PastelSmartMintCollection");
      this.collection = <PastelSmartMintCollection>(
        await waffle.deployContract(this.signers.admin, collectionArtifact, [
          "Test NFT Collection",
          "TEST",
          "base_uri",
          10,
        ])
      );
    });

    shouldBehaveLikePastelSmartMintCollection();
  });
});
