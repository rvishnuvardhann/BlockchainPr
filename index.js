const express=require('express')

const blockchaine=require('./blockchain')
const bodyparser=require('body-parser');
const pubsub=require('./publish-subscribe')


const app=express()
const blockchain =new blockchaine();
const Pubsub=new pubsub({blockchain})

setTimeout(()=>Pubsub.broadCastChain(),1000)

app.use(bodyparser.json());
app.get('/api/blocks',(req,res)=>{
    res.json(blockchaine.chain);
})

app.post("/api/mine",(req,res)=>{
    const {data}=req.body;

    blockchain.addBlock({data});
    Pubsub.broadCastChain();
    res.redirect('/api/blocks')
})

const DEFAULT_PORT=3000;
let PEER_PORT;
if(process.env.GENERATE_PEER_PORT==='true'){
    PEER_PORT=DEFAULT_PORT+Math.ceil(Math.random()*1000);

}

const PORT=PEER_PORT || DEFAULT_PORT;
app.listen(PORT,()=>{
    console.log(`listening to PORT ${PORT}`);
});