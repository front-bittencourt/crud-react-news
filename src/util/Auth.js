export const token = localStorage.getItem('token');

export const isAuth = () => {
    console.log(token)
    if(token) return true;
    return false;
};