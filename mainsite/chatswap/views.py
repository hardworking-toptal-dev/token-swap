from calendar import c
from http.client import HTTPResponse
from django.utils import timezone
from unicodedata import decimal
from django.shortcuts import render
from django.http import JsonResponse
import chatswap.swapscripts.tokenlist as tokenlist
from .models import generalUser
from django.views.decorators.csrf import csrf_exempt
import json

# Main view for the Chatswap web application.
@csrf_exempt
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

    #Recieves post request from template and parses the request's JSON body into a python dictionary which is then
    #used to create a user model object and save it to the database.
    usernameInput = None;
    address = None;
    if (request.method == 'POST'):
        print(request.body)
        jsonDict = json.loads(request.body)
        usernameInput = jsonDict["username_input"]
        address = jsonDict["address"]
        print(usernameInput, address)
        if (usernameInput != None and address != None):
            user = generalUser(address = address, username = usernameInput, lastLogin = timezone.now())
            user.save()
        else: raise Exception("username or address is null!")
    return render(request, "chatswap/index.html", context)
