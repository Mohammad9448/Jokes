import './Joke.css'
function Joke(props) {
    return (
        <div className="Joke">
            {props.jokeTxt}
        </div>
    )
}

export default Joke;