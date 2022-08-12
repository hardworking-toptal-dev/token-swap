import requests

def getTokenData(tokenListLink):
    list = requests.get(tokenListLink).json()
    tokensRaw = list["tokens"]
    tokens = []
    for i in tokensRaw:
        name = i["name"]
        chain = i["chainId"]
        ticker = i["symbol"]
        decimals = i["decimals"]
        address = i["address"]
        # logo = i["logoURI"]
        if (chain == 1):
            tokens.append({"name" : name, "ticker" : ticker, "decimals" : decimals, "address" : address})
    return tokens

class token():
    ticker = ""
    decimals = ""
    contract = ""
    name = ""
    def __init__(self, ticker, decimals, contract):
        self.ticker = ticker
        self.decimals = decimals
        self.contract = contract

# print(getTokenData("https://tokens.coingecko.com/uniswap/all.json"))