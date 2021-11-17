const WebSocket = require('ws').WebSocket
const token = process.env.SUPERVISOR_TOKEN
var haWebsocket

connectToHomeAssistant()

function connectToHomeAssistant(){
	try {
		haWebsocket = new WebSocket('wss://supervisor/core/websocket')
	} catch(error) {
		console.log(error)
		try {
			haWebsocket = new WebSocket('ws://supervisor/core/websocket')
		} catch(err) {
			console.log(err)
		}
	}

	haWebsocket.on('message',function(data){
		resp = JSON.parse(data.toString())
		switch (resp.type){
			case 'auth_required':
				// log in to home assistant
				haWebsocket.send('{"type":"auth","access_token":"' + token + '"}')
				break
			case 'auth_ok':
				haWebsocket.send('{"id":"2","type":"subscribe_events","event_type":"state_changed"}') // subscribe to cync switch state changes
				break
			case 'event': // receive home assistant switch state changes
				if (resp.id == 2) {
                    console.log(resp.event.data)
                }
		}
	})
	haWebsocket.on('error',function(err){
		console.log(err)
	})
}
