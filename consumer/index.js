
const { Kafka } = require("kafkajs")
const clientId = "my-app"
const brokers = ["localhost:9092"]
const topic = "message-log"
const topic2 ="notification"
const kafka = new Kafka({ clientId, brokers })
const consumer = kafka.consumer({ groupId: clientId })
const consumer2 = kafka.consumer({ groupId: clientId })


const consume = async () => {
	
	await consumer.connect()
	await consumer.subscribe({ 
        topics:[topic,topic2],
        fromBeginning: true
    })
	
	await consumer.run({
		eachMessage: ({ topic,message }) => {
			if(topic==="message-log"){
				console.log(`received message: ${message.value}`)
			}
			
		},
	})

	// await consumer2.connect()
	// await consumer2.subscribe({ 
    //     topic2,
    //     fromBeginning: true
    // })
	
	// await consumer2.run({
	// 	eachMessage: ({ message }) => {
			
	// 		console.log(`received message: ${message.value}`)
	// 	},
	// })
}
consume()

// const consume2 = async () => {
	
// 	await consumer2.connect()
// 	await consumer2.subscribe({ 
//         topic2,
//         fromBeginning: false
//     })
	
// 	await consumer2.run({
// 		eachMessage: ({ message }) => {
			
// 			console.log(`received message: ${message.value}`)
// 		},
// 	})
// }
// consume2()
