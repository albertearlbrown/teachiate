import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    tage: {
      margin: theme.spacing(0.5),
    },
}));

function CreateForumPost() {
    const classes = useStyles();
    const [category, setCategory] = useState('General Community Chat');
    const [subcategory, setSubcategory] = useState('Parent');
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [token, setToken] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem('jwt_token'));
    }, []);

    const handleTageDelete = (tagToDelete) => () => {
        setTags((tags) => tags.filter((tags) => tags.key !== tagToDelete.key));
    };

    const formHandler = async (e) => {
        e.preventDefault();
        const data = {
            title,
            description,
            category,
            subcategory,
            tags
        }
       const resp = await axios.post('https://teachiate-backend.fnmotivations.com/forum', data, {
            headers: {
                'authorization': `Bearer ${token}`
            }
       });
       if(resp.data.success !== false) {
           alert('Thank You For Creating Post');
           window.location.replace(`forum/${resp.data.post_id}`);
       }       
    };    

    const addTags = (e) => {

        if(e.key === 'Enter') {
            const label =  e.target.value;   
            const key = Math.random();          
            const tage = {
                label,
                key
            }
            setTags([...tags, tage]);
            setTagInput('');
        }        
    }

    return (
        <>
            <section className="teachiate_create_forum_post">
                <div className="container">
                    <div className="teachiate_create_forum_post_area main_register">
                        <h2><span className="back_to_btn"><a href="#"></a></span> Create A Forum</h2>
                        <form method='POST' onSubmit={formHandler}>
                            <div className="register_field">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="only_field register_field_col">
                                            <p>Select Category</p>
                                            <div className='select'>
                                                <select name="slct" id="slct" onChange={(e) => setCategory(e.target.text)}>
                                                    <option>General Community Chat</option>
                                                    <option>Higher Education Chat</option>
                                                    <option>Parental Connection</option>
                                                    <option>Parents and Teachers Lounge</option>
                                                    <option>Teachers Lounge</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="only_field register_field_col">                                                                                    
                                            <p>Select Sub Category</p>
                                            <div className='select'>
                                                <select name="slct" id="slct" onChange={(e) => setSubcategory(e.target.text)}>
                                                    <option>Parent</option>
                                                    <option>Student</option>
                                                    <option>Teacher</option>
                                                    <option>General Educator</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="register_field_col">
                                            <p>Title</p>
                                            <input type="text" className="register_input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="register_field_col">
                                            <p>Description</p>
                                            <textarea onChange={(e) => setDescription(e.target.value)} value={description}  className="register_textarea" placeholder="Enter description"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.root}>
                                    {tags.map(tag => (
                                        <li key={tag.key} style={{marginBottom: '10px'}}>
                                            <Chip 
                                                label={tag.label}
                                                onDelete={handleTageDelete(tag)}
                                                className={classes.tage}
                                            /> 
                                        </li>
                                    ))}

                                    <input type='text' className='register_input' placeholder='Add topic tage here' value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={addTags} />
                                </div>
                                <input type="submit" className="register_submit" value="SUBMIT" name=""/>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}



export default CreateForumPost;