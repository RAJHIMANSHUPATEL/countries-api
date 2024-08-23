import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import './Country.css';

function Country() {
 const { cca3 } = useParams(); // Retrieve the country code from the URL
const [country, setCountry] = useState(null);
const [borderCountries, setBorderCountries] = useState([]);

const navigate = useNavigate();

useEffect(() => {
const fetchCountry = async () => {
    try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${cca3}`);
    setCountry(response.data[0]);

    // Fetch border countries by their codes
    const borderCodes = response.data[0].borders;
    if (borderCodes && borderCodes.length > 0) {
        const borderResponses = await Promise.all(
        borderCodes.map(code => axios.get(`https://restcountries.com/v3.1/alpha/${code}`))
        );
        setBorderCountries(borderResponses.map(res => res.data[0].name.common));
    } else {
        setBorderCountries(['No neighboring countries']);
    }
    } catch (error) {
    console.log('Error fetching the country data:', error);
    }
};

fetchCountry();
}, [cca3]);

    

if (!country) {
    return (
    <h1>Loading...</h1>
    );
}

// Extract currencies information
const currencies = country.currencies 
? Object.values(country.currencies).map(currency => currency.name).join(', ') 
: 'N/A';

// Extract native name information
const nativeName = country.name.nativeName 
? Object.values(country.name.nativeName)[0].common 
: 'N/A';

// Extract languages
const languages = country.languages ? Object.values(country.languages).join(', '): 'N/A';

// Extract border countries


return (
    <div className="container country-page">
        <button 
            className='button'
            onClick={()=> navigate('/')}
        ><IoIosArrowRoundBack className='back-arrow'/> <p>Back</p></button>
        <div className="country-details">
            <img className='flag' src={country.flags.svg} alt={country.name.common} />
            <div className="name">
                <h2>{country.name.common}</h2>
                <div className="country--info">
                    <section className="left">
                    <p><span>Native Name: </span>{nativeName}</p>
                    <p><span>Population: </span>{country.population}</p>
                    <p><span>Region: </span>{country.region}</p>
                    {country.subregion && <p><span>Sub Region: </span>{country.subregion}</p> }
                    <p><span>Capital: </span>{country.capital}</p>
                    </section>
                    <section className="right">
                        <p><span>Currency: </span>{currencies}</p>
                        <p><span>Languages: </span>{languages}</p>
                    </section>
                    <section className="bottom">
                        <div>
                            <span>Border Countries: </span>
                            {
                            borderCountries.map((c, index)=> (
                                <p key={index}>{c}</p>
                            ))
                        }
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    );
    }

    export default Country;
