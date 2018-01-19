import { NavigationActions } from 'react-navigation';
console.log(NavigationActions.reset);
export default {
  reset: (navigation, routeName) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    navigation.dispatch(resetAction);
  }
};
