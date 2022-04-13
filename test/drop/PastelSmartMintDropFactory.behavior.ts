import { expect } from "chai";

export function shouldBehaveLikePastelSmartMintDropFactory(): void {
  it("factory initialization", async function () {
    const signedFactory = await this.dropFactory.connect(this.signers.admin);

    expect(signedFactory.psmDrops.length).to.equal(0);
    expect(signedFactory.address).to.not.equal(null);
  });

  it("createDrop should work for admin", async function () {
    const signedFactory = await this.dropFactory.connect(this.signers.admin);

    await signedFactory.createDrop(
      "TEST Drop",
      "TEST",
      "base_uri",
      10,
      5,
      "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd",
      "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd",
    );
    const deployedDrop = await this.dropFactory.psmDrops(0);
    expect(deployedDrop).to.not.equal(null);
  });

  it("createDrop should be reverted for Alice", async function () {
    const signedFactory = await this.dropFactory.connect(this.signers.alice);

    await expect(
      signedFactory.createDrop(
        "TEST Drop",
        "TEST",
        "base_uri",
        10,
        5,
        "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd",
        "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd",
      ),
    ).to.revertedWith("Ownable: caller is not the owner");
  });
}
