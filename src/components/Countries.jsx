import { useNavigate } from 'react-router-dom';
import './Countries.css';


function Countries({countryData}) {
    const navigate  = useNavigate();

    const handleNavigate =(country)=>{
        navigate(`country/${country.cca3}`)
    }
    if(!countryData){
        return(
            <h1>Loading...</h1>
        )
    }
    return (
            <div className="countries-container">
                {
                    countryData.map((country)=> (
                        <div key={country.cca3} className="country" onClick={()=> handleNavigate(country)}>
                            <img src={country.flags.png} alt={country.name.common} />
                            <div className="country-info">
                                <h3>{country.name.common}</h3>
                                <p><span>Population: </span>{country.population}</p>
                                <p><span>Region: </span>{country.region}</p>
                                <p><span>Capital: </span>{country.capital}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
    )
}

export default Countries