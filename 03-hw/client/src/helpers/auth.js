export function auth() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: user.token };
  } else {
    return {};
  }
}
