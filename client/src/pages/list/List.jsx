import React, { useState} from 'react'
import './list.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import SearchItem from '../../components/searchItem/SearchItem'
import {useLocation} from 'react-router-dom'
import { format} from 'date-fns'
import { DateRangePicker, DateRange } from 'react-date-range';
import useFetch from '../../hooks/useFetch.js'


const List = () => {
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [openDate,setOpenDate] = useState(false)
  const [dates, setDates] = useState(location.state.dates)
  const [options, setOptions] = useState(location.state.options)
  const [min,setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  
  const { data,loading,error,reFetch} = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min ||0}&max=${max || 999}`)

  const handleClick = () => {
    reFetch()
  }


  return (
    <div>
        <Navbar />
        <Header type="list" />
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch"> 
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
              <input placeholder={destination
              } type="text" />
            </div>
            <div className="lsItem">
              <label>Check-In Date</label>
              <span onClick={ ()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")}`} to {`${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate &&
                (<DateRange
                  ranges={dates}
                  onChange={item => setDates([item.selection])}
                  minDate={new Date}
                />)}
                
            </div>
            <div className="lsItem">
              <label >Options</label>
              <div className="lsOptions">
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min Price <small>per night</small>
                </span>
                <input onChange={e=>setMin(e.target.value)} type="number" className="lsOptionInput"/>
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max Price <small>per night</small>
                </span>
                <input onChange={e=>setMax(e.target.value)} type="number" className="lsOptionInput"/>
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Adult
                </span>
                <input min={ 1} type="number" className="lsOptionInput" placeholder={ options.adults} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Children
                </span>
                <input min={ 0} type="number" className="lsOptionInput" placeholder={ options.children}/>
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Room
                </span>
                <input min={ 1} type="number" className="lsOptionInput" placeholder={ options.rooms}/>
                </div>
                </div>
            </div>
            <button onClick={handleClick }>Search</button>
            </div>
            <div className="listResult">
              {
                loading ? "loading options..."
                  : <>
                    {
                      data.map(item => {
                        return <SearchItem item={ item} key={ item._id} />
                      })
                    }
                  </>
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default List