import { ethers, upgrades } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { PastelSmartMintDrop } from "../../src/types/PastelSmartMintDrop";
import type { PastelSmartMintDrop__factory } from "../../src/types/factories/PastelSmartMintDrop__factory";
import { Signers } from "../types";
import { shouldBehaveLikePastelSmartMintDrop } from "./PastelSmartMintDrop.behavior";

describe("PastelSmartMintDrop", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];

    const dropFactory: PastelSmartMintDrop__factory = <PastelSmartMintDrop__factory>(
      await ethers.getContractFactory("PastelSmartMintDrop")
    );

    this.drop = <PastelSmartMintDrop>await upgrades.deployProxy(dropFactory, ["Sample Drop", "SDROP", "base_uri", 100]);
    await this.drop.deployed();
  });

  shouldBehaveLikePastelSmartMintDrop();
});
