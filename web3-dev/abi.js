/*eslint-disable*/

const parcelCreatorAddress = "0xAE23DA949F70d63Cd74c96DF6183F1B93F451dAa"
const postboxCreatorAddress = "0xD30f6685e9A39fF768f81f48Bd14DF917931d994"
const deliveryContractCreatorAddress = "0x3A5D686EC5b9b39617f105e6ec43f70b0Fa6d2Ff"

const parcelCreatorABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "creator",
        "outputs": [
            {
                "name": "",
                "type": "address",
                "value": "0x2be1557dd54f762181a930265a8b6149bd4e1108"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_postboxCreator",
                "type": "address"
            }
        ],
        "name": "updatePosboxCreator",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "passPostboxCreator",
        "outputs": [
            {
                "name": "",
                "type": "address",
                "value": "0xd30f6685e9a39ff768f81f48bd14df917931d994"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_deliveryContractCreator",
                "type": "address"
            }
        ],
        "name": "updateDeliveryContractCreator",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_transmittedTo",
                "type": "address"
            },
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_description",
                "type": "string"
            },
            {
                "name": "_temperatureLimit",
                "type": "uint256"
            }
        ],
        "name": "createParcel",
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
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "parcelCreations",
        "outputs": [
            {
                "name": "parcel",
                "type": "address",
                "value": "0x0000000000000000000000000000000000000000"
            },
            {
                "name": "creator",
                "type": "address",
                "value": "0x0000000000000000000000000000000000000000"
            },
            {
                "name": "name",
                "type": "string",
                "value": ""
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_eventManager",
                "type": "address"
            }
        ],
        "name": "updateEventManager",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "deliveryContractCreator",
        "outputs": [
            {
                "name": "",
                "type": "address",
                "value": "0x45fe0bcf5b785a27c2a1e27796f348afe9121490"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_deliveryContractCreator",
                "type": "address",
                "index": 0,
                "typeShort": "address",
                "bits": "",
                "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;delivery Contract Creator",
                "template": "elements_input_address",
                "value": "0x45fE0Bcf5B785a27c2A1E27796f348AFe9121490"
            },
            {
                "name": "_passPostboxCreator",
                "type": "address",
                "index": 1,
                "typeShort": "address",
                "bits": "",
                "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;pass Postbox Creator",
                "template": "elements_input_address",
                "value": "0xD30f6685e9A39fF768f81f48Bd14DF917931d994"
            },
            {
                "name": "_eventManager",
                "type": "address",
                "index": 2,
                "typeShort": "address",
                "bits": "",
                "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;event Manager",
                "template": "elements_input_address",
                "value": "0x2be1557dD54F762181a930265A8B6149Bd4e1108"
            }
        ],
        "payable": false,
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "Creator",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "ParcelAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "Owner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "Name",
                "type": "string"
            }
        ],
        "name": "NewParcel",
        "type": "event"
    }
]

const postboxCreatorABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "postboxCreations",
        "outputs": [
            {
                "name": "creator",
                "type": "address"
            },
            {
                "name": "postbox",
                "type": "address"
            },
            {
                "name": "name",
                "type": "string"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_description",
                "type": "string"
            },
            {
                "name": "_location",
                "type": "string"
            },
            {
                "name": "_minutesPostboxFees",
                "type": "uint256"
            },
            {
                "name": "_minRentalFees",
                "type": "uint256"
            },
            {
                "name": "_maxPostboxDeposit",
                "type": "uint256"
            }
        ],
        "name": "createPostbox",
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
        "name": "passDao",
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
        "inputs": [
            {
                "name": "_passDao",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "Creator",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "Owner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "Name",
                "type": "string"
            },
            {
                "indexed": true,
                "name": "PostboxAddress",
                "type": "address"
            }
        ],
        "name": "NewPostbox",
        "type": "event"
    }
]

const deliveryContractCreatorABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "creator",
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
        "constant": false,
        "inputs": [
            {
                "name": "_parcel",
                "type": "address"
            },
            {
                "name": "_senderPostbox",
                "type": "address"
            },
            {
                "name": "_receiverPostbox",
                "type": "address"
            },
            {
                "name": "_receiver",
                "type": "address"
            },
            {
                "name": "_contractEndDate",
                "type": "uint256"
            },
            {
                "name": "_parcelDeposit",
                "type": "uint256"
            },
            {
                "name": "_transferStartDate",
                "type": "uint256"
            },
            {
                "name": "_minutesPeriodReception",
                "type": "uint256"
            }
        ],
        "name": "createDeliveryContract",
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
        "inputs": [
            {
                "name": "_passDeliveryContract",
                "type": "address"
            }
        ],
        "name": "ContractID",
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
                "name": "_contractID",
                "type": "uint256"
            }
        ],
        "name": "cancelContract",
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
                "name": "_contractID",
                "type": "uint256"
            }
        ],
        "name": "sendParcelDeposit",
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
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "tokenAmount",
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
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "contracts",
        "outputs": [
            {
                "name": "open",
                "type": "bool"
            },
            {
                "name": "deliveryContract",
                "type": "address"
            },
            {
                "name": "parcel",
                "type": "address"
            },
            {
                "name": "senderPostbox",
                "type": "address"
            },
            {
                "name": "receiverPostbox",
                "type": "address"
            },
            {
                "name": "receiver",
                "type": "address"
            },
            {
                "name": "transferStartDate",
                "type": "uint256"
            },
            {
                "name": "limitDateOfReception",
                "type": "uint256"
            },
            {
                "name": "parcelDeposit",
                "type": "uint256"
            },
            {
                "name": "tokenContractDeposit",
                "type": "uint256"
            },
            {
                "name": "tokenParcelDeposit",
                "type": "uint256"
            },
            {
                "name": "contractEndDate",
                "type": "uint256"
            },
            {
                "name": "container",
                "type": "address"
            },
            {
                "name": "dateOfSignature",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "passDao",
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
        "name": "passContainerCreator",
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
        "name": "maxMinutesPeriodContract",
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
                "name": "_contractID",
                "type": "uint256"
            },
            {
                "name": "_container",
                "type": "address"
            },
            {
                "name": "_deliveryStartDate",
                "type": "uint256"
            },
            {
                "name": "_deliveryEndDate",
                "type": "uint256"
            }
        ],
        "name": "signContractContainer",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "contractDeposit",
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
        "name": "maxParcelDeposit",
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
        "name": "numberOfContracts",
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
        "name": "TokenManager",
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
        "constant": false,
        "inputs": [
            {
                "name": "_contractID",
                "type": "uint256"
            }
        ],
        "name": "closeContract",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_passDao",
                "type": "address"
            },
            {
                "name": "_passContainerCreator",
                "type": "address"
            },
            {
                "name": "_maxParcelDeposit",
                "type": "uint256"
            },
            {
                "name": "_maxMinutesPeriodContract",
                "type": "uint256"
            },
            {
                "name": "_contractDeposit",
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
                "indexed": true,
                "name": "Creator",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "DeliveryContractAddress",
                "type": "address"
            }
        ],
        "name": "NewContract",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "ContractID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "DeliveryContractAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "container",
                "type": "address"
            }
        ],
        "name": "ContractSigned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "ContractID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "DeliveryContractAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "DepositGivenBack",
                "type": "uint256"
            }
        ],
        "name": "ContractCancelled",
        "type": "event"
    }
]

const parcelABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "creator",
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
        "constant": false,
        "inputs": [
            {
                "name": "_minutesTemperatureOverLimit",
                "type": "uint256"
            }
        ],
        "name": "setTemperatureEvent",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_passDeliveryContract",
                "type": "address"
            },
            {
                "name": "_userFee",
                "type": "uint256"
            },
            {
                "name": "_minutesDeflationRate",
                "type": "uint256"
            },
            {
                "name": "_temperaturePenalties",
                "type": "uint256"
            }
        ],
        "name": "signContract",
        "outputs": [],
        "payable": true,
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
        "name": "PicturesAuthKey",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "TrackingStreamID",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_passDeliveryContract",
                "type": "address"
            }
        ],
        "name": "withdrawFromDeliveryContract",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "LastContractAddress",
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
        "constant": false,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_description",
                "type": "string"
            },
            {
                "name": "_location",
                "type": "string"
            },
            {
                "name": "_minutesPostboxFee",
                "type": "uint256"
            },
            {
                "name": "_minRentalFee",
                "type": "uint256"
            },
            {
                "name": "_maxPostboxDeposit",
                "type": "uint256"
            }
        ],
        "name": "createPostbox",
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
        "constant": false,
        "inputs": [
            {
                "name": "_postboxCreator",
                "type": "address"
            }
        ],
        "name": "updatePosboxCreator",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_sender",
                "type": "address"
            }
        ],
        "name": "send",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_by",
                "type": "address"
            }
        ],
        "name": "take",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "TransmittedTo",
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
        "name": "passPostboxCreator",
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
        "name": "description",
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
        "constant": false,
        "inputs": [
            {
                "name": "_deliveryContractCreator",
                "type": "address"
            }
        ],
        "name": "updateDeliveryContractCreator",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "TemperatureLimit",
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
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "updateOwner",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "TrackingAuthKey",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "receive",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_tokenAmount",
                "type": "uint256"
            }
        ],
        "name": "withdrawTokenAmount",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "Owner",
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
        "constant": false,
        "inputs": [],
        "name": "cancelDelivery",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "PicturesStreamID",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "transfers",
        "outputs": [
            {
                "name": "open",
                "type": "bool"
            },
            {
                "name": "sender",
                "type": "address"
            },
            {
                "name": "receiver",
                "type": "address"
            },
            {
                "name": "lastContractAddress",
                "type": "address"
            },
            {
                "name": "nextContractAddress",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_trackingStreamID",
                "type": "string"
            },
            {
                "name": "_trackingAuthKey",
                "type": "string"
            },
            {
                "name": "_picturesStreamID",
                "type": "string"
            },
            {
                "name": "_picturesAuthKey",
                "type": "string"
            }
        ],
        "name": "setStreams",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_eventManager",
                "type": "address"
            }
        ],
        "name": "updateEventManager",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "transmissionDate",
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
                "name": "_sender",
                "type": "address"
            },
            {
                "name": "_ipfsAddress",
                "type": "string"
            },
            {
                "name": "_photoHash",
                "type": "bytes32"
            }
        ],
        "name": "photo",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_by",
                "type": "address"
            }
        ],
        "name": "deliver",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "postboxes",
        "outputs": [
            {
                "name": "postbox",
                "type": "address"
            },
            {
                "name": "creator",
                "type": "address"
            },
            {
                "name": "name",
                "type": "string"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "updateDescription",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "deliveryContractCreator",
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
        "constant": false,
        "inputs": [
            {
                "name": "_senderPostbox",
                "type": "address"
            },
            {
                "name": "_receiverPostbox",
                "type": "address"
            },
            {
                "name": "_receiver",
                "type": "address"
            },
            {
                "name": "_contractEndDate",
                "type": "uint256"
            },
            {
                "name": "_containerParcelDeposit",
                "type": "uint256"
            },
            {
                "name": "_transferStartDate",
                "type": "uint256"
            },
            {
                "name": "_minutesPeriodReception",
                "type": "uint256"
            }
        ],
        "name": "createDeliveryContract",
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
        "inputs": [
            {
                "name": "_creator",
                "type": "address"
            },
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_deliveryContractCreator",
                "type": "address"
            },
            {
                "name": "_passPostboxCreator",
                "type": "address"
            },
            {
                "name": "_eventManager",
                "type": "address"
            },
            {
                "name": "_transmittedTo",
                "type": "address"
            },
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_description",
                "type": "string"
            },
            {
                "name": "_temperatureLimit",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "constructor"
    },
    {
        "payable": true,
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "PostboxID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "passPostboxAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "Owner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "Name",
                "type": "string"
            }
        ],
        "name": "PostboxCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "DeliveryContractAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "SenderPostbox",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "ReceiverPostbox",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "Receiver",
                "type": "address"
            }
        ],
        "name": "DeliveryContractCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "UserFee",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "MinutesDeflationRate",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "TemperaturePenalties",
                "type": "uint256"
            }
        ],
        "name": "ContractSigned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "TrackingStreamID",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "TrackingAuthKey",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "PicturesStreamID",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "PicturesAuthKey",
                "type": "bytes32"
            }
        ],
        "name": "StreamsSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "ContractAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "Sender",
                "type": "address"
            }
        ],
        "name": "ParcelSent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "ContractAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "By",
                "type": "address"
            }
        ],
        "name": "ParcelTaken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "ContractAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "By",
                "type": "address"
            }
        ],
        "name": "ParcelDelivered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "ContractAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "Receiver",
                "type": "address"
            }
        ],
        "name": "ParcelReceived",
        "type": "event"
    }
]

const deliveryContractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "creator",
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
        "name": "PicturesAuthKey",
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
        "name": "containerMinutesTemperatureOverLimit",
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
        "name": "take",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "TrackingStreamID",
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
        "name": "UserFee",
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
        "name": "limitDateOfReception",
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
        "name": "payFee",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "contractEndDate",
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
        "name": "receiverPostboxRentID",
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
        "name": "tokenReceiverPostboxParcelDeposit",
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
                "name": "_transmittedTo",
                "type": "address"
            },
            {
                "name": "_minutesTemperatureOverLimit",
                "type": "uint256"
            }
        ],
        "name": "setTemperatureEvent",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "receptionDate",
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
        "name": "Parcel",
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
        "name": "containerTakingDate",
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
        "name": "passContainerCreator",
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
        "name": "parcelDeposit",
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
        "name": "receiverPostbox",
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
        "name": "container",
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
        "name": "contractID",
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
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "deliveryDate",
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
        "name": "TrackingAuthKey",
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
        "inputs": [
            {
                "name": "_deliveryDate",
                "type": "uint256"
            }
        ],
        "name": "netContainerParcelDeposit",
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
        "name": "receive",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "transferStartDate",
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
        "name": "senderPostbox",
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
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "photos",
        "outputs": [
            {
                "name": "sender",
                "type": "address"
            },
            {
                "name": "transmittedTo",
                "type": "address"
            },
            {
                "name": "ipfsAddress",
                "type": "string"
            },
            {
                "name": "photoHash",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "send",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "PicturesStreamID",
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
        "name": "senderPostboxRentID",
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
        "name": "TokenManager",
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
        "constant": false,
        "inputs": [
            {
                "name": "_container",
                "type": "address"
            },
            {
                "name": "_deliveryStartDate",
                "type": "uint256"
            },
            {
                "name": "_deliveryEndDate",
                "type": "uint256"
            },
            {
                "name": "_tokenContractDeposit",
                "type": "uint256"
            }
        ],
        "name": "setContainer",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "tokenContainerParcelDeposit",
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
        "name": "paidFee",
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
                "name": "_sender",
                "type": "address"
            },
            {
                "name": "_ipfsAddress",
                "type": "string"
            },
            {
                "name": "_photoHash",
                "type": "bytes32"
            }
        ],
        "name": "photo",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_userFee",
                "type": "uint256"
            },
            {
                "name": "_minutesDeflationRate",
                "type": "uint256"
            },
            {
                "name": "_temperaturePenalties",
                "type": "uint256"
            }
        ],
        "name": "signParcelContract",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "senderPostboxTakingDate",
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
        "name": "receiverPostboxTakingDate",
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
        "name": "tokenSenderPostboxParcelDeposit",
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
        "name": "receiver",
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
        "name": "open",
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
        "inputs": [],
        "name": "deliver",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "sendingDate",
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
        "inputs": [
            {
                "name": "_contractID",
                "type": "uint256"
            },
            {
                "name": "_passDao",
                "type": "address"
            },
            {
                "name": "_passContainerCreator",
                "type": "address"
            },
            {
                "name": "_parcel",
                "type": "address"
            },
            {
                "name": "_senderPostbox",
                "type": "address"
            },
            {
                "name": "_receiverPostbox",
                "type": "address"
            },
            {
                "name": "_receiver",
                "type": "address"
            },
            {
                "name": "_contractEndDate",
                "type": "uint256"
            },
            {
                "name": "_parcelDeposit",
                "type": "uint256"
            },
            {
                "name": "_transferStartDate",
                "type": "uint256"
            },
            {
                "name": "_limitDateOfReception",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "constructor"
    },
    {
        "payable": true,
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "DepositGivenBack",
                "type": "uint256"
            }
        ],
        "name": "ContractClosed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "Sender",
                "type": "address"
            }
        ],
        "name": "ParcelSent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "container",
                "type": "address"
            }
        ],
        "name": "ParcelTaken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "ReceiverPostbox",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "parcelDeposit",
                "type": "uint256"
            }
        ],
        "name": "DepositNotTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "DeliveredTo",
                "type": "address"
            }
        ],
        "name": "ParcelDelivered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "Receiver",
                "type": "address"
            }
        ],
        "name": "ParcelReceived",
        "type": "event"
    }
]

const postboxABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "creator",
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
        "constant": false,
        "inputs": [],
        "name": "sendDeposit",
        "outputs": [],
        "payable": true,
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
        "constant": false,
        "inputs": [
            {
                "name": "_startDate",
                "type": "uint256"
            },
            {
                "name": "_endDate",
                "type": "uint256"
            }
        ],
        "name": "lock",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_rentID",
                "type": "uint256"
            }
        ],
        "name": "Renter",
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
        "inputs": [
            {
                "name": "_rentID",
                "type": "uint256"
            }
        ],
        "name": "Receiver",
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
        "constant": false,
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawDeposit",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "updateName",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdrawAllBalance",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "minutesPostboxFees",
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
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "tokenAmount",
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
                "name": "_rentID",
                "type": "uint256"
            }
        ],
        "name": "take",
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
        "name": "passDao",
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
        "name": "location",
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
        "constant": false,
        "inputs": [
            {
                "name": "_minutesPostboxFees",
                "type": "uint256"
            },
            {
                "name": "_minRentalFees",
                "type": "uint256"
            }
        ],
        "name": "updateMinutesPostboxFees",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_public",
                "type": "bool"
            }
        ],
        "name": "setPublic",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_rentID",
                "type": "uint256"
            }
        ],
        "name": "cancelRental",
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
        "name": "minRentalFees",
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
                "name": "_rentID",
                "type": "uint256"
            }
        ],
        "name": "unlock",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "description",
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
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_parcelDeposit",
                "type": "uint256"
            }
        ],
        "name": "transferParcelDeposit",
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
        "name": "publicPostbox",
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
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "updateOwner",
        "outputs": [],
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
        "constant": false,
        "inputs": [
            {
                "name": "_startDate",
                "type": "uint256"
            },
            {
                "name": "_endDate",
                "type": "uint256"
            }
        ],
        "name": "check",
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
                "name": "_parcelValue",
                "type": "uint256"
            }
        ],
        "name": "calculDeposit",
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
                "name": "_location",
                "type": "string"
            }
        ],
        "name": "updateLocation",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_rentID",
                "type": "uint256"
            }
        ],
        "name": "Open",
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
        "name": "NetBalance",
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
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "rents",
        "outputs": [
            {
                "name": "open",
                "type": "bool"
            },
            {
                "name": "creator",
                "type": "address"
            },
            {
                "name": "renter",
                "type": "address"
            },
            {
                "name": "sender",
                "type": "address"
            },
            {
                "name": "deposit",
                "type": "uint256"
            },
            {
                "name": "postboxDeposit",
                "type": "uint256"
            },
            {
                "name": "minutesPostboxFees",
                "type": "uint256"
            },
            {
                "name": "startDate",
                "type": "uint256"
            },
            {
                "name": "endDate",
                "type": "uint256"
            },
            {
                "name": "receiver",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_tokenAmount",
                "type": "uint256"
            }
        ],
        "name": "withdrawTokenAmount",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "TokenBalance",
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
        "inputs": [
            {
                "name": "_rentID",
                "type": "uint256"
            }
        ],
        "name": "PostboxDeposit",
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
        "name": "Owner",
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
        "constant": false,
        "inputs": [
            {
                "name": "_rentID",
                "type": "uint256"
            },
            {
                "name": "_receiver",
                "type": "address"
            }
        ],
        "name": "setReceiver",
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
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawBalance",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdrawAllDeposit",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "lastRentID",
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
        "name": "maxPostboxDeposit",
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
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "deposit",
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
                "name": "_sender",
                "type": "address"
            },
            {
                "name": "_receiver",
                "type": "address"
            },
            {
                "name": "_parcelValue",
                "type": "uint256"
            },
            {
                "name": "_startDate",
                "type": "uint256"
            },
            {
                "name": "_endDate",
                "type": "uint256"
            }
        ],
        "name": "rent",
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
        "inputs": [
            {
                "name": "_passDao",
                "type": "address"
            },
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_description",
                "type": "string"
            },
            {
                "name": "_location",
                "type": "string"
            },
            {
                "name": "_minutesPostboxFees",
                "type": "uint256"
            },
            {
                "name": "_minRentalFees",
                "type": "uint256"
            },
            {
                "name": "_maxPostboxDeposit",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "constructor"
    },
    {
        "payable": true,
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "deliveryContract",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "Receiver",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "RentID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "StartDate",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "EndDate",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "Deposit",
                "type": "uint256"
            }
        ],
        "name": "Rented",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "RentID",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "Receiver",
                "type": "address"
            }
        ],
        "name": "ReceiverSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "RentID",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "StartDate",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "EndDate",
                "type": "uint256"
            }
        ],
        "name": "Locked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "From",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "rentID",
                "type": "uint256"
            }
        ],
        "name": "ParcelReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "By",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "RentID",
                "type": "uint256"
            }
        ],
        "name": "ParcelTakenOver",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "Sender",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "Recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "Amount",
                "type": "uint256"
            }
        ],
        "name": "Withdrawal",
        "type": "event"
    }
]
