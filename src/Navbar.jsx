// type rfc or rfce for template
import React from 'react';
import {Link} from 'react-router-dom';
// allows for client-side navigation between different components or pages within the application without causing a full page reload.
// Using Link, you define the target path declaratively with the to prop, making your code more readable and maintainable.


export default function Navbar() {
  return (
    
    <nav>

        <Link to='/Home'>HOME</Link>
        <Link to='/Signup'>Signup</Link>
        <Link to='/login'>LOGIN</Link>

        {/* clicking on the link updates url without reloading the page */}

    </nav>

  )
}
