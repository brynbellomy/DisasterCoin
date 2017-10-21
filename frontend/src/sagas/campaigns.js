import { all, put, takeEvery } from 'redux-saga/effects'
import { storeCampaigns, storeCampaign } from '../actions/campaignActions'
import { FETCH_CAMPAIGNS, FETCH_CAMPAIGN, CREATE_CAMPAIGN, DONATE_CAMPAIGN, WITHDRAW_CAMPAIGN } from '../constants/CampaignActionTypes'
import { push } from 'react-router-redux'
import * as contracts from '../contracts'
const campaignABI = {
  "contract_name": "Campaign",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "getFlaggers",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "campaignFlagged",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "weiLimitPerBlock",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "returnFunds",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "goalAmount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "deadline",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "vendor",
          "type": "address"
        },
        {
          "name": "tag",
          "type": "bytes32"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "disburseFunds",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "flagVotes",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "cumulativeBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "stopFlaggedCampaign",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "tag",
          "type": "bytes32"
        }
      ],
      "name": "addTag",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "weiWithdrawnSoFar",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTags",
      "outputs": [
        {
          "name": "",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "flagCampaign",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "changeOwner",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "tag",
          "type": "bytes32"
        }
      ],
      "name": "donate",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": true,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "currentBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getDonations",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        },
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getFundsByTag",
      "outputs": [
        {
          "name": "",
          "type": "bytes32[]"
        },
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_goalAmount",
          "type": "uint256"
        },
        {
          "name": "_vendors",
          "type": "address"
        },
        {
          "name": "_weiLimitPerBlock",
          "type": "uint256"
        },
        {
          "name": "_deadline",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "LogDonation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "LogWithdrawl",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "LogPaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "LogFundsTransfered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "tag",
          "type": "bytes32"
        }
      ],
      "name": "LogCampaignTagAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "LogFlagCampaign",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "LogReturnFunds",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "supplier",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "tag",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "LogDisburseFunds",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "newIpfsHash",
          "type": "bytes32"
        }
      ],
      "name": "LogSetNewIpfs",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "flaggedStatus",
          "type": "bool"
        }
      ],
      "name": "LogStopFlaggedCampaign",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "oldOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "LogNewOwner",
      "type": "event"
    }
  ],
  "unlinked_binary": "0x606060405234156200001057600080fd5b6040516200193438038062001934833981016040528080518201919060200180519190602001805191906020018051919060200180519150505b5b60008054600160a060020a03191633600160a060020a03161790555b60058580516200007c929160200190620000be565b50600484905560018054600160a060020a031916600160a060020a038516179055600b829055438101600d556015805460ff191690555b505050505062000168565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200010157805160ff191683800117855562000131565b8280016001018555821562000131579182015b828111156200013157825182559160200191906001019062000114565b5b506200014092915062000144565b5090565b6200016591905b808211156200014057600081556001016200014b565b5090565b90565b6117bc80620001786000396000f3006060604052361561010c5763ffffffff60e060020a6000350416630224c817811461011157806306b12b321461017857806306fdde031461019f57806312065fe01461022a5780631ab9cbe01461024f5780631eb5ea2e146102745780632636b9451461028957806329dcb0cf146102ae5780632aca5e4a146102d35780633af7da3c146102fa5780634b472d451461031f57806362514fb51461034457806364daeee71461036b5780638da5cb5b146103955780638e7c7064146103c4578063995d9ab7146103e95780639e57a34b14610450578063a6f9dae114610477578063c37067fa146104aa578063ce845d1d146104c9578063e25f8416146104ee578063e72142371461059c575b600080fd5b341561011c57600080fd5b61012461064a565b60405160208082528190810183818151815260200191508051906020019060200280838360005b838110156101645780820151818401525b60200161014b565b505050509050019250505060405180910390f35b341561018357600080fd5b61018b6106b2565b604051901515815260200160405180910390f35b34156101aa57600080fd5b6101b26106bb565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101ef5780820151818401525b6020016101d6565b50505050905090810190601f16801561021c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561023557600080fd5b61023d610759565b60405190815260200160405180910390f35b341561025a57600080fd5b61023d610760565b60405190815260200160405180910390f35b341561027f57600080fd5b610287610766565b005b341561029457600080fd5b61023d61082b565b60405190815260200160405180910390f35b34156102b957600080fd5b61023d610831565b60405190815260200160405180910390f35b34156102de57600080fd5b610287600160a060020a0360043516602435604435610837565b005b341561030557600080fd5b61023d610a5b565b60405190815260200160405180910390f35b341561032a57600080fd5b61023d610a61565b60405190815260200160405180910390f35b341561034f57600080fd5b61018b610a67565b604051901515815260200160405180910390f35b341561037657600080fd5b61018b600435610af9565b604051901515815260200160405180910390f35b34156103a057600080fd5b6103a8610bd7565b604051600160a060020a03909116815260200160405180910390f35b34156103cf57600080fd5b61023d610be6565b60405190815260200160405180910390f35b34156103f457600080fd5b610124610bec565b60405160208082528190810183818151815260200191508051906020019060200280838360005b838110156101645780820151818401525b60200161014b565b505050509050019250505060405180910390f35b341561045b57600080fd5b61018b610c4b565b604051901515815260200160405180910390f35b341561048257600080fd5b61018b600160a060020a0360043516610edf565b604051901515815260200160405180910390f35b61018b600435610fa3565b604051901515815260200160405180910390f35b34156104d457600080fd5b61023d6111d1565b60405190815260200160405180910390f35b34156104f957600080fd5b6105016111d7565b604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b838110156105465780820151818401525b60200161052d565b50505050905001838103825284818151815260200191508051906020019060200280838360005b838110156105865780820151818401525b60200161056d565b5050505090500194505050505060405180910390f35b34156105a757600080fd5b6105016114a7565b604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b838110156105465780820151818401525b60200161052d565b50505050905001838103825284818151815260200191508051906020019060200280838360005b838110156105865780820151818401525b60200161056d565b5050505090500194505050505060405180910390f35b61065261175a565b601180546020808202016040519081016040528092919081815260200182805480156106a757602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610689575b505050505090505b90565b60155460ff1681565b60058054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107515780601f1061072657610100808354040283529160200191610751565b820191906000526020600020905b81548152906001019060200180831161073457829003601f168201915b505050505081565b6002545b90565b600b5481565b600043600d5410151561077857600080fd5b50600160a060020a03331660009081526006602052604081205490811161079e57600080fd5b600160a060020a0333166000818152600660205260408082209190915582156108fc0290839051600060405180830381858888f1935050505015156107e257600080fd5b7fea3f672f65a0bca7224ef7cb18490051f6113a0a69283e71bbccfef490e0c70c3382604051600160a060020a03909216825260208201526040908101905180910390a15b5b50565b60045481565b600d5481565b60005433600160a060020a0390811691161461085257600080fd5b600d5443901061086157600080fd5b60155460ff161561087157600080fd5b80600b54600d5443030281600c54011115151561088d57600080fd5b600154600160a060020a031663171029ad8460006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b15156108de57600080fd5b6102c65a03f115156108ef57600080fd5b50505060405180519050151561090457600080fd5b600154600160a060020a03166359651b57858560006040516020015260405160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401602060405180830381600087803b151561096357600080fd5b6102c65a03f1151561097457600080fd5b50505060405180519050151561098957600080fd5b6000838152600a6020526040902054829010156109a557600080fd5b6002805483900390556000838152600a60205260409081902080548490039055600160a060020a0385169083156108fc0290849051600060405180830381858888f1935050505015156109f757600080fd5b600c8054830190557f4adac0c938c5ec4087fcc442b0ffcddbc400e10e598af0348d5ea570796682c1848484604051600160a060020a03909316835260208301919091526040808301919091526060909101905180910390a15b5b505b5b5b505050565b60145481565b60035481565b600043600d54101515610a7957600080fd5b6032600354601454811515610a8a57fe5b04606402111515610a9a57600080fd5b60155460ff1615610aaa57600080fd5b6015805460ff1916600117908190557f9be9e683ac1619becc13e8ec3f275c481549783b6405e14be0307c51e56202509060ff16604051901515815260200160405180910390a15060015b5b90565b60008054819033600160a060020a03908116911614610b1757600080fd5b73__Bytes32SetLib_________________________6363d4d335600e8560006040516020015260405160e060020a63ffffffff85160281526004810192909252602482015260440160206040518083038186803b1515610b7657600080fd5b6102c65a03f41515610b8757600080fd5b50505060405180519150508015610bcc577fa51bb46f78abe5307b0c5defe3b45537d2e07542136dfc53a81952307d3178858360405190815260200160405180910390a15b8091505b5b50919050565b600054600160a060020a031681565b600c5481565b610bf461175a565b600e80546020808202016040519081016040528092919081815260200182805480156106a757602002820191906000526020600020905b81548152600190910190602001808311610c2b575b505050505090505b90565b600073__AddressSetLib_________________________63dc02e70d601133846040516020015260405160e060020a63ffffffff85160281526004810192909252600160a060020a0316602482015260440160206040518083038186803b1515610cb457600080fd5b6102c65a03f41515610cc557600080fd5b5050506040518051159050610cd957600080fd5b73__AddressSetLib_________________________63dc02e70d60073360006040516020015260405160e060020a63ffffffff85160281526004810192909252600160a060020a0316602482015260440160206040518083038186803b1515610d4157600080fd5b6102c65a03f41515610d5257600080fd5b505050604051805190501515610d6757600080fd5b73__AddressSetLib_________________________63dc02e70d60113360006040516020015260405160e060020a63ffffffff85160281526004810192909252600160a060020a0316602482015260440160206040518083038186803b1515610dcf57600080fd5b6102c65a03f41515610de057600080fd5b5050506040518051159050610df457600080fd5b33600160a060020a0381166000908152600660205260408082205460148054909101905573__AddressSetLib_________________________92631e40161692601192516020015260405160e060020a63ffffffff85160281526004810192909252600160a060020a0316602482015260440160206040518083038186803b1515610e7e57600080fd5b6102c65a03f41515610e8f57600080fd5b50505060405180519050507f5f873ee0636a4e5e81f74a267d4d41c768d1f586cd7d7207b6795b8703de1cd333604051600160a060020a03909116815260200160405180910390a15060015b5b90565b6000805433600160a060020a03908116911614610efb57600080fd5b600160a060020a0382161515610f1057600080fd5b6000547f95a4124b32fadd40e6e63088992a62e3505e61d1683b783d03e575d7c1dfb967903390600160a060020a031684604051600160a060020a03938416815291831660208301529091166040808301919091526060909101905180910390a1506000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03831617905560015b5b919050565b60155460009060ff1615610fb657600080fd5b8115806110ac5750600154600160a060020a031663171029ad8360006040516020015260405160e060020a63ffffffff84160281526004810191909152602401602060405180830381600087803b151561100f57600080fd5b6102c65a03f1151561102057600080fd5b5050506040518051905080156110ac575073__Bytes32SetLib_________________________633fb5a9f3600e8460006040516020015260405160e060020a63ffffffff85160281526004810192909252602482015260440160206040518083038186803b151561109057600080fd5b6102c65a03f415156110a157600080fd5b505050604051805190505b5b15156110b857600080fd5b6000828152600a6020908152604080832080543490810190915533600160a060020a03811685526006909352818420805482019055600280548201905560038054909101905573__AddressSetLib_________________________92631e40161692600792909190516020015260405160e060020a63ffffffff85160281526004810192909252600160a060020a0316602482015260440160206040518083038186803b151561116757600080fd5b6102c65a03f4151561117857600080fd5b50505060405180519050507f615b82d09530cb171fb9954512b751ee6d5197d08431b056ca6e8c3d8aca68113334604051600160a060020a03909216825260208201526040908101905180910390a15060015b5b919050565b60025481565b6111df61175a565b6111e761175a565b6111ef61175a565b6111f761175a565b600073__AddressSetLib_________________________631d4cf6c46007836040516020015260405160e060020a63ffffffff8416028152600481019190915260240160206040518083038186803b151561125157600080fd5b6102c65a03f4151561126257600080fd5b505050604051805190506040518059106112795750595b908082528060200260200182016040525b50925073__AddressSetLib_________________________631d4cf6c4600760006040516020015260405160e060020a63ffffffff8416028152600481019190915260240160206040518083038186803b15156112e657600080fd5b6102c65a03f415156112f757600080fd5b5050506040518051905060405180591061130e5750595b908082528060200260200182016040525b509150600090505b73__AddressSetLib_________________________631d4cf6c4600760006040516020015260405160e060020a63ffffffff8416028152600481019190915260240160206040518083038186803b151561138057600080fd5b6102c65a03f4151561139157600080fd5b505050604051805190508110156114995773__AddressSetLib_________________________63da5d234860078360006040516020015260405160e060020a63ffffffff85160281526004810192909252602482015260440160206040518083038186803b151561140157600080fd5b6102c65a03f4151561141257600080fd5b5050506040518051905083828151811061142857fe5b600160a060020a039092166020928302909101909101526006600084838151811061144f57fe5b90602001906020020151600160a060020a0316600160a060020a031681526020019081526020016000205482828151811061148657fe5b602090810290910101525b600101611327565b8282945094505b5050509091565b6114af61175a565b6114b761175a565b6114bf61175a565b6114c761175a565b600073__Bytes32SetLib_________________________636de9408a600e836040516020015260405160e060020a63ffffffff8416028152600481019190915260240160206040518083038186803b151561152157600080fd5b6102c65a03f4151561153257600080fd5b505050604051805190506040518059106115495750595b908082528060200260200182016040525b50925073__Bytes32SetLib_________________________636de9408a600e60006040516020015260405160e060020a63ffffffff8416028152600481019190915260240160206040518083038186803b15156115b657600080fd5b6102c65a03f415156115c757600080fd5b505050604051805190506040518059106115de5750595b908082528060200260200182016040525b509150600090505b73__Bytes32SetLib_________________________636de9408a600e60006040516020015260405160e060020a63ffffffff8416028152600481019190915260240160206040518083038186803b151561165057600080fd5b6102c65a03f4151561166157600080fd5b505050604051805190508110156114995773__Bytes32SetLib_________________________639542d9d9600e8360006040516020015260405160e060020a63ffffffff85160281526004810192909252602482015260440160206040518083038186803b15156116d157600080fd5b6102c65a03f415156116e257600080fd5b505050604051805190508382815181106116f857fe5b60209081029091010152600a600084838151811061171257fe5b90602001906020020151815260208101919091526040016000205482828151811061173957fe5b602090810290910101525b6001016115f7565b8282945094505b5050509091565b60206040519081016040526000815290565b60206040519081016040526000815290565b602060405190810160405260008152905600a165627a7a723058202723e37093863a6533f431fb217a3386c0ddc50fc74b7545cf34d7c13811d15d0029",
  "networks": {
    "1508597412246": {
      "events": {
        "0x615b82d09530cb171fb9954512b751ee6d5197d08431b056ca6e8c3d8aca6811": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogDonation",
          "type": "event"
        },
        "0x63734cbaa2e40b5ba26fdbc5eee98dedeeaf268050a41768390bd0dbb20e3d27": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogWithdrawl",
          "type": "event"
        },
        "0xce3af5a3fdaee3c4327c1c434ea1d2186d7a9495f005d2a876dca182bd145714": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "LogPaused",
          "type": "event"
        },
        "0xdd94b1af6bea4b46098358e39714f814a18a4033af0e48ead425768471ed4a3e": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogFundsTransfered",
          "type": "event"
        },
        "0xa51bb46f78abe5307b0c5defe3b45537d2e07542136dfc53a81952307d317885": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "tag",
              "type": "bytes32"
            }
          ],
          "name": "LogCampaignTagAdded",
          "type": "event"
        },
        "0x5f873ee0636a4e5e81f74a267d4d41c768d1f586cd7d7207b6795b8703de1cd3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "LogFlagCampaign",
          "type": "event"
        },
        "0xea3f672f65a0bca7224ef7cb18490051f6113a0a69283e71bbccfef490e0c70c": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogReturnFunds",
          "type": "event"
        },
        "0x4adac0c938c5ec4087fcc442b0ffcddbc400e10e598af0348d5ea570796682c1": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "supplier",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "tag",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogDisburseFunds",
          "type": "event"
        },
        "0x3f1555745a33d689872e5c7b9f449eebde00d4c505e90330db0235dcc21c77c8": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "newIpfsHash",
              "type": "bytes32"
            }
          ],
          "name": "LogSetNewIpfs",
          "type": "event"
        },
        "0x9be9e683ac1619becc13e8ec3f275c481549783b6405e14be0307c51e5620250": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "flaggedStatus",
              "type": "bool"
            }
          ],
          "name": "LogStopFlaggedCampaign",
          "type": "event"
        },
        "0x95a4124b32fadd40e6e63088992a62e3505e61d1683b783d03e575d7c1dfb967": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "oldOwner",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "LogNewOwner",
          "type": "event"
        }
      },
      "links": {
        "AddressSetLib": "0x03138d7259c0244c1ed85663e372c7c3f24f4d01",
        "Bytes32SetLib": "0xf0e703037cab50137553d44a4060204f47b0bf49"
      },
      "updated_at": 1508598192874,
      "address": "0x57f0803541cb8b92916d3b9fdc7b35a494a475df"
    },
    "1508601618407": {
      "events": {
        "0x615b82d09530cb171fb9954512b751ee6d5197d08431b056ca6e8c3d8aca6811": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogDonation",
          "type": "event"
        },
        "0x63734cbaa2e40b5ba26fdbc5eee98dedeeaf268050a41768390bd0dbb20e3d27": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogWithdrawl",
          "type": "event"
        },
        "0xce3af5a3fdaee3c4327c1c434ea1d2186d7a9495f005d2a876dca182bd145714": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "LogPaused",
          "type": "event"
        },
        "0xdd94b1af6bea4b46098358e39714f814a18a4033af0e48ead425768471ed4a3e": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogFundsTransfered",
          "type": "event"
        },
        "0xa51bb46f78abe5307b0c5defe3b45537d2e07542136dfc53a81952307d317885": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "tag",
              "type": "bytes32"
            }
          ],
          "name": "LogCampaignTagAdded",
          "type": "event"
        },
        "0x5f873ee0636a4e5e81f74a267d4d41c768d1f586cd7d7207b6795b8703de1cd3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "LogFlagCampaign",
          "type": "event"
        },
        "0xea3f672f65a0bca7224ef7cb18490051f6113a0a69283e71bbccfef490e0c70c": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogReturnFunds",
          "type": "event"
        },
        "0x4adac0c938c5ec4087fcc442b0ffcddbc400e10e598af0348d5ea570796682c1": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "supplier",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "tag",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "LogDisburseFunds",
          "type": "event"
        },
        "0x3f1555745a33d689872e5c7b9f449eebde00d4c505e90330db0235dcc21c77c8": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "newIpfsHash",
              "type": "bytes32"
            }
          ],
          "name": "LogSetNewIpfs",
          "type": "event"
        },
        "0x9be9e683ac1619becc13e8ec3f275c481549783b6405e14be0307c51e5620250": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "flaggedStatus",
              "type": "bool"
            }
          ],
          "name": "LogStopFlaggedCampaign",
          "type": "event"
        },
        "0x95a4124b32fadd40e6e63088992a62e3505e61d1683b783d03e575d7c1dfb967": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "oldOwner",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "LogNewOwner",
          "type": "event"
        }
      },
      "links": {
        "AddressSetLib": "0x88e5f9e100813efcdc93fbcd005fa4e23debb797",
        "Bytes32SetLib": "0x56b8fb109cf164cef497329a52cd35c5bff05a7a"
      },
      "updated_at": 1508601711205
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1508601711205
}

