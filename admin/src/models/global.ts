import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'


type GlobalType = {
    answerType: number 
}

const initState: GlobalType = {
    answerType: 0  // 0: stream模式，支持流式语音。 1： 文本模式，不支持流式语音
}

export const globalModel = createModel<RootModel>()({
    state: initState,
    reducers: {
        setAnswerType: (state:GlobalType, payload:number) => {
            return {
                ...state,
                answerType: payload
            }
        }

    },
    effects: (dispatch) => ({

    })
})