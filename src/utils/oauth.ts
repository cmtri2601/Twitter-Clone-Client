/**
 * Get link includes params to access google api
 * @returns url
 */
const getOathGoogleUrl = () => {
  const { VITE_AUTH_URI, VITE_CLIENT_ID, VITE_REDIRECT_URIS } = import.meta.env;
  const params = {
    client_id: VITE_CLIENT_ID,
    redirect_uri: VITE_REDIRECT_URIS,
    response_type: 'code', // for server-side web app - for js app set'token' => get hash value
    state: 'prevent-csrf', // this state is for prevent csrf
    access_type: 'offline', // get refresh token
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  };
  const query = new URLSearchParams(params);
  return `${VITE_AUTH_URI}?${query}`;
};

const oathGoogleUrl = getOathGoogleUrl();
export { oathGoogleUrl };
