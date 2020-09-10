import React, { useEffect, useState } from 'react';
import { Redirect  } from 'react-router-dom';
import axios from 'axios';

function CreateSchoolOpeningUpdates() {

    const [states, setStates] = useState([]);
    const [loadStates, setLoadStates] = useState(false);
    const [cities, setCities] = useState([]);
    const [loadCities, setLoadCities] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    const [title, setTitle] = useState('');
    const [sourceName, setSourceName] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const [description, setDescription] = useState('');
    const [stateCode, setStateCode] = useState('');
    const [cityID, setCityID] = useState('');
    const [status, setStatus] = useState(false);

    useEffect(() => {
       async function fetchStates() {
            const resp =  await axios.get('https://teachiate-backend.fnmotivations.com/states');
            setStates([...resp.data.data]);
            setLoadStates(true);           
       }
       
       fetchStates();
    }, []);

    const stateHandler = async (e) => {
        setStateCode(e.target.value);
        if(e.target.value !== 'All') {
            const resp = await axios.get(`https://teachiate-backend.fnmotivations.com/cities/${e.target.value}`);
            setCities([...resp.data.data]);
            setLoadCities(true);
        }
        else {
            setCities([]);
            setLoadCities(false);
        }
    }

    const cityHandler = (e) => {
        setCityID(e.target.value);
    }

    const displayStates = () => {    
        return (
            <>
                <select  onChange={stateHandler}>
                    <option value='All'>All States</option>
                    {states.map(i =>  <option value={i.state_code} key={i.state_code}>{i.state}</option>)}
                </select>
            </>
        );
    }

    const displayCities = () => {
        return (
            <>
                <select  onChange={cityHandler}>
                    <option value='All'>Select a City</option>
                    {cities.map(i =>  <option value={i.id} key={i.id}>{i.city}</option>)}
                </select>
            </>
        );        
    }

    const imageHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const formHandler = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('file', selectedFile);
        const resp =  await axios.post("https://teachiate-backend.fnmotivations.com/upload", data); 

        if(resp.data.success === true) {
            
            const finalResp = await axios.post('https://teachiate-backend.fnmotivations.com/posts', {
                title,
                description,
                filePath: resp.data.filePath,
                sourceName,
                sourceUrl,
                stateCode,
                cityID
            });

            if(finalResp.data.success == true) {
                setStatus(true);

                // Make Empty
                setTitle('');
                setDescription('');
                setSourceName('');
                setSourceUrl('');
                setStateCode('')
                setCityID('');
                setStates([]);
                setSelectedFile(null);
            }
        }
    }

    return (
        <>
            {status === true ? <Redirect to="/create-updates-for-school"/> : null}
        
            <section className="teachiate_create_forum_post">
                <div className="container">
                    <div className="teachiate_create_forum_post_area main_register">
                        <h2><span className="back_to_btn"><a href="#"></a></span>Create Post Update</h2>
                        <form onSubmit={formHandler} encType='multipart/form-data'>
                            <div className="register_field">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="only_field register_field_col">
                                            <p>State</p>    
                                            {loadStates === true ? displayStates() : (
                                                <div><select  disabled><option>All States</option></select></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="only_field register_field_col">
                                            <p>City</p>                    
                                            {loadCities === true ? displayCities() : (
                                                <div><select  disabled><option>Select a City</option></select></div>
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
                                            <input id="atch_photo" type="text" name="new_file" className="register_input" onChange={imageHandler}  placeholder="Select file"/>
                                            <input type="file" name="uploaded_file" onChange={imageHandler} className="file_input_with_replacement"/>
                                            <label htmlFor="atch_photo" className="photo_attatch_btn">Select Image</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="register_field_col">
                                            <p>Source of Information</p>
                                            <input type="text" className="register_input" value={sourceName} onChange={e => setSourceName(e.target.value)} placeholder="Enter source of information"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="register_field_col">
                                            <p>Url Source</p>
                                            <input type="text" className="register_input" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} placeholder="Enter url"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="register_field_col">
                                            <p>Description</p>
                                            <textarea className="register_textarea" placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
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