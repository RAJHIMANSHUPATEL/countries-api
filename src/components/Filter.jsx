import { FaSearch } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import './Filter.css';
import { useState, useEffect } from "react";

function Filter({ countryData, setCountryData }) {
    const [originalData, setOriginalData] = useState([]);
    const [showAcc, setShowAcc] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    useEffect(() => {
        if (countryData && countryData.length > 0 && originalData.length === 0) {
            setOriginalData(countryData);
        }
    }, [countryData, originalData]);


    const uniqueRegions = originalData 
        ? [...new Set(originalData.map(country => country.region))].filter(Boolean)
        : [];

        const handleRegion = (reg)=>{
            if(reg === 'All'){
                setCountryData(originalData)
                setSelectedRegion('All')
            }
            else{
                setSelectedRegion(reg)
                const newRegionData = originalData.filter((country)=> country.region === reg);
                setCountryData(newRegionData)
            }
        }

    const handleChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);

        if (value === '') {
            
            setCountryData(originalData);
        } else {
            setCountryData(
                originalData.filter((country) =>
                    country.name.common.toLowerCase().includes(value)
                )
            );
        }
    };

    return (
        <div className="filter-container">
            <div className="search">
                <FaSearch className="search-icon"/>
                <input 
                    type="text" 
                    placeholder="Search for a country..." 
                    onChange={handleChange}
                    value={search}
                />
            </div>
            <div className="filter"
                onClick={() => setShowAcc((prev) => !prev)}
            >
                <div className="filter-options">
                    <p>{selectedRegion? selectedRegion: 'Filter by Region'}</p>
                    <RiArrowDropDownLine />
                </div>
                <div 
                    className={`${showAcc ? 'show filter-accordion' : 'filter-accordion'}`}
                >   
                    <div className="region" onClick={()=> handleRegion('All')}>
                    <p>All</p>
                    </div>
                    {!countryData ? (
                        <p>Loading...</p>
                    ) : (
                        uniqueRegions.map((region, index) => (
                            <div onClick={()=> handleRegion(region)} className="region" key={index}>
                                <p>{region}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Filter;
