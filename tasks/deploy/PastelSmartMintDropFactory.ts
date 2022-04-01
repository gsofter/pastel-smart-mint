import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { PastelSmartMintDropFactory } from "../../src/types/PastelSmartMintDropFactory";
import { PastelSmartMintDropFactory__factory } from "../../src/types/factories/PastelSmartMintDropFactory__factory";

task("deploy:PastelSmartMintDropFactory").setAction(async function (
  taskArguments: TaskArguments,
  { ethers, upgrades },
) {
  const factory: PastelSmartMintDropFactory__factory = <PastelSmartMintDropFactory__factory>(
    await ethers.getContractFactory("PastelSmartMintDropFactory")
  );
  const pastelSmartMintDropFactory: PastelSmartMintDropFactory = <PastelSmartMintDropFactory>(
    await await upgrades.deployProxy(factory)
  );
  await pastelSmartMintDropFactory.deployed();
  console.log("PastelSmartMintDropFactory deployed to: ", pastelSmartMintDropFactory.address);
});

task("upgrade:PastelSmartMintDropFactory")
  .addParam("address", "Proxy address")
  .setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
    const factory: PastelSmartMintDropFactory__factory = <PastelSmartMintDropFactory__factory>(
      await ethers.getContractFactory("PastelSmartMintDropFactory")
    );
    const pastelSmartMintDropFactory: PastelSmartMintDropFactory = <PastelSmartMintDropFactory>(
      await await upgrades.upgradeProxy(taskArguments.address, factory)
    );
    await pastelSmartMintDropFactory.deployed();
    console.log("PastelSmartMintDropFactory deployed to: ", pastelSmartMintDropFactory.address);
  });
