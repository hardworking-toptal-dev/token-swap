from http.client import HTTPResponse
from django.shortcuts import render
import chatswap.swapscripts.tokenlist as tokenlist

def index(request):
    tokens = tokenlist.getTokenData("https://tokens.coingecko.com/uniswap/all.json")
    tokenTickers = []
    for i in tokens:
        tokenTickers.append(i["ticker"])
    context = {"tokenNames": tokenTickers}
    return render(request, "chatswap/index.html", context)