export const login = (currentUser, isAuthenticated) => ({
    type: 'LOGIN',
    currentUser: currentUser,
    isAuthenticated: isAuthenticated
});