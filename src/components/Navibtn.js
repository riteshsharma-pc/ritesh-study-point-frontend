import React from 'react'
import { Link } from 'react-router-dom'

const Navibtn = () => {
    return (<>
        <div className='container d-flex justify-content-evenly my-2'>
            <Link to="/" className='btn btn-primary'>Home</Link>
            <Link to="/addqna" className='btn btn-primary'>Add Q&A</Link>
            <Link to="/addtheory" className='btn btn-primary'>Add Theory</Link>
            <Link to="/showqna" className='btn btn-primary'>Show Q&A</Link>
            <Link to="/showtheory" className='btn btn-primary'>Show Theory</Link>
        </div>
    </>
    )
}

export default Navibtn