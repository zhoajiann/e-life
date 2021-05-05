'use strict'

class uploadpassage {

  constructor () {
    this.param = '/'
  }
  
  async post (c) {
    
    let image = c.getFile('image')
    await c.moveFile(image, `public/passage/image/${image.filename}`)
    let content = c.getFile('content')
    await c.moveFile(content, `public/passage/content/${content.filename}`)
    let voice = c.getFile('voice')
    await c.moveFile(voice, `public/passage/voice/${voice.filename}`)


    try {
      let data = {
        title:c.body.title,
        image:image.filename,
        content:content.filename,
        voice:voice.filename,
      }

      let data1 = await c.service.model.db_uploadElife.addpassage(data);
      c.send(data1,200)

    } catch (err) {

      console.error(err)
      c.send('insert failed', 400)

    }
  }

}
module.exports = uploadpassage