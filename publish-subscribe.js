const redis=require('redis')

const CHANNEL ={
    TEST:'TEST',
    BLOCKCHAIN:"BLOCKCAIN"
}
class Pubsub{
    constructor({blockchain}){
        this.blockchain=blockchain
        this.publisher=redis.createClient();
        this.subscriber=redis.createClient();

        this.subscriber.subscribe(CHANNEL.TEST);
        this.subscriber.subscribe(CHANNEL.BLOCKCHAIN);

        this.subscriber.on('message',(channel,message)=> this.handleMessage(channel,message));
    }
    handleMessage(channel,message){
        console.log(`message recieved channel:${channel} Message: ${message}`)
        const parseMess=JSON.parse(message)
        
        if(channel===CHANNEL.BLOCKCHAIN){
            this.blockchain.replaceChain(parseMess)

        }
    }

    publish({channel,message}){
        this.publisher.publish(channel,message)
    }
    broadCastChain(){
        this.publish({
            channel:CHANNEL.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.chain)
        });
    }
}


// const checkpubSub = new Pubsub();
// setTimeout(
//     ()=>checkpubSub.publisher.publish(CHANNEL.TEST,"Helloo"),
//     1000
//     );
module.exports=Pubsub;