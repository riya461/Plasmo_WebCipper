export {}
import { Storage } from "@plasmohq/storage"

let url = [];
const storage_bookmarkurl = new Storage({
    area: "local"
})

console.log("Working")
chrome.contextMenus.create({
    id: 'webclip',
    title: 'Webclip this section',
    contexts: ['selection']
});


chrome.contextMenus.onClicked.addListener(
    ({selectionText})=> {

        console.log(selectionText)
        chrome.tabs.query({active: true, currentWindow:true}, async tabs => {
            let urlval = tabs[0].url;
            console.log(urlval)
            let a = [];
            console.log("Works till here ")
            if(url.includes(urlval)){
                console.log("In the if  url area ")
                const val = JSON.parse(await storage_bookmarkurl.get(urlval))
                val.push(selectionText)
                await storage_bookmarkurl.set(urlval,JSON.stringify(val))
                console.log(val)
                console.log(urlval)

                

            }
            else{
                console.log("In the if not url area ")

                a.push(selectionText)
                await storage_bookmarkurl.set(urlval,JSON.stringify(a))
                url.push(urlval)

            }
            console.log(url)
            
     

        })


    }
)