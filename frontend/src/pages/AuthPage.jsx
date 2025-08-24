import React from 'react'
import { SignInButton } from '@clerk/clerk-react'
import "../styles/auth.css"

const AuthPage = () => {
    return (
        <div className='auth-container'>
            <div className='auth-left'>
                <div className='auth-hero'>
                    <div className='brand-container'>
                        <img src="/slack-logo.png" alt="Slack" className='brand-logo' />
                        <span className='brand-name'>Slack</span>
                    </div>
                    <h1 className='hero-title'>Where works happen ✨</h1>
                    <p className='hero-subtitle'>
                        Connect with team instantly through secure,  real-time messaging. 
                        Experience seamless collaboration with powerful feature designed for modern teams.
                    </p>
                    <div className='features-list'>
                        <div className='feature-item'>
                            <span className='feature-icon'>💬</span>
                            <span>Real-time Messaging</span>
                        </div>
                        <div className='feature-item'>
                            <span className='feature-icon'>🎥</span>
                            <span>Video calls & meeting</span>
                        </div>
                        <div className='feature-item'>
                            <span className='feature-icon'>🔒</span>
                            <span>Secure & private</span>
                        </div>
                    </div>
                    <SignInButton mode='modal'>
                        <button className='cta-button'>
                            Get start with Slack
                            <span className='button-arrow'>→</span>
                        </button>
                    </SignInButton>
                </div>
            </div>

            <div className='auth-right'>
                <div className='auth-image-container'>
                    <img src="/auth-i.png" alt="Team collaboration" className='auth-image' />
                    <div className='image-overlay'></div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
