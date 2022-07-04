import icon from '../meme-icon.png'
function Header() {
    return (
        <header className="header">
            <img 
                src={icon}
                className="header--icon"
                alt="icon"
                />
            <h2 className="header--title">Memes Generator</h2>
            <h3 className="header--project">React <span></span> Project</h3>
        </header>
    )
}

export default Header