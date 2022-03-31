import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { PastelSmartMintDrop } from "../../src/types/PastelSmartMintDrop";
import { Signers } from "../types";
import { shouldBehaveLikePastelSmartMintDrop } from "./PastelSmartMintDrop.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];
  });

  describe("PastelSmartMintDrop", function () {
    beforeEach(async function () {
      const dropArtifact: Artifact = await artifacts.readArtifact("PastelSmartMintDrop");
      this.drop = <PastelSmartMintDrop>(
        await waffle.deployContract(this.signers.admin, dropArtifact, ["Test NFT Drop", "TEST", "base_uri", 10])
      );
    });

    shouldBehaveLikePastelSmartMintDrop();
  });
});
