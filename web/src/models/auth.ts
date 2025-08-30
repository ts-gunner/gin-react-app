import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
type AuthType = {
    isAuth: boolean
}
const initState: AuthType = {
    isAuth: false,
}
export const authModel = createModel<RootModel>()({
    state: initState,
    reducers: {
        setIsAuth: (state:AuthType, payload:boolean) => {
            return {
                ...state,
                isAuth: payload
            }
        },
 

    },
    effects: (dispatch) => ({
            
    })
})