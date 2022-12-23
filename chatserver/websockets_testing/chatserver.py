import asyncio
import websockets
import logging

logger = logging.getLogger('websockets')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())

clients = set()
async def getClients(websocket):
    clients.add(websocket)
    # try:
    #     async for _ in websocket:
    #         pass
    # finally:
    #     clients.remove(websocket)

async def send(websocket, message):
    try:
        await websocket.send(message)
    except websockets.ConnectionClosed:
        pass

async def chat(websocket, path):
    await getClients(websocket)
    while True:
        message = await websocket.recv()
        for client in clients:
            asyncio.create_task(send(client, message))
    
async def main():
    async with websockets.serve(chat, "localhost", 8008):
        await asyncio.sleep(1)
        await asyncio.Future()

if (__name__ == "__main__"):
    # print(websockets.__file__)
    asyncio.run(main())
