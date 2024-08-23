import './Home.css';
import Countries from '../components/Countries'
import Filter from '../components/Filter';

function Home({countryData, setCountryData}) {
    return(
        <div className="home">
            <div className="container">
                <Filter countryData={countryData} setCountryData={setCountryData}/>
                <Countries countryData={countryData}/>
            </div>
        </div>
    )
}

export default Home