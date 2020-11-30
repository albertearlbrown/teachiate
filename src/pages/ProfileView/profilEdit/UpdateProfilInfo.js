import React, { useState, useEffect } from 'react';
import axios from "axios";

const ProfilEdit = ({setLoading, userData, setOpenNotification})=>{
  const [day, setDay] = useState(null)
  const [year, setYear] = useState(null)
  const [month, setMonth] = useState(null)
  const [fullName, setFullName] = useState(null)
  const [gender, setGender] = useState(null)
  const [role, setRole] = useState(null)
  const [location, setLocation] = useState(null)

  useEffect(()=>{
    if (userData.birthDate) {
      const date = new Date(userData.birthDate)
      setDay(date.getDate())
      setYear(date.getFullYear())
      setMonth(date.getMonth())
    }
    setFullName(userData.fullName)
    setGender(userData.gender)
    setRole(userData.role)
    setLocation(userData.location)
  }, [userData])
  const days = ()=>{
    const m = []
    for (let i = 1; i <= 31; i++) {
      m.push(<option value={i}>{i}</option>)
    }
    return m
  }

  const years = ()=>{
    const m = []
    for (let i = new Date().getFullYear(); i > new Date().getFullYear()-100; i--) {
      m.push(<option value={i}>{i}</option>)
    }
    return m
  }

  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    axios({
      method: "put",
      url: '/users/update-profil',
      data: {
        location,
        fullName,
        gender,
        birthDate: new Date(year, month - 1, day),
        role,
      }
    }).then(()=>{
      setOpenNotification(true)
      setLoading(false)
    }).catch(()=>setLoading(false))
  }
  return(
    <div id="profile_info" className="item2 active" data-title="Profile Info">
      <div className="item-content2">
        <form onSubmit={e=> onSubmit(e)}>
          <div className="profile_edit_area">
            <div className="profile_edit_col">
              <div className="profile_edit_field only_name">
                <p>Name</p>
                <div className="only_field">
                  <input
                    type="text"
                    className="profile_edit_input"
                    defaultValue={userData.fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="profile_edit_col">
              <div className="profile_edit_field">
                <p>Member Type (Required)</p>
                <div className="only_field">
                  <div className="custom-select-active">
                    <select
                      defaultValue={userData.role}
                      onChange={(e) => setRole(e.target.value)}
                      >
                      <option value={"Parent"}>Parent</option>
                      <option value={"Student"}>Student</option>
                      <option value={"Teacher"}>Teacher</option>
                      <option value={"General Education"}>General Educator</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile_edit_col">
              <div className="profile_edit_field">
                <p>State/Country (Required)</p>
                <div className="only_field">
                  <input
                    type="text"
                    className="profile_edit_input"
                    defaultValue={userData.location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="profile_edit_col">
              <div className="profile_edit_field">
                <p>Gender</p>
                <div className="only_field">
                  <div className="custom-select">
                    <select onChange={(e) => setGender(e.target.value)} defaultValue={userData.gender} className="custom-select-active">
                      <option value="" disabled>Gender</option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                      <option value={"transgender"}>Transgender</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile_edit_col">
              <div className="profile_edit_field">
                <p>Date of Birth</p>
                <div className="only_field">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="custom-select">
                        <select placeholder="Day" className="custom-select-active" onChange={(e) => setDay(e.target.value)}>
                          <option value="" disabled>Day</option>
                          {days()}
                        </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                      <div className="custom-select">
                        <select placeholder="Month" className="custom-select-active" onChange={(e) => setMonth(e.target.value)}>
                          <option value="" disabled>Month</option>
                          <option value={1}>January</option>
                          <option value={2}>February</option>
                          <option value={3}>March</option>
                          <option value={4}>April</option>
                          <option value={5}>May</option>
                          <option value={6}>Jun</option>
                          <option value={7}>July</option>
                          <option value={8}>August</option>
                          <option value={9}>September</option>
                          <option value={10}>October</option>
                          <option value={11}>November</option>
                          <option value={12}>December</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="custom-select">
                        <select placeholder="Year" className="custom-select-active" onChange={(e) => setYear(e.target.value)} >
                          <option value="" disabled>Year</option>
                          {years()}
                        </select>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile_edit_col settings_form_col">
              <input type="submit" defaultValue="Save Changes" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilEdit;
