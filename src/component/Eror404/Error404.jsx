import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import { useHistory } from 'react-router';
const Error404 = () =>{ 
    const history=useHistory();
return(<div>
    <div className="d-flex justify-content-center mt-5">
        <div className="text-center mt-5">
        <Icon.EmojiDizzyFill size={150} className="mb-4 mt-5" />
        <h1 className="mb-4" >404</h1>
        <h2 className="mb-4">Ooops! Looks like you got lost</h2>
        <button className="btn btn-dark" onClick={()=>history.push("/")}>Go to website</button>
        </div>
    </div>
</div>
)
}
export default Error404;