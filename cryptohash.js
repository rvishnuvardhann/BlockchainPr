const crypto=require('crypto')

const cryptoHash=(...inputs)=>{
    const hash=crypto.createHash('sha256')
    //join all the inputs
    hash.update(inputs.sort().join(""))
    return hash.digest('hex')
}

result =cryptoHash("world","hello")
module.exports=cryptoHash;
//console.log(result);