import React, { useState, useEffect, useCallback } from 'react';

import Joke from './Joke/Joke';
import LoadingWave from './LoadingWave';
import './Jokes.css';
function Jokes(props) {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);



    async function getDataFromApiWithSearch() {
        const term = document.getElementById("search").value;
        if(term==='') {
            getTenRandomJokes();
            return;
        }
        setIsLoading(true);
        let response;
        let result;


        let Url = 'https://icanhazdadjoke.com/search?term=' + term + '&&page=1&&limit=10';


        response = await fetch(Url, {
            headers: {
                'Accept': 'application/json'
            }

        });

        result = await response.json();
        setIsLoading(false);
        setData(result.results);
    }
    // Better Solution
    const getTenRandomJokes = useCallback(function () {


        const Url = 'https://icanhazdadjoke.com/';
        setIsLoading(true);

        let promisses = [];
        let response;
        for (var i = 0; i < 10; i++) {
            response = fetch(Url, {
                headers: {
                    'Accept': 'application/json'
                }

            });
            let result = response.then(x => { return x.json(); });
            promisses.push(result);



        }
        
        Promise.all(promisses)
            .then((dat) => {
                setData(dat);
                setIsLoading(false);
                console.log(dat);
            })





    }, [])
    // Old Code

    // const getDataFromApi = useCallback(async function () {
    //     setIsLoading(true);
    //     let response;
    //     let result;


    //     let Url = 'https://icanhazdadjoke.com/search?term=&&page=1&&limit=10';


    //     response = await fetch(Url, {
    //         headers: {
    //             'Accept': 'application/json'
    //         }

    //     });

    //     result = await response.json();
    //     setIsLoading(false);
    //     setData(result.results);

    // }, []);  

    useEffect(() => {
        getTenRandomJokes();
    }, [getTenRandomJokes]);


    return (
        <div>
            <div className='search-section'>

                <div> <input id="search" type="text" placeholder="Search For a Joke" /> </div>
                <div> <button type="button" onClick={getDataFromApiWithSearch} > Search</button> </div>

            </div>
            <div className='jokes-container'>
                <h2>Fetched Jokes</h2>

                {!isLoading && data.map(joke => {
                    return <Joke key={joke.id} jokeTxt={joke.joke} />
                })}
                {isLoading && <LoadingWave />}
                {!isLoading && data.length === 0 && <h3>No Jokes found</h3>}


            </div>
        </div>
    )
}

export default Jokes;