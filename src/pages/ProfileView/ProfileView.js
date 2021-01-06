import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthStoreContext } from '../../Store/AuthStore';
import ProfilNavBar from './NavBar'
import ThoughtComponents from './ThoughtsComponents';
import FriendsComponent from "./friendsComponent/index"
import Settings from "./settings"
import ProfilEdit from './profilEdit'
import MessagesView from './messages'
import GroupsView from './groups';
import { connect } from 'react-redux';
import profilActions from '../../redux/profil/actions'

const ProfileView = ({redirectToMessagesList, dispatch}) => {
    const {userData} = useContext(AuthStoreContext);

    const [newAvatarFile, setNewAvatarFile] = useState(null);
    const [newProfileCover, setnewProfileCover] = useState(null);
    const [currentView, setView] = useState('thoughts')

    useEffect(()=>{
      if (redirectToMessagesList) {
        setView('messages')
        dispatch({
          type: profilActions.SET_STATE,
          payload: { redirectToMessagesList: false}
        })
      }
    }, [redirectToMessagesList])

    const changeProfileCover = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);
        const resp = await axios.post('https://api.teachiate.com/upload', data);
        if(resp.data.success === true) {
            const data = {
                cover: resp.data.filePath
            }

            const fn = await axios.post('/users/change-profile-cover', data);
            if(fn.data.success === true) {
                setnewProfileCover(data.cover);
            }
        }
    }

    const uploadAvatar = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);
        const resp = await axios.post('https://api.teachiate.com/upload', data);
        if(resp.data.success === true) {
            const data = {
                avatar: resp.data.filePath
            }
            const fn = await axios.post('/users/change-profile-avatar', data);
            if(fn.data.success === true) {
                setNewAvatarFile(data.avatar);
            }
        }
    }

    return (
        <>
        <section className="profile-banner-section">
            <div className="container-fluid">
                {/* <!-- profile-banner --> */}
                <div className="profile-banner">
                    <div className="avatar-upload">
                        <div className="avatar-edit">
                            <input type='file' id="imageUpload2" accept=".png, .jpg, .jpeg" onChange={(e) => changeProfileCover(e)}/>
                            <label htmlFor="imageUpload2"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Change Cover Image</label>
                        </div>
                        <div className="avatar-preview">
                            {newProfileCover === null ? (
                               userData.cover !== null ? <div id="imagePreview" style={{backgroundImage: `url('${userData.cover}')`}}></div> : null
                            ) : <div id="imagePreview2" style={{backgroundImage: `url('${newProfileCover}')`}}></div>}
                        </div>
                    </div>
                </div>
                {/* <!-- profile-banner --> */}
                {/* <!-- avatar-upload --> */}
                <div className="avatar-upload-section clearfix">
                    <div className="avatar-upload">
                        <div className="avatar-edit">
                            <form>
                                <input type='file' id="imageUpload" onChange={(e) => uploadAvatar(e)} accept=".png, .jpg, .jpeg" />
                                <label htmlFor="imageUpload"></label>
                            </form>
                        </div>
                        <div className="avatar-preview">
                            {newAvatarFile === null ? (
                                <div id="imagePreview" style={userData.avatar === null ?  {backgroundImage: `url('/assets/img/placeholder/user.png')`} : {backgroundImage: `url('${userData.avatar}')`}}></div>
                            ): <div id="imagePreview" style={{backgroundImage: `url('${newAvatarFile}')`}}></div>}
                        </div>
                    </div>
                    <div className="avatar-info">
                        <div className="avatar-name">
                            <h3><a href="#">{userData.fullName} </a> </h3>
                            <div className="clear"></div>
                        </div>
                        <div className="avatar-status">
                            <h3>{userData.role}</h3>
                            {userData.online && <h4><span className="active"></span> Active </h4>}
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
                {/* <!-- avatar-upload --> */}
            </div>
        </section>


        {/* <!-- inner people page end end--> */}
        <section className="profile-details clearfix">
            <div className="container-fluid">
                {/* <!-- profile-left --> */}
                <div className="profile-left">
                    <div className="profile-wrapper">
                        <ProfilNavBar setView={setView} view={currentView} />
                        {currentView === 'thoughts' &&<ThoughtComponents />}
                        {currentView === 'friends' &&<FriendsComponent />}
                        {currentView === 'settings' &&<Settings />}
                        {currentView === 'profilEdit' &&<ProfilEdit />}
                        {currentView === 'messages' &&<MessagesView />}
                        {currentView === 'groups' &&<GroupsView />}
                   </div>
                </div>
            </div>
        </section>
        </>
    )
};
const mapStateToProps = state => {
  return state.profil
}

export default connect(mapStateToProps)(ProfileView);
