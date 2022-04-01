import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { PastelSmartMintCollectionFactory } from "../../src/types/PastelSmartMintCollectionFactory";
import { PastelSmartMintCollectionFactory__factory } from "../../src/types/factories/PastelSmartMintCollectionFactory__factory";

task("deploy:PastelSmartMintCollectionFactory").setAction(async function (
  taskArguments: TaskArguments,
  { ethers, upgrades },
) {
  const factory: PastelSmartMintCollectionFactory__factory = <PastelSmartMintCollectionFactory__factory>(
    await ethers.getContractFactory("PastelSmartMintCollectionFactory")
  );
  const pastelSmartMintCollectionFactory: PastelSmartMintCollectionFactory = <PastelSmartMintCollectionFactory>(
    await upgrades.deployProxy(factory)
  );
  await pastelSmartMintCollectionFactory.deployed();
  console.log("PastelSmartMintCollectionFactory deployed to: ", pastelSmartMintCollectionFactory.address);
});

task("upgrade:PastelSmartMintCollectionFactory")
  .addParam("address", "Proxy address")
  .setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
    const factory: PastelSmartMintCollectionFactory__factory = <PastelSmartMintCollectionFactory__factory>(
      await ethers.getContractFactory("PastelSmartMintCollectionFactory")
    );
    const pastelSmartMintCollectionFactory: PastelSmartMintCollectionFactory = <PastelSmartMintCollectionFactory>(
      await upgrades.upgradeProxy(taskArguments.address, factory)
    );
    await pastelSmartMintCollectionFactory.deployed();
    console.log("PastelSmartMintCollectionFactory deployed to: ", pastelSmartMintCollectionFactory.address);
  });
