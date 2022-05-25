import axios from 'axios'
import React from 'react'

const EditProfile = () => {
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
  const [name, setname] = React.useState('')
  const [lastname, setLastname] = React.useState('')
  const [email, setmail] = React.useState('')
  const [bio, setbio] = React.useState('')
  const [phone, setphone] = React.useState('')
  const getProfile = () => {
    axios.get('http://localhost:5000/getprofile/' + id).then(data => {
        setname(data.data.name)
        setmail(data.data.email)
        setphone(data.data.phone)
    })
}
React.useEffect(() => {
  getProfile()
}, [])


  const update = async (e) => {
    e.preventDefault()
    try {
      const update = await axios.put('http://localhost:5000/profileupdate/' + id, {
        name,
        email,
        phone
      })
      console.log(update.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container col-md-8 my-5 px-5 bg-light">
        <div className="row">
          <div className="col-md-3">
            <div className="p-1">
              <p className="text text-dark text-center fs-2 h3 mb-5">
                User Profile
              </p>
              <div>
                <a href="#" className="text-decoration-none">
                  <div className="d-flex justify-content-start align-items-center mb-4 border-end border-4 border-danger">
                    <i className="fas fa-user me-3 fs-5 text-primary"></i>
                    <p className="text text-primary mb-0 fs-5">My Order</p>
                  </div>
                </a>
                <a href="#" className="text-decoration-none">
                  <div className="d-flex justify-content-start align-items-center mb-4">
                    <i className="fas fa-heart me-3 fs-5 text-primary"></i>
                    <p className="text text-primary mb-0 fs-5">Favourites</p>
                  </div>
                </a>
                <a href="#" className="text-decoration-none">
                  <div className="d-flex justify-content-start align-items-center mb-4">
                    <i className="fas fa-star me-3 fs-5 text-primary"></i>
                    <p className="text text-primary mb-0 fs-5">Review</p>
                  </div>
                </a>
                <a href="#" className="text-decoration-none">
                  <div className="d-flex justify-content-start align-items-center mb-4">
                    <i className="fas fa-address-book me-3 fs-5 text-primary"></i>
                    <p className="text text-primary mb-0 fs-5">Saved Address</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <form method='post'>
              <div className="ps-5 py-1 mt-4">
                <div className="position-relative mt-4">
                  <div className="d-flex justify-content-start align-items-center">
                    <div className="me-5">
                      <img
                        src="https://cdn.pixabay.com/photo/2021/11/04/12/34/beauty-6768212__340.jpg"
                        alt=""
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                      <div
                        className="position-absolute"
                        style={{ bottom: "0px", left: "14%" }}
                      >
                        <button className="btn btn-link text-decoration-none">
                          <i className="fa fa-pencil fs-6 text-white bg-danger rounded-circle p-2"></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="tex text-dark h3 mb-1">Vivek Sah</p>
                      <p className="text text-secondary">
                        viveksah9800@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <form>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="w-50 me-4">
                      <label htmlFor="firstnae" className="fw-bold h6">
                         Username
                      </label>
                      <input value={name} onChange={e => setname(e.target.value)} type="text" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="w-50 me-4">
                      <label htmlFor="emailaddress" className="fw-bold h6">
                        Email Address
                      </label>
                      <input value={email} onChange={e => setmail(e.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="w-50 ms-4">
                      <label htmlFor="phonenumber" className="fw-bold h6">
                        Phone Number
                      </label>
                      <input value={phone} onChange={e => setphone(e.target.value)} type="text" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="w-75 me-4">
                      <label htmlFor="bio" className="fw-bold h6">
                        Bio
                      </label>
                      <input onChange={e => setbio(e.target.value)} type="text" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <button onClick={update} type='submit' className=" px-5" >Save Changes</button>
                </div>
              </form>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


export default EditProfile