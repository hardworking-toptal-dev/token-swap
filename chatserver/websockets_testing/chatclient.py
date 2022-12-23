import asyncio
import websockets
import time

message = ""
incoming = set()
async def chat():
    url = "ws://localhost:8008"
    global incoming
    global message
    async with websockets.connect(url) as websocket:
        asyncio.create_task(printChat(websocket))
        # incoming = await websocket.recv()
        # print(incoming)
        message = input("User: ")
        await websocket.send(message)

async def printChat(websocket):
    try:
        while True:
            print(await websocket.recv())
            await asyncio.sleep(1)
    except websockets.ConnectionClosed:
        pass
    
if __name__ == "__main__":
    while (message != "stop"):
        asyncio.run(chat())