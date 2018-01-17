import React from 'react'
import IgniteBanner from '../img/ignite_banner.jpg'; 


function HomePage ({
    isAuthenticated
})
    {
        return (
            <div className="container">
                <img src={IgniteBanner} alt="Ignite Banner" class="ignite-banner"/>
                <div className="volunteer-title">
                    <h1>VOLUNTEER PORTAL</h1>
                </div>
                <div className="home-sign-up-button">
                    <button type="button" className="sign-up-button">SIGN UP NOW</button>
                </div>
            </div>
        )
    }

export default HomePage