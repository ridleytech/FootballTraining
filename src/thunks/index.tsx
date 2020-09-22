export const getTrainingProgress = () => (dispatch, getState) => {
  let url = getState().url + 'getProgress.php';

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      userid: getState().userid,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => dispatch({type: 'PROGRESS_DATA', payload: data}))
    .catch((error) => {
      console.log(error);
    });
};

export const getWeekExercises = (
  phase: string,
  week: number,
  userid: number,
) => (dispatch, getState) => {
  //let phase = getState().phase.order;

  let url =
    getState().url +
    'get-week-exercises.php?phase=' +
    phase +
    '&week=' +
    week +
    '&userid=' +
    userid;

  console.log(url);

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch({type: 'WEEK_FETCH', payload: data});
    })
    .catch((error) => {
      console.log(error);
      dispatch({type: 'WEEK_FETCH_ERROR', payload: error});
    });
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

export const saveProgress = (completed: boolean) => (
  dispatch: any,
  getState: any,
) => {
  //console.log('state: ' + JSON.stringify(getState()));

  //console.log('state: ' + getState().url);

  let url = getState().url;
  let completedExercises = getState().completedExercises;
  let weekExercises = getState().weekExercises;
  let userid = getState().userid;
  let phase = getState().phase.order;
  let week = getState().week;
  let day = getState().day;
  let currentDay = getState().currentDay;

  let editedItem = getState().editedItem;

  //check if the rest of the exercises are done for the day of the selected exercise
  var dayExs = weekExercises.filter((ob) => {
    return editedItem.day === ob.day;
  });

  var completedDayExs = completedExercises.filter((ob) => {
    return editedItem.day === ob.day;
  });

  var completedExercisesStr = completedDayExs
    .map((ex) => {
      return ex.exercise;
    })
    .join(',');

  //console.log('dayExs: ' + JSON.stringify(dayExs));
  // console.log('completedDayExs: ' + JSON.stringify(completedDayExs));
  console.log('dayExs len: ' + dayExs.length);
  console.log('completedDayExs len: ' + completedDayExs.length);

  var dayCompleted = false;
  var weekCompleted = false;

  if (currentDay == 'Monday') {
    day = 1;
  } else if (currentDay == 'Tuesday') {
    day = 2;
  } else if (currentDay == 'Wednesday') {
    day = 3;
  } else if (currentDay == 'Thursday') {
    day = 4;
  } else if (currentDay == 'Friday') {
    day = 5;
  }

  console.log('currentDay: ' + currentDay);

  if (dayExs.length == completedDayExs.length) {
    dayCompleted = true;

    //randall to do
    //update last completed workout on home screen

    console.log('update current day');

    if (currentDay == 'Monday') {
      currentDay = 'Tuesday';
    } else if (currentDay == 'Tuesday') {
      currentDay = 'Thursday';
    } else if (currentDay == 'Thursday') {
      currentDay = 'Friday';
    } else if (currentDay == 'Friday') {
      currentDay = 'Monday';
    }
  }

  if (completedDayExs.length == weekExercises.length) {
    weekCompleted = true;
  }

  console.log('dayCompleted: ' + dayCompleted);
  console.log('weekCompleted: ' + weekCompleted);

  console.log(
    'completed: ' +
      completedExercisesStr +
      ' userid: ' +
      userid +
      ' phase: ' +
      phase +
      ' week: ' +
      week +
      ' day: ' +
      day +
      ' dayCompleted: ' +
      dayCompleted +
      ' weekCompleted: ' +
      weekCompleted,
  );

  //return;

  fetch(url + 'saveProgressItem2.php', {
    method: 'POST',
    body: JSON.stringify({
      userid: userid,
      completedExercises: completedExercisesStr,
      phase: phase,
      week: week,
      day: day,
      dayCompleted: dayCompleted,
      weekCompleted: weekCompleted,
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
      dispatch({
        type: 'PROGRESS_SAVED',
        payload: data,
        dayCompleted: dayCompleted,
        currentDay: currentDay,
      });
    })
    .catch((error) => console.log('error: ' + error));
};