function* fetchCampaigns () {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let campaigns = []
  // '/campaigns'
  yield fetch('http://0.0.0.0:8080/campaigns', config)
    .then((response) => response.json())
    .then((campaignsArr) => {
      campaigns = campaignsArr
    })
    .catch(err => {
      console.log(err)
    })

  yield put(storeCampaigns(campaigns))
}


function* fetchCampaign (id) {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let campaign = {}

  yield fetch(`http://0.0.0.0:8080/campaign/${id.address}`, config)
    .then((response) => response.json())
    .then((campaignArr) => {
      campaign = campaignArr
    })
    .catch(err => {
      console.log(err)
    })
  yield put(storeCampaign(campaign))
}

function* createCampaign (campaignAction) {
  let campaignHub, accounts, tx
  yield contracts.CampaignHub.deployed().then((campaignHubDeployed) => campaignHub = campaignHubDeployed)
  yield window.web3.eth.getAccountsPromise().then(blockaccounts => accounts = blockaccounts)
  const campaign = campaignAction.campaign
  yield campaignHub.addCampaign(campaign.name, campaign.goalAmount, campaign.weiLimitPerBlock, campaign.deadline, {from: accounts[0], gas: 2e6}).then(txReturn => tx = txReturn)
  yield console.log(tx)
  yield put(storeCampaign(tx.logs[0].args))
  yield put(push(`/campaign/${tx.logs[0].args.campaign}`))
}
//donate(bytes32 tag) payable campaignNotFlagged returns (bool)
function* donateCampaign (donateInput) {
  let campaignTract, accounts
  campaignTract = window.web3.eth.contract(campaignABI.abi)
  const instance = campaignTract.at(donateInput.donate.address)
  yield window.web3.eth.getAccountsPromise().then(blockaccounts => accounts = blockaccounts)
  // console.log(donateInput.donate.value)
  yield instance.donate('Food', {from: accounts[0], value: window.web3.toWei(donateInput.donate.value, 'ether')}, () => true)
}
// disburseFunds(address vendor, bytes32 tag, uint amount)
function* withdrawCampaign (withdrawInput) {
  let campaignTract, accounts
  campaignTract = window.web3.eth.contract(campaignABI.abi)
  const instance = campaignTract.at(withdrawInput.withdraw.address)
  yield window.web3.eth.getAccountsPromise().then(blockaccounts => accounts = blockaccounts)
  // console.log(donateInput.donate.value)
  console.log('accounts', accounts)
  console.log('withdrawInput', withdrawInput)
  const {withdrawAddress, tag, amount } = withdrawInput.withdraw

  yield instance.disburseFunds(withdrawAddress, tag, amount, {from: accounts[0], gas: 2e6}, () => {})
}

function* campaignSaga () {
  yield all([
    takeEvery(FETCH_CAMPAIGNS, fetchCampaigns),
    takeEvery(FETCH_CAMPAIGN, fetchCampaign),
    takeEvery(CREATE_CAMPAIGN, createCampaign),
    takeEvery(DONATE_CAMPAIGN, donateCampaign),
    takeEvery(WITHDRAW_CAMPAIGN, withdrawCampaign)
  ])
}

export default campaignSaga
