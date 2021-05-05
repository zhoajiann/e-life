'use strict'

let fs = require('fs')

class deletePassage {

    constructor () {
        this.param = '/'
    }    

    async delete (c){

        let content = `${c.body}.txt`

        try {
            let data = await c.service.model.db_deleteElife.delPassage(content);
            await fs.unlinkSync(`${c.service.publicPath}/passage/content/${data.content}`);
            await fs.unlinkSync(`${c.service.publicPath}/passage/image/${data.image}`);
            await fs.unlinkSync(`${c.service.publicPath}/passage/voice/${data.voice}`);
            c.send('success',200)
            
        } catch (err) {
            console.error(err)
            c.send('error', 400)     
        }       
    }
}

module.exports = deletePassage