import { Models } from "@rematch/core"
import { globalModel } from "./global"

export interface RootModel extends Models<RootModel>{
    globalModel: typeof globalModel,
}


export const models: RootModel = {
    globalModel,

}