import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { PastelSmartMintDrop } from "../../src/types/PastelSmartMintDrop";
import { PastelSmartMintDrop__factory } from "../../src/types/factories/PastelSmartMintDrop__factory";

task("deploy:PastelSmartMintDrop").setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
  const dropFactory: PastelSmartMintDrop__factory = <PastelSmartMintDrop__factory>(
    await ethers.getContractFactory("PastelSmartMintDrop")
  );

  const pastelSmartMintDrop: PastelSmartMintDrop = <PastelSmartMintDrop>(
    await upgrades.deployProxy(dropFactory, [
      "Sample Drop",
      "SDROP",
      "ipfs://Qmdt2pqCLefbM9hdRuvxyf5PtzBxvK2No4w5xVXU89GwKi/",
      100,
    ])
  );
  await pastelSmartMintDrop.deployed();
  console.log("PastelSmartMintDrop deployed to: ", pastelSmartMintDrop.address);
});
