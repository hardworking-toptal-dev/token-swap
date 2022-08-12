import requests

def pullPrice(sellTokenAddress, buyTokenAddress):
    quoteParams = {"sellToken": sellTokenAddress, "buyToken": buyTokenAddress, "buyAmount": "100000000000000000000"}
    quote = requests.get("https://api.0x.org/swap/v1/price", params = quoteParams)
    response = quote.json()
    price = response["price"]

    return price

# print(pullPrice("0x3845badAde8e6dFF049820680d1F14bD3903a5d0"))