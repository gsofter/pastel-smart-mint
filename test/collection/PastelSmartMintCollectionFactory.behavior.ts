import { expect } from "chai";

export function shouldBehaveLikePastelSmartMintCollectionFactory(): void {
  it("factory initialization", async function () {
    const signedFactory = await this.collectionFactory.connect(this.signers.admin);

    expect(signedFactory.psmCollections.length).to.equal(0);
    expect(signedFactory.address).to.not.equal(null);
  });

  it("createCollection should work for admin", async function () {
    const signedFactory = await this.collectionFactory.connect(this.signers.admin);

    await signedFactory.createCollection(
      "TEST Collection",
      "TEST",
      "base_uri",
      10,
      5,
      "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd",
      "0xFFf50b1b9154b0631591DAB746c5Fc8f41Dc44Bd",
    );
    const deployedCollection = await this.collectionFactory.psmCollections(0);
    expect(deployedCollection).to.not.equal(null);
  });

  it("createCollection should be reverted for Alice", async function () {
    const signedFactory = await this.collectionFactory.connect(this.signers.alice);

    await expect(
      signedFactory.createCollection(
        "TEST Collection",
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
