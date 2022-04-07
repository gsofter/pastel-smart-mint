import { expect } from "chai";

export function shouldBehaveLikePastelSmartMintDrop(): void {
  it("drop initialization", async function () {
    const signedDrop = await this.drop.connect(this.signers.admin);

    expect(await signedDrop.symbol()).to.equal("SDROP");
    expect(await signedDrop.maxSupply()).to.equal(100);
    expect(await signedDrop.baseTokenURI()).to.equal("base_uri");
  });

  it("should work with balanceof", async function () {
    expect(await this.drop.balanceOf(this.signers.admin.address)).to.equal(0);
    expect(await this.drop.balanceOf(this.signers.alice.address)).to.equal(0);
    expect(await this.drop.balanceOf(this.signers.bob.address)).to.equal(0);
  });

  it("setBaseTokenURI should work with admin", async function () {
    await this.drop.connect(this.signers.admin).setBaseTokenURI("admin_base_token_uri");
    expect(await this.drop.baseTokenURI()).to.equal("admin_base_token_uri");
  });

  it("setBaseTokenURI should be reverted for alice", async function () {
    const aliceSignedDrop = await this.drop.connect(this.signers.alice);
    await expect(aliceSignedDrop.setBaseTokenURI("alice_base_token_uri")).to.be.revertedWith(
      "Ownable: caller is not the owner",
    );
  });

  it("setMaxSupply should work with admin", async function () {
    const adminSignedDrop = await this.drop.connect(this.signers.admin);
    await adminSignedDrop.setMaxSupply(20);
    expect(await adminSignedDrop.maxSupply()).to.equal(20);
  });

  it("setMaxSupply should be reverted for bob", async function () {
    const bobSignedDrop = await this.drop.connect(this.signers.bob);
    await expect(bobSignedDrop.setMaxSupply(30)).to.revertedWith("Ownable: caller is not the owner");
  });
}
