import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserInfo {
    name: string;
    date_of_birth: string;
    email: string;
    token: string;
}

const setInitialState = (): UserInfo => {

    const user_string: string | null = localStorage.getItem("user")

    if (user_string) {
        // default axios headers
        const user: UserInfo = JSON.parse(user_string);

        axios.defaults.headers.common['Authorization'] = user.token;

        return user
    }

    return {
        name: "",
        date_of_birth: "",
        email: "",
        token: ""
    }
}

const initialState = setInitialState();

const name: string = 'userinfo'

export const userInfoSlice = createSlice({
    initialState,
    name,
    reducers: {
        reset: () => {
            localStorage.removeItem("user");
            const initialState = setInitialState();
            return initialState
        },
        set: (state, data: PayloadAction<UserInfo>) => {
            console.log(state)
            
            localStorage.setItem("user", JSON.stringify(data.payload))
            return { ...data.payload }
        }
    }
})

export const { reset, set } = userInfoSlice.actions

export default userInfoSlice.reducer