export const getWeekExercises = (
  phase: string,
  week: number,
  userid: number,
  url: string,
) => {
  let url1 =
    url +
    'get-week-exercises.php?phase=' +
    phase +
    '&week=' +
    week +
    '&userid=' +
    userid;

  return (dispatch) => {
    fetch(url1)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({type: 'WEEK_FETCH', payload: data});
      })
      .catch((error) => console.log(error));
  };
};

export const getMaxes = (userid: number, url: string) => {
  let url1 = url + 'get-max-lifts.php?userid=' + userid;

  console.log('url: ' + url1);

  return (dispatch) => {
    fetch(url1)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({type: 'MAXES_FETCH', payload: data});
      })
      .catch((error) => console.log(error));
  };
};

export const completeDay = (
  phase: string,
  week: number,
  day: number,
  completedExercises: string,
  userid: number,
  url: string,
) => {
  return (dispatch) => {
    fetch(url + 'saveProgress.php', {
      method: 'POST',
      body: JSON.stringify({
        phase: phase,
        week: week,
        day: day,
        completedExercises: completedExercises,
        userid: userid,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        dispatch({type: 'PROGRESS_SAVED', payload: data});
      })
      .catch((error) => console.log('error: ' + error));
  };
};

export const saveMax = (
  liftid: number,
  amount: number,
  userid: number,
  url: string,
) => {
  return (dispatch) => {
    fetch(url + 'save-max.php', {
      method: 'POST',
      body: JSON.stringify({
        id: liftid,
        amount: amount,
        userid: userid,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      // .then((response) => console.log('res: ' + JSON.stringify(response)))
      .then((data) => {
        dispatch({type: 'MAX_SAVED', payload: data, amount: amount});
      })
      .catch((error) => console.log('error: ' + error));
  };
};

export const saveProfile = (
  name: string,
  height: number,
  weight: number,
  userid: number,
  url: string,
) => {
  return (dispatch) => {
    fetch(url + 'save-profile.php', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        height: height,
        weight: weight,
        userid: userid,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      // .then((response) => console.log('res: ' + JSON.stringify(response)))
      .then((data) => {
        dispatch({type: 'PROFILE_SAVED', payload: data});
      })
      .catch((error) => console.log('error: ' + error));
  };
};

export const loginUser = (username: string, password: string, url: string) => {
  return (dispatch) => {
    fetch(url + 'auth-user.php', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      // .then((response) => console.log('res: ' + JSON.stringify(response)))
      .then((data) => {
        dispatch({type: 'LOGIN_SUCCESS', user: data});
      })
      .catch((error) => console.log('error: ' + error));
  };
};
