from atexit import register
import requests
from django import template

register = template.Library()

@register.filter()
def pullprice(value):
    sellTokenAddress = value.split(",")[0]
    buyTokenAddress = value.split(",")[1]
    quoteParams = {"sellToken": sellTokenAddress, "buyToken": buyTokenAddress, "buyAmount": "100000000000000000000"}
    quote = requests.get("https://api.0x.org/swap/v1/price", params = quoteParams)
    response = quote.json()
    price = response["price"]

    return response

# print(pullprice("ETH,0x3845badAde8e6dFF049820680d1F14bD3903a5d0"))