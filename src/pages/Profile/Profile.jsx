import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpdate = () => {
    if (!photo) return alert("Lütfen bir foto seçin");
    
    // Navbar ile paylaşmak için localStorage kullanıyoruz
    localStorage.setItem("profilePhoto", photo);

    alert("Profil fotoğrafı güncellendi!");
    navigate("/");
  };

  return (
    <div className="profile">
      <h1>Profil</h1>

      <img
        src={photo || "/default-avatar.png"}
        alt="Profile"
        className="profile-img"
      />

      <input type="file" accept="image/*" onChange={handleSelect} />

      <button onClick={handleUpdate}>Profili Güncelle</button>
    </div>
  );
};

export default Profile;
