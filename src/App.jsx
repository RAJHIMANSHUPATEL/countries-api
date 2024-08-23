import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// importing components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import Country from './pages/Country';

function App() {
  const [countryData, setCountryData] = useState(null);
  const [theme, setTheme] = useState('light');

  const handleThemeToggle = ()=> {
    setTheme((prevTheme)=> (
      prevTheme === 'dark'? 'light' : 'dark'
    ))
  }
  
  useEffect(()=>{
    const fetchCountries = async ()=>{
        try {
          const countries = await axios.get('https://restcountries.com/v3.1/all');
          setCountryData(countries.data);
        } catch (error) {
          console.log('Error fetching the data:', error)
        }

    }

    fetchCountries();
  }, [])



  return (
    <main className={theme==='dark'? 'dark' : 'light'}>
      <BrowserRouter>
        <Navbar 
            theme={theme}
            handleThemeToggle={handleThemeToggle}
          />
          <Routes>
            <Route path='/' element={<Home countryData={countryData} setCountryData={setCountryData}/>}/>
            <Route path='/country/:cca3' element={<Country />} />
          </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App