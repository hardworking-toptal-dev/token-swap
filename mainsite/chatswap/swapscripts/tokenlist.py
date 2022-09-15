import requests

#Function used to retrieve token data from a given token list API link and returns selected and parsed data.
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

#Class used to instantiate token objects which contain all necessary data for a given token to be accessed by the application (template tags)
class token():
    ticker = ""
    decimals = ""
    contract = ""
    name = ""
    def __init__(self, ticker, decimals, contract):
        self.ticker = ticker
        self.decimals = decimals
        self.contract = contract