import React, { useEffect, useState }  from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchForumPost() {
    let { keyword } = useParams();

    useEffect(() => {
        console.log(keyword);
    });

    return (
        <>
            Search Keyword
        </>
    );
}

export default SearchForumPost;