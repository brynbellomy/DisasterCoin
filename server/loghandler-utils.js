
const { abiFromAddress, web3 } = require('./contracts')
const SolidityCoder = require('web3/lib/solidity/coder.js')

function decodeLog(log) {
    // You might want to put the following in a loop to handle all logs in this receipt.
    let event = null
    let abi = abiFromAddress(log.address)

    for (let i = 0; i < abi.length; i++) {
        let item = abi[i]
        if (item.type != "event") {
            continue
        }
        let signature = item.name + "(" + item.inputs.map(input => input.type).join(",") + ")"
        let hash = web3.sha3(signature)
        if (hash == log.topics[0]) {
            event = item
            break
        }
    }

    if (event == null) {
        return null
    }

    let inputs = event.inputs.map(input => input.type)
    let data = SolidityCoder.decodeParams(inputs, log.data.replace("0x", ""))

    let args = {}
    for (let i = 0; i < event.inputs.length; i++) {
        args[ event.inputs[i].name ] = data[i]
    }

    return {
        event: event.name,
        args: args,
        address: log.address,
        blockNumber: log.blockNumber,
        logIndex: log.logIndex,
    }
}


module.exports = {
    decodeLog,
}