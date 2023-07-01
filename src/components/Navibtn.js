import React from 'react'
import { Link } from 'react-router-dom'

const Navibtn = () => {
    return (<>
        <div className='container d-flex justify-content-between'>
            <Link to="/" className='btn btn-primary'>Home</Link>
            <Link to="/addqna" className='btn btn-primary'>Add Q&A</Link>
            <Link to="/showqna" className='btn btn-primary'>Show Q&A</Link>
        </div>
    </>
    )
}

export default Navibtn