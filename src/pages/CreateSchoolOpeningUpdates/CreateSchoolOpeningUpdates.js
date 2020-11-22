import React, { useEffect, useState, useContext } from 'react';
import { Redirect  } from 'react-router-dom';
import axios from 'axios';
import { AuthStoreContext } from '../../Store/AuthStore';

function CreateSchoolOpeningUpdates() {
    const {isAuthenicate, userData} = useContext(AuthStoreContext);  
    const [states, setStates] = useState([]);
    const [loadStates, setLoadStates] = useState(false);
    const [cities, setCities] = useState([]);
    const [loadCities, setLoadCities] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const [state, setState] = useState('All');
    const [city, setCity] = useState('All');

    const [title, setTitle] = useState('');
    const [source, setSource] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
       window.scrollTo(0, 0);    
       async function fetchStates() {             
            const resp =  await axios.get('/states');
            setStates([...resp.data.data]);
            setLoadStates(true);           
       }

       fetchStates();  
       setToken(localStorage.getItem('jwt_token'));
    }, []);

    const stateHandler = async (e) => {
        setState(e.target.value);
        setCity('All');

        if(e.target.value !== 'All') {
            setLoadCities(true);
        }
        else {
            setLoadCities(false);
        }
    }

    const cityHandler = (e) => {
        setCity(e.target.value);
    }

    const displayStates = () => {    
        return (
            <>
                <div className='select'>
                    <select id="slct" onChange={stateHandler}>
                        <option value='All'>All States</option>
                        {states.map(state =>  <option value={state.name} key={state.code} data-key={state.code}>{state.name}</option>)}
                    </select>
                </div>
            </>
        );
    } 

    
    const displayCities = () => {
        return (
            <>
                <div className='select'>
                    <select id="slct" onChange={cityHandler}>
                        <option value='All'>Select a City</option>          
                        {states.filter(s => s.name === state).map(state => (
                            <>
                                {state.cities.map(city => (
                                    <>
                                        <option value={city.name}>{city.name}</option>
                                    </>
                                ))}
                            </>
                        ))}             
                    </select>
                </div>
            </>
        );        
    }

    const imageHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const formHandler = async (e) => {
        e.preventDefault();       

        var image = null;

        if(selectedFile !== null) {
            const data = new FormData()
            data.append('file', selectedFile);
            const resp =  await axios.post("/upload", data); 
            if(resp.data.success === true) { 
                image = resp.data.filePath;
            }
        }
    
        const postData = {
            title,
            content,
            source,
            image,
            state,
            city                
        }            
        const finalResp = await axios.post('/school-opening-updates', postData, {
            headers: {
            'authorization': `Bearer ${token}`
            }
        });

        if(finalResp.data.success === true) {
            setStatus(true);
            setTitle('');
            setContent('');
            setSource('');
            setState('')
            setCity('');
            setState([]);
            setSelectedFile(null);
        }       
    }

    return (
        <>
            {status === true ? <Redirect to="/opening-school-in-covid-siutation"/> : null}
        
            <section className="teachiate_create_forum_post">
                <div className="container">
                    <div className="teachiate_create_forum_post_area main_register">
                        <h2>
                            <span className="back_to_btn"><a href="#"></a></span>
                            {isAuthenicate && userData.role === 'admin' ? 'Create School Update' : 'Contribute Information'}
                        </h2>
                        <form onSubmit={formHandler} encType='multipart/form-data'>
                            <div className="register_field">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="only_field register_field_col">
                                            <p>State</p>    
                                            {loadStates === true ? displayStates() : (
                                                <div className='select'>
                                                    <select  id="slct" disabled><option>All States</option></select>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="only_field register_field_col">
                                            <p>City</p>                    
                                            {loadCities === true ? displayCities() : (
                                                <div className='select'>
                                                    <select id="slct"  disabled><option>Select a City</option></select>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="register_field_col">
                                            <p>Title</p>
                                            <input type="text" className="register_input" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="register_field_col">
                                            <p>Add Image</p>
                                            <div className="field input">
                                            <input type="file" name="uploaded_file" onChange={imageHandler} className='register_input'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="register_field_col">
                                            <p>Description</p>
                                            <textarea className="register_textarea" placeholder="Enter description" value={content} onChange={e => setContent(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">                                    
                                    <div className="col-md-12">
                                        <div className="register_field_col">
                                            <p>Url Source</p>
                                            <input type="text" className="register_input" value={source} onChange={e => setSource(e.target.value)} placeholder="Enter url"/>
                                        </div>
                                    </div>
                                </div>

                                <input type="submit" className="register_submit" value='Submit'/>
                            </div>                        
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CreateSchoolOpeningUpdates;