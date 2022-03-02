import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { PastelPigeon } from "../../src/types/PastelPigeon";
import { PastelPigeon__factory } from "../../src/types/factories/PastelPigeon__factory";

task("deploy:PastelPigeon").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const PastelPigeonFactory: PastelPigeon__factory = <PastelPigeon__factory>(
    await ethers.getContractFactory("PastelPigeon")
  );
  const pastelPigeon: PastelPigeon = <PastelPigeon>(
    await PastelPigeonFactory.deploy("0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd")
  );
  await pastelPigeon.deployed();
  console.log("PastelPigeon deployed to: ", pastelPigeon.address);
});
