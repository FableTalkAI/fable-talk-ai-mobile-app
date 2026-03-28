import { createNavigationContainerRef, StackActions } from '@react-navigation/native';

import { AllNavigationParamList } from '@/features/navigation/hooks/useNavigationRoutes/types.ts';

export const navigationRef = createNavigationContainerRef<AllNavigationParamList>();

let pendingActions: Array<{ name: any; params: any }> = [];

export function navigate<RouteName extends keyof AllNavigationParamList>(
  name: RouteName,
  params: AllNavigationParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    //@ts-ignore
    navigationRef.dispatch(StackActions.push(name, params));
  } else {
    console.log(`Navigation not ready. Queuing: ${name}`);
    pendingActions.push({ name, params });
  }
}

export function flushPendingNavigation() {
  if (navigationRef.isReady() && pendingActions.length > 0) {
    pendingActions.forEach(({ name, params }) => {
      //@ts-ignore
      navigationRef.dispatch(StackActions.push(name, params));
    });

    pendingActions = [];
  }
}
