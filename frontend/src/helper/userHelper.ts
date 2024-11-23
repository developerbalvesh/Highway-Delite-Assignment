interface UserLogin {
    name: string;
    date_of_birth: string;
    email: string;
}

export const setUserLogin = (user: UserLogin) => {
    localStorage.setItem("user", JSON.stringify(user));
}

export const getUserLogin = () => {
    const user_string: string | null = localStorage.getItem("user");
    if (!user_string) {
        return null
    }
    const user: UserLogin = JSON.parse(user_string);
    return user
}