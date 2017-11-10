import React from 'react';

const RepoViewer = (props) => (

    <li>Repo: {props.repo.full_name} , updated_at: {props.repo.updated_at} , <a href = {props.repo.html_url}>Link to repo </a></li>
    

)

export default RepoViewer;