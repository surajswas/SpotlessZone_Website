
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
const UserProfile = () => {

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    // get user form the token
    const token_data = localStorage.getItem("token")
    const token = parseJwt(token_data)
    const id = token?.user._id

    const [userdata, setuserdata] = React.useState({})

    const getProfile = () => {
        axios.get('http://localhost:5000/getprofile/' + id).then(data => {
            setuserdata(data.data)
        })
    }
    React.useEffect(() => {
        getProfile()
    }, [])


    return (
        <>
            <div className="container col-md-5 col-sm-12 col-12 bg-lighte shadow rounded py-4 px-4">
                {/* <h1 className="text text-secondary h6">My Profile</h1> */}
                <div className="pp-section text-center">
                    <div className="position-relative">
                        <img
                            src="https://cdn.pixabay.com/photo/2021/11/04/12/34/beauty-6768212__340.jpg"
                            alt=""
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "50%",
                            }}
                        />
                        <div
                            className="position-absolute"
                            style={{ bottom: "0px", left: "50%" }}
                        >
                            <button className="btn btn-link text-decoration-none">
                                <i className="fa fa-edit fs-3 text-white"></i>
                            </button>
                        </div>
                    </div>
                    <p className="text text-secondary mb-1 fw-bold h5">{userdata?.name}</p>
                    <small className="text text-secondary d-block text-center mb-4">{userdata?.email}</small>
                    <Link to="/edit-profile" className="text-decoration-none" style={{ color: "#25C6AA" }}>
                        Edit Profile
                    </Link>
                </div>
                <hr />
                <div className="history">
                    <p className="text tex-secondary h5 text-center">Bio</p>
                    <p className="text text-secondary">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptate! Non vero mollitia corporis nulla?
                    </p>
                </div>
                <hr />
                <div className="flex justify-content-center align-items-center text-center">
                    <button className="btn btn-link text-decoration-none" style={{ color: "#25C6AA" }}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserProfile