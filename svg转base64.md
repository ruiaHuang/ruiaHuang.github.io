## svg转base64

```
getImg() {
      http(
        [
          'https://ut.chemical.ai/Image/GetPicBySmilesAndResolution?smiles=CC(C)N1C(%3DO)C(OC(%3DO)c2ccc(cc2)C(c2ccc(cc2)C(Cl)%3DO)(c2ccc(cc2)C(Cl)%3DO)c2ccc(cc2)C(Cl)%3DO)%3DC2C(%3DO)N(Cc3ccccc3)CCC2%3DC1C(%3DO)N(C)C&width=300&height=300',
          'get'
        ],
        {},
        {
          responseType: 'blob'
        }
      ).then(res => {
        this.blobToDataURL(res).then(dataURL => {
          let oImg = document.createElement('img')
          oImg.src = dataURL
          document.body.insertBefore(oImg, document.body.firstElementChild)
        })
      })
    },
    blobToDataURL(blob) {
      return new Promise((resolve, reject) => {
        let a = new FileReader()
        a.onload = function(e) {
          resolve(e.target.result)
        }
        a.onerror = e => {
          reject(e)
        }
        a.readAsDataURL(blob)
      })
    },
```

![code](D:\GitProject\github\ruiaHuang.github.io\code.png)

