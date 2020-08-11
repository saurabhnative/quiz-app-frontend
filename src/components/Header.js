import React from 'react';
import { withRouter } from 'react-router-dom';
function Header(props) {
    function handleLogout() {
        localStorage.clear()
        props.history.push('/login');
    }
    function renderLogout() {
        if(props.location.pathname === '/create') {
            return(
                <div className="col-1 navbar-right">
                    <button className="btn btn-primary my-2 my-sm-0" onClick={()=>handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    if(props.location.pathname === '/') {
        return null;    
    }
    return(
        <header className="w-100">
        <nav className="navbar w-100 navbar-light bg-dark justify-content-center">
            <div className="d-flex justify-content-center text-light h3 pl-4">Quiz App</div>
            {renderLogout()}
        </nav>
      </header>
    );
}
export default withRouter(Header);