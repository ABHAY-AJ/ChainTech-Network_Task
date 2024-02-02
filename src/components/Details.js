// Details.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';

const Details = () => {
  const [logindata, setLoginData] = useState([]);
  const [show, setShow] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const history = useNavigate();

  var todayDate = new Date().toISOString().slice(0, 10);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditProfile = () => setEditProfile(true);

  const handleCancelEditProfile = () => setEditProfile(false);

  const handleUpdateProfile = (updatedUser) => {
    setLoginData([updatedUser]);
    setEditProfile(false);
  };

  const Birthday = () => {
    const getuser = localStorage.getItem('user_login');
    if (getuser && getuser.length) {
      const user = JSON.parse(getuser);
      setLoginData(user);

      const userbirth = logindata.map((el) => {
        return el.date === todayDate;
      });

      if (userbirth) {
        setTimeout(() => {
          handleShow();
        }, 3000);
      }
    }
  };

  const userLogout = () => {
    localStorage.removeItem('user_login');
    history('/');
  };

  useEffect(() => {
    Birthday();
  }, []);

  return (
    <>
      {logindata.length === 0 ? (
        'error'
      ) : (
        <>
          <h1>Details Page</h1>
          <h1>{logindata[0].name}</h1>
          <Button onClick={userLogout}>LogOut</Button>
          <Button className="ml-2" onClick={handleEditProfile}>
            Edit Profile
          </Button>

          {logindata[0].date === todayDate && (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{logindata[0].name} 😄</Modal.Title>
              </Modal.Header>
              <Modal.Body>Wish you many many happy returns of the day! 🍰</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          )}

          {editProfile && (
            <EditProfile
              user={logindata[0]}
              onUpdateProfile={handleUpdateProfile}
              onCancel={handleCancelEditProfile}
            />
          )}
        </>
      )}
    </>
  );
};

export default Details;
