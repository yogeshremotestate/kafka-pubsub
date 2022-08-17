
const { Kafka } = require("kafkajs")

const clientId = "my-app"
const brokers = ["localhost:9092"]
const topic = "message-log"
const topic2 ="notification"
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()
    const sendMessage = async () => {
        await producer.connect()
        readline.question(`Enter your message: `, async msg => {
            if (msg === 'exit' || msg === 'Exit') {
                await producer.disconnect();
                readline.close();
                return;
             }
             await producer.send({
                //  topic:[topic,topic2],
                topic,
                 messages: [
                     { value: `${msg}`}
                 ]
             })
             await producer.send({
                topic2,
                messages: [
                    { value: `${msg}`}
                ]
            })
             await sendMessage()
            // await producer.send({
            //     topic,
            //     messages: [
            //         { value: `${msg}`}
            //     ]
            // })
        })
    }

sendMessage()
