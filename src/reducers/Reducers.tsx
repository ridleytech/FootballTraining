import {act} from 'react-test-renderer';

var local: Boolean = false;
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

const checkDone = () => {
  console.log('checkDone');
};

const initialState = {
  selectedNumbers: [],
  games: [],
  phases: [
    {name: 'Winter', order: 1},
    {name: 'Spring', order: 2},
    {name: 'Summer', order: 3},
    {name: 'In-season', order: 4},
    {name: 'Postseason', order: 5},
  ],
  phase: {name: 'Winter', order: 1},
  week: 1,
  day: 1,
  userid: 1,
  currentDay: 'Tuesday',
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
  editedItem: null,
  dataLoaded: false,
  weekError: false,
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

      let completedItem = action.completedItem;

      let completedItems = state.completedExercises.slice();
      completedItems.push(completedItem);

      var currentExercises = state.weekExercises.slice();

      currentExercises.map((ob) => {
        if (completedItem.exercise === ob.exercise) {
          ob.completed = true;
        }
      });

      // var dayExs = currentExercises.filter((ob) => {
      //   return completedItem.day === ob.day;
      // });

      // var completedDayExs = completedItems.filter((ob) => {
      //   return completedItem.day === ob.day;
      // });

      // // console.log('dayExs: ' + JSON.stringify(dayExs));
      // // console.log('completedDayExs: ' + JSON.stringify(completedDayExs));
      // console.log('dayExs len: ' + dayExs.length);
      // console.log('completedDayExs len: ' + completedDayExs.length);

      //checkDone();

      return {
        ...state,
        editedItem: action.completedItem,
        completedExercises: completedItems,
        weekExercises: currentExercises,
      };

    case 'REMOVED_ITEM':
      console.log('REMOVED_ITEM');

      let removedItem = action.removedItem;

      let currentCompletedExercises = state.completedExercises.slice();
      let newCompletedExercises = currentCompletedExercises.filter(
        (ex) => ex.exercise != removedItem.exercise,
      );

      var currentExercises = state.weekExercises.slice();

      currentExercises.map((ob) => {
        if (removedItem.exercise === ob.exercise) {
          ob.completed = false;
        }
      });

      return {
        ...state,
        editedItem: action.removedItem,
        completedExercises: newCompletedExercises,
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
    case 'PROGRESS_SAVED':
      console.log('PROGRESS_SAVED: ' + JSON.stringify(action.payload));

      return {
        ...state,
        currentcurrentDay: action.currentDay,
      };

    case 'WEEK_FETCH':
      //check current copleted array

      var arr = [];
      action.payload.map((obj) => {
        if (obj.header) {
          arr.push(action.payload.indexOf(obj));
        }
      });
      arr.push(0);

      var weekExercises = action.payload;
      var completedExercises = state.completedExercises.slice();

      weekExercises.map((weekOb) => {
        //console.log('weekOb.completed: ' + weekOb.completed);
        completedExercises.map((compOb) => {
          if (weekOb.exercise === compOb.exercise) {
            weekOb.completed = true;
          }
        });

        //console.log('check it');

        var filteredCompleted = completedExercises.filter((ob) => {
          return ob.exercise === weekOb.exercise && ob.day === weekOb.day;
        });

        // console.log(
        //   'add it?: ' + weekOb.exercise + ' ' + filteredCompleted.length,
        // );

        // console.log('filtered: ' + JSON.stringify(filteredCompleted));

        if (filteredCompleted.length === 0 && weekOb.completed === 1) {
          completedExercises.push(weekOb);
        }
      });

      return {
        ...state,
        weekExercises: weekExercises,
        completedExercises: completedExercises,
        weekHeaderIndices: arr,
        weekError: false,
      };

    case 'WEEK_FETCH_ERROR':
      //randall to do
      //check async storage for last values
      //store all lift progress locally

      return {
        ...state,
        weekError: true,
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
