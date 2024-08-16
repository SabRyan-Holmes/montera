import React from "react";

const ProfileImage = ({ name, className="", ...props }) => {
  const nameParts = name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";

  return (
    <span className={`${className} rounded-full user-profile-image avatar ring-green-400 ring-offset-base-100 ring-1 ring-offset-1 `}
    {...props}>
      {firstNameInitial}
      {lastNameInitial}
    </span>
  );
};
export default ProfileImage;
