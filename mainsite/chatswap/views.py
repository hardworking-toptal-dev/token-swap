from calendar import c
from http.client import HTTPResponse
from unicodedata import decimal
from django.shortcuts import render
import chatswap.swapscripts.tokenlist as tokenlist
import chatswap.swapscripts.zrxrequests as zrxrequests

def index(request):
    tokensRaw = tokenlist.getTokenData("https://tokens.coingecko.com/uniswap/all.json")
    tokens = []
    for i in tokensRaw:
        ticker = i["ticker"]
        contract = i["address"]
        decimals = i["decimals"]
        tokens.append(tokenlist.token(ticker, decimals, contract))
    context = {"tokenData": tokens}
    return render(request, "chatswap/index.html", context)