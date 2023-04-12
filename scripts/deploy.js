// imports

const { Contract } = require("ethers")
const { ethers, run, network } = require("hardhat")

// async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying Contract .. .. .. ..")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contract to: ${simpleStorage.address}`)
    // what happens when we deploy to our hardhat network?
    // 11155111 == 11155111 --> true
    // 11155111 == "11155111" --> true
    // 11155111 === "11155111" -->false
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    // Updating the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract .. .. .. ")
    try {
        await run("verify:verify", {
            address: contractAddress,
            contructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
