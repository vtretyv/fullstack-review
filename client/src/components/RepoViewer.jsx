import React from 'react';

const RepoViewer = (props) => (

    <li>Repo: {props.repo.full_name} , updated_at: {props.repo.updated_at}</li>

)

export default RepoViewer;