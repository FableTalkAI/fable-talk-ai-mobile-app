import { createNavigationContainerRef, StackActions } from '@react-navigation/native';

import { AllNavigationParamList } from '@/features/navigation/hooks/useNavigationRoutes/types.ts';

export const navigationRef = createNavigationContainerRef<AllNavigationParamList>();

let pendingActions: Array<{ name: any; params: any; method: 'push' | 'replace' }> = [];

export function navigate<RouteName extends keyof AllNavigationParamList>(
  name: RouteName,
  params: AllNavigationParamList[RouteName],
  method: 'push' | 'replace' = 'push',
) {
  if (navigationRef.isReady()) {
    //@ts-ignore
    navigationRef.dispatch(StackActions[method](name, params));
  } else {
    console.log(`Navigation not ready. Queuing: ${name}`);
    pendingActions.push({ name, params, method });
  }
}

export function flushPendingNavigation() {
  if (navigationRef.isReady() && pendingActions.length > 0) {
    pendingActions.forEach(({ name, params, method }) => {
      //@ts-ignore
      navigationRef.dispatch(StackActions[method](name, params));
    });

    pendingActions = [];
  }
}
