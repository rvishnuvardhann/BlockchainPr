const Block=require('./Block');
const cryptoHash=require('./cryptohash');
class Blockchain{
    constructor(){
        this.chain=[Block.genesis()];
    }
    addBlock({data}){
        const newBlock=Block.mineBlock({
            //initially points to genesis
            prevBlock:this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock);
    }
    replaceChain(chain){
        if(chain.length<=this.chain.length)
        {
            console.error("the incoming chain is not longer");
            return 
        }
        if(!Blockchain.isvalidChain(chain)){
            console.error("The incoming chain is not valid")
            return
        }
        this.chain=chain;
    }
    static isvalidChain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis()))//invalid chain since initial index must have genesis
        {
            return false;
        }
        for(let i=1;i<chain.length;i++){
            const {timestamp,prevHash,hash,nonce,difficulty,data}=chain[i];
            const lastDifficulty=chain[i-1].difficulty;

            const realLastHash=chain[i-1].hash;

            if(prevHash!==realLastHash) return false;

            const validatedHash=cryptoHash(timestamp,prevHash,nonce,difficulty,data);
            if(hash!==validatedHash) return false;
            if(Math.abs(lastDifficulty-difficulty)>1) return false;
        }
        return true;
        
    }
}
const blockchain =new Blockchain();
blockchain.addBlock({data:"block1"});
blockchain.addBlock({data:"block2"})


const resu=Blockchain.isvalidChain(blockchain.chain);
console.log(blockchain.chain);
console.log(resu);
module.exports=Blockchain;