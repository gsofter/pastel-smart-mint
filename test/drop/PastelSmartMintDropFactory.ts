import { ethers, upgrades } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { PastelSmartMintDropFactory__factory } from "../../src/types/factories/PastelSmartMintDropFactory__factory";
import type { PastelSmartMintDropFactory } from "../../src/types/PastelSmartMintDropFactory";
import { Signers } from "../types";
import { shouldBehaveLikePastelSmartMintDropFactory } from "./PastelSmartMintDropFactory.behavior";

describe("PastelSmartMintDropFactory", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];

    const factory: PastelSmartMintDropFactory__factory = <PastelSmartMintDropFactory__factory>(
      await ethers.getContractFactory("PastelSmartMintDropFactory")
    );

    this.dropFactory = <PastelSmartMintDropFactory>await upgrades.deployProxy(factory);
    await this.dropFactory.deployed();
  });

  shouldBehaveLikePastelSmartMintDropFactory();
});
