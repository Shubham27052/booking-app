import React from 'react'
import './featured.css'
import useFetch from '../../hooks/useFetch'

const Featured = () => {

    const { data, loading, error, } = useFetch("http://localhost:8800/api/hotels/countByCity?cities=madrid,london,berlin") 

    return (
        <div className="featured">
            {loading
                ? "Loading please wait..."
                :
                <>
                <div className="featuredItem">
                    <img src="https://st2.depositphotos.com/2851095/6013/i/950/depositphotos_60139969-stock-photo-the-temple-bar.jpg" className="featuredImg"  alt=""/>
                    <div className="featuredTitles">
                        <h1>Madrid</h1>
                        <h1>{ data[0]} properties</h1>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://s-media-cache-ak0.pinimg.com/originals/04/44/b9/0444b939ad7af5e06e3be23234775bb6.jpg" className="featuredImg"  alt=""/>
                    <div className="featuredTitles">
                        <h1>London</h1>
                            <h1>{ data[1]} properties</h1>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://thewire.in/wp-content/uploads/2017/04/dinodia-163710.jpg" className="featuredImg" alt=""/>
                    <div className="featuredTitles">
                        <h1>Berlin</h1>
                        <h1>{data[2]} properties</h1>
                    </div>
                </div>
            </>}
        
        </div>
    )
}

export default Featured
