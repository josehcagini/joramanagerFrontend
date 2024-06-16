import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';


export default function Logout() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.logout())
  }, [])

  return (
    <div>
      <h2>Logout</h2>
    </div>
  );
}
