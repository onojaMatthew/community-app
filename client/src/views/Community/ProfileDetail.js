import React from "react";
import moment from "moment";

const ProfileDetail = ({ communityDetail}) => {
  return (
    <div className="text-left" style={{
      border: "1px solid gray",
      margin: 20,
      padding: 15
    }}>
      <h2>Profile Detail</h2>
      <p><strong>Name</strong>: &nbsp;&nbsp;&nbsp;&nbsp;{communityDetail.fullname}</p>
      <p><strong>Email</strong>: &nbsp;&nbsp;&nbsp;&nbsp;{communityDetail.email}</p>
      <p><strong>Address</strong>: &nbsp;&nbsp;&nbsp;&nbsp;{communityDetail.address}</p>
      <p><strong>Phone</strong>: &nbsp;&nbsp;&nbsp;&nbsp;{communityDetail.phone}</p>
      <p><strong>Joined</strong>: &nbsp;&nbsp;&nbsp;&nbsp;{communityDetail.createdAt && moment(communityDetail.createdAt).format("DD/MM/YYYY HH:MM:SS")}</p>
    </div>
  );
}

export default ProfileDetail;