import React from 'react'
import IgniteBanner from '../img/ignite_banner.jpg'; 


function HomePage ({
    isAuthenticated = false,
    onSignOut
})
{
    return (

        <div className="container">
                <img src={IgniteBanner} alt="Ignite Banner" class="ignite-banner"/>
                <div className="volunteer-title">
                    <h1>VOLUNTEER PORTAL</h1>
                    <button onClick={(event => onSignOut())}>LOG OUT</button>
                </div>
                
                {!!isAuthenticated ? (
                    <div>
                        <div className="home-sign-up-button">
                            <a href="./modules"><button type="button" className="sign-up-button">MODULES</button></a>
                        </div>
                    </div>
                ) : (
                    <div className="home-sign-up-button">
                        <a href="./sign-up"><button type="button" className="sign-up-button">SIGN UP NOW</button></a>
                    </div>
                )
                }
            {/* {console.log(isAuthenticated)} */}
        </div>
        )
    }

export default HomePage