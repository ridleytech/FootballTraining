import {act} from 'react-test-renderer';

var local: Boolean = true;
var localPath = 'http://localhost:8888/ridtech/52week/dev/';
var remotePath = 'http://agiledevelopment.xyz/52week/dev/';
remotePath = 'http://ridleytechnologies.com/52week/dev/';

var url;

if (local) {
  url = localPath;
} else {
  url = remotePath;
}

console.log('url: ' + url);

const initialState = {
  selectedNumbers: [],
  games: [],
  phases: [
    'Winter',
    'Spring',
    'Summer',
    'Preseason',
    'In-season',
    'Postseason',
  ],
  phase: 'Winter',
  week: 1,
  day: 1,
  userid: 1,
  lastCompletedDay: 'Monday',
  avgWorkoutTime: '90 minutes',
  completedExercises: [],
  weekExercises: [],
  maxList: [],
  weekHeaderIndices: [],
  selectedGame: null,
  updatedGame: null,
  selectedMax: null,
  name: '',
  height: '',
  weight: '',
  url: url,
  user: null,
  backScreen: 'ViewWeek',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        user: action.user,
      };

    case 'LOGOUT_USER':
      console.log('logout redux');
      return {
        ...state,
        user: null,
      };

    case 'MAX_SELECTED':
      return {
        ...state,
        selectedMax: action.selectedMax,
      };

    case 'PHASE_SELECTED':
      return {
        ...state,
        phase: action.selectedPhase,
      };

    case 'MAX_SAVED':
      //console.log('MAX_SAVED: ' + JSON.stringify(action.payload));

      let currentMaxList = state.maxList.slice();
      let currentMax = state.selectedMax;

      currentMaxList.map((ob) => {
        if (ob.id === currentMax.id) {
          ob.amount = action.amount;
        }
      });

      return {
        ...state,
        maxList: currentMaxList,
      };

    case 'PROFILE_SAVED':
      return {
        ...state,
        name: action.payload.name,
        height: action.payload.height,
        weight: action.payload.weight,
      };

    case 'COMPLETED_ITEM':
      console.log('COMPLETED_ITEM');
      let completedItems = state.completedExercises.slice();
      completedItems.push(action.completedItem);

      let currentExercises = state.weekExercises.slice();

      currentExercises.map((ob) => {
        if (action.completedItem.exercise === ob.exercise) {
          ob.completed = true;
        }
      });

      return {
        ...state,
        completedExercises: completedItems,
        weekExercises: currentExercises,
      };

    case 'INITIAL_FETCH':
      return {
        ...state,
        people: action.payload,
      };

    case 'CLEAR_FIELD':
      return {
        ...state,
      };

    case 'WEEK_PROGRESS_SAVED':
      console.log('WEEK_PROGRESS_SAVED');
      return {
        ...state,
        completedExercises: null,
      };

    case 'WEEK_FETCH':
      var arr = [];
      action.payload.map((obj) => {
        if (obj.header) {
          arr.push(action.payload.indexOf(obj));
        }
      });
      arr.push(0);

      return {
        ...state,
        weekExercises: action.payload,
        weekHeaderIndices: arr,
      };

    case 'MAXES_FETCH':
      return {
        ...state,
        maxList: action.payload,
      };

    default:
      return state;
  }
};
