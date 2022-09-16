from calendar import c
from http.client import HTTPResponse
from unicodedata import decimal
from django.shortcuts import render
from django.http import JsonResponse
import chatswap.swapscripts.tokenlist as tokenlist

# Main view for the Chatswap web application.
def index(request):
    tokensRaw = tokenlist.getTokenData("https://tokens.coingecko.com/uniswap/all.json") #Determines tokens displayed in the token modal.
    tokens = []
    for i in tokensRaw:
        ticker = i["ticker"]
        contract = i["address"]
        decimals = i["decimals"]
        tokens.append(tokenlist.token(ticker, decimals, contract))
    tokens.append(tokenlist.token("ETH", 18, "ETH"))
    context = {"tokenData": tokens}
    return render(request, "chatswap/index.html", context)