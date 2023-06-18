import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { auth } from "../../components/firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { Button } from "react-bootstrap";
import Input from "../../components/Input";

function ChangePassword() {
  console.log("Change password page");

  // page navigation
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate('/profile');
  }

  // inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // change password
  const handleChangePassword = async () => {
    console.log("password change attempted");
    if (newPassword === "" || confirmPassword === "" || currentPassword === "") {
      alert("All fields are mandatory.");
    } else if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      try {
        // reauthenticate
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);

        // update password
        await updatePassword(auth.currentUser, newPassword);
        alert("Passwords change successful!");
      } catch (err) {
        alert(err);
      }
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };


  // Page content
  const cont = (
    <div>
      <h1>Change Password</h1>
      <br />

      <div>
        <Input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <br />
        <Button onClick={handleChangePassword}>Change Password</Button>
      </div>

      <br />
      <Button onClick={navigateToProfile}>Back</Button>
    </div>
  )

  return <Navbar content={cont} />
}

export default ChangePassword;