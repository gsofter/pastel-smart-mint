import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { PastelSmartMintCollection } from "../../src/types/PastelSmartMintCollection";
import { PastelSmartMintCollection__factory } from "../../src/types/factories/PastelSmartMintCollection__factory";

task("deploy:PastelSmartMintCollection").setAction(async function (taskArguments: TaskArguments, { ethers, upgrades }) {
  const collectionFactory: PastelSmartMintCollection__factory = <PastelSmartMintCollection__factory>(
    await ethers.getContractFactory("PastelSmartMintCollection")
  );

  const pastelSmartMintCollection: PastelSmartMintCollection = <PastelSmartMintCollection>(
    await upgrades.deployProxy(collectionFactory, [
      "Sample Collection",
      "SCOLLECTION",
      "ipfs://Qmdt2pqCLefbM9hdRuvxyf5PtzBxvK2No4w5xVXU89GwKi/",
      100,
      5,
      "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd",
      "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd",
    ])
  );
  await pastelSmartMintCollection.deployed();
  console.log("PastelSmartMintCollection deployed to: ", pastelSmartMintCollection.address);
});
