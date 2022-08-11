from web3 import Web3

provider = Web3.HTTPProvider('https://mainnet.infura.io/v3/55dee91bcb5b4881a673733791b11c80')
print(provider.isConnected())