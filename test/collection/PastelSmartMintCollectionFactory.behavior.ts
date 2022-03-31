import { expect } from "chai";

export function shouldBehaveLikePastelSmartMintCollectionFactory(): void {
  it("factory initialization", async function () {
    const signedFactory = await this.collectionFactory.connect(this.signers.admin);

    expect(signedFactory.psmCollections.length).to.equal(0);
    expect(signedFactory.address).to.not.equal(null);
  });

  it("createCollection should work for admin", async function () {
    const signedFactory = await this.collectionFactory.connect(this.signers.admin);

    await signedFactory.createCollection("TEST Collection", "TEST", "base_uri", 10);
    const deployedCollection = await this.collectionFactory.psmCollections(0);
    expect(deployedCollection).to.not.equal(null);
  });

  it("createCollection should be reverted for admin", async function () {
    const signedFactory = await this.collectionFactory.connect(this.signers.alice);

    await expect(signedFactory.createCollection("TEST Collection", "TEST", "base_uri", 10)).to.revertedWith(
      "Ownable: caller is not the owner",
    );
  });
}
