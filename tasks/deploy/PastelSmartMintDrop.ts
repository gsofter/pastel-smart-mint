import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { PastelSmartMintDrop } from "../../src/types/PastelSmartMintDrop";
import { PastelSmartMintDrop__factory } from "../../src/types/factories/PastelSmartMintDrop__factory";

task("deploy:PastelSmartMintDrop").setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
  const dropFactory: PastelSmartMintDrop__factory = <PastelSmartMintDrop__factory>(
    await ethers.getContractFactory("PastelSmartMintDrop")
  );

  const pastelSmartMintDrop: PastelSmartMintDrop = <PastelSmartMintDrop>await upgrades.deployProxy(dropFactory, [
    "Sample Drop",
    "SDROP",
    "ipfs://Qmdt2pqCLefbM9hdRuvxyf5PtzBxvK2No4w5xVXU89GwKi/",
    100, // total supply
    5, // royalties percentage
    "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd", // primary wallet
    "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd", // secondary wallet
  ]);
  await pastelSmartMintDrop.deployed();
  console.log("PastelSmartMintDrop deployed to: ", pastelSmartMintDrop.address);
});
