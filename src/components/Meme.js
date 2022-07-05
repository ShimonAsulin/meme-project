import { useEffect, useState, useCallback } from "react"
import html2canvas from 'html2canvas';
import downloadjs from 'downloadjs';
import { BsDownload } from "react-icons/bs"


function Meme() {
    
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/26jxvz.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect( () => {
        async function fetchData() {
        const res = await fetch('https://api.imgflip.com/get_memes')
        const data = await res.json()
        setAllMemes(data.data.memes)
        }
        fetchData();
    }, [])
    
    function handleOnChange(event) {
        const {name, value} = event.target
        setMeme(prev => ({
            ...prev, 
            [name] : value
        }))
    }

    function handleClick() {

        // console.log(allMemes);
        const random = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[random].url
        setMeme(prev => ({
            ...prev,
            randomImage : url
        }))
    }

    // meme handle

    const handleCaptureClick = useCallback(async () => {
        const canvas = await html2canvas(document.querySelector('.meme'), {
            useCORS: true,
            y:-2
        });
        const dataURL = canvas.toDataURL('image/png');
        downloadjs(dataURL, 'download.png', 'image/png');
      }, []);    

    return (
        <main>
            <div className="form">  
                <input
                    dir="auto"
                    name="topText"
                    type="text"
                    placeholder="Top text"
                    className="input-form"
                    value={meme.topText}
                    onChange={handleOnChange}
                 />
                <input
                    dir="auto"
                    name="bottomText"
                    type="text"
                    placeholder="bottom text"
                    className="input-form"
                    value={meme.bottomText}
                    onChange={handleOnChange}
                 />
            </div>
            
                <div className="meme">
                    <h2 className="meme-text top">{meme.topText}</h2>
                    <img className="meme-img" alt="meme-img" src={meme.randomImage} />
                    <h2 className="meme-text bottom">{meme.bottomText}</h2>
                </div>
                
        

                <div className="btn-group">    
                    <button onClick={handleClick} className="btn btn-get-image">new image</button>
                    <button onClick={handleCaptureClick}  className="btn btn-download"><BsDownload /></button> 
                </div>

        </main>
    )
}


export default Meme