import { expect } from "chai";

export function shouldBehaveLikePastelSmartMintCollection(): void {
  it("collection initialization", async function () {
    const signedCollection = await this.collection.connect(this.signers.admin);

    expect(await signedCollection.symbol()).to.equal("SCOLLECTION");
    expect(await signedCollection.maxSupply()).to.equal(100);
    expect(await signedCollection.baseTokenURI()).to.equal("base_uri");
  });

  it("should work with balanceof", async function () {
    expect(await this.collection.balanceOf(this.signers.admin.address)).to.equal(0);
    expect(await this.collection.balanceOf(this.signers.alice.address)).to.equal(0);
    expect(await this.collection.balanceOf(this.signers.bob.address)).to.equal(0);
  });

  it("setBaseTokenURI should work with admin", async function () {
    await this.collection.connect(this.signers.admin).setBaseTokenURI("admin_base_token_uri");
    expect(await this.collection.baseTokenURI()).to.equal("admin_base_token_uri");
  });

  it("setBaseTokenURI should be reverted for alice", async function () {
    const aliceSignedCollection = await this.collection.connect(this.signers.alice);
    await expect(aliceSignedCollection.setBaseTokenURI("alice_base_token_uri")).to.be.revertedWith(
      "Ownable: caller is not the owner",
    );
  });

  it("setMaxSupply should work with admin", async function () {
    const adminSignedCollection = await this.collection.connect(this.signers.admin);
    await adminSignedCollection.setMaxSupply(20);
    expect(await adminSignedCollection.maxSupply()).to.equal(20);
  });

  it("setMaxSupply should be reverted for bob", async function () {
    const bobSignedCollection = await this.collection.connect(this.signers.bob);
    await expect(bobSignedCollection.setMaxSupply(30)).to.revertedWith("Ownable: caller is not the owner");
  });

  it("ownerMint should work for admin", async function () {
    const adminSignedCollection = await this.collection.connect(this.signers.admin);
    await adminSignedCollection.ownerMint(this.signers.alice.address, 3);
    expect(await this.collection.totalSupply()).to.equal(3);
    expect(await this.collection.balanceOf(this.signers.alice.address)).to.equal(3);
  });

  it("ownerMint should not work for alice", async function () {
    const signedCollection = await this.collection.connect(this.signers.alice);
    await expect(signedCollection.ownerMint(this.signers.alice.address, 3)).revertedWith(
      "Ownable: caller is not the owner",
    );
  });

  it("ownerMint should not work for over max supply", async function () {
    const signedCollection = await this.collection.connect(this.signers.admin);
    await expect(signedCollection.ownerMint(this.signers.alice.address, 30)).revertedWith("all items minted");
  });

  it("ownerMint should not work for zero", async function () {
    const signedCollection = await this.collection.connect(this.signers.admin);
    await expect(signedCollection.ownerMint(this.signers.alice.address, 0)).revertedWith("invalid mint amount");
  });
}
