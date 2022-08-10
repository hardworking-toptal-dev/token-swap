import requests

def getTokenData(tokenListLink):
    list = requests.get(tokenListLink).json()
    tokensRaw = list["tokens"]
    tokens = []
    for i in tokensRaw:
        name = i["name"]
        chain = i["chainId"]
        symbol = i["symbol"]
        decimals = i["decimals"]
        address = i["address"]
        # logo = i["logoURI"]
        if (chain == 1):
            tokens.append({"name" : name, "ticker" : symbol, "decimals" : decimals, "address" : address})
    return tokens
# print(getTokenData("https://tokens.coingecko.com/uniswap/all.json"))