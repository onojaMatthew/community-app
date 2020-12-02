// import React, { useState } from "react";
// import ReactCrop from 'react-image-crop';

// const Imagecropper = ({ senderId, newCrop, Avatar }) => {
//   const [ crop, setCrop ] = useState({
//     unit: 'px',
//     width: 50,
//     height: 50
//   })
//   return (
//     <ReactCrop src={`https://ojirehprime-community-api.herokuapp.com/v1/community/photo/${senderId}`} 
//     crop={newCrop} onChange={() => setCrop(newCrop)} onImageError={(i) => i.target.src=`${Avatar}`}/>
//   )
// }

// export default Imagecropper;