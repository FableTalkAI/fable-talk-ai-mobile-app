export const getInitialRouteName = (
  isLoggedIn: boolean,
  isOnboardingDone: boolean,
  withDefaultRoute: boolean = true,
) => {
  if (!isLoggedIn) return 'AuthStack';
  if (!isOnboardingDone) return 'Onboarding';
  return withDefaultRoute ? 'TabBarNavigator' : undefined;
};
