const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
    // let SimpleStorageFactory
    // let simpleStorage
    let SimpleStorageFactory, simpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Your expected value is 0 as a favorite Number", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // assert
        // expect
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("should update when we call store function", async function () {
        const expectedValueStore = "7"
        const transactionResponse = await simpleStorage.store(
            expectedValueStore
        )
        await transactionResponse.wait(1)
        const currentValueStore = await simpleStorage.retrieve()
        assert.equal(currentValueStore.toString(), expectedValueStore)
    })
    it("Should add the Person", async function () {
        const f_no = "1729"
        const myName = "naman"
        const transactionResponse = await simpleStorage.addPerson(myName, f_no)
        await transactionResponse.wait(1);
        // let fetch_f_no,fetch_name
        // const { favoriteNumber, name } = await simpleStorage.people(0)

        const response = await simpleStorage.people(0);
        assert.equal(response.favoriteNumber.toString(),f_no)
        assert.equal(response.name,myName)
    })
})
