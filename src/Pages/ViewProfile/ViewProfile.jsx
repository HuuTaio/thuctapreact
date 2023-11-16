import React from 'react';
import "./ViewProfile.css"
const ViewProfile = () => {
  const profileContent = sessionStorage.getItem('profileContent');
  const profileName = sessionStorage.getItem('profileName');
  return (
      <div className='ViewProfile'>
         <h2>{profileName}</h2>
         <div className='Content'>
          <p dangerouslySetInnerHTML={{ __html: profileContent }}></p>
          </div>
      </div>
  );
};


export default ViewProfile;