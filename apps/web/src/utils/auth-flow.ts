import { getMyRunnerProfile } from './runner-profile-api';

export const getPostAuthRedirectPath = async () => {
  const runnerProfile = await getMyRunnerProfile();

  return runnerProfile ? '/dashboard' : '/runner-profile/setup';
};
