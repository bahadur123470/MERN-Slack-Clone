import { UserButton } from '@clerk/clerk-react'
import React from 'react'

const HomePage = () => {
    return (
        <>
        <div><UserButton/></div>
        <h2 className='bg-red-500'>HomePage</h2>
        </>
    )
}

export default HomePage
