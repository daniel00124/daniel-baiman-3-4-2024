import React from 'react'
import {Link} from 'react-router-dom';
export default function Header() {
  return (
    <div id='header'>
        <h2>weather app</h2>
        <div id='linkBtn'>
        <Link to='/'><button >home</button></Link>
        <Link to='/favorites'><button >favorites</button></Link>
        </div>
    </div>
  )
}
