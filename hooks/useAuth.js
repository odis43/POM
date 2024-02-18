import React, {useEffect, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../config/firebase';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        user.reload();
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, []);
  console.log('ran user hook with', user);
  return {user};
}
