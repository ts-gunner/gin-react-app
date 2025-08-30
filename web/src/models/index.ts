import { Models } from "@rematch/core"

import { authModel } from "./auth"


export interface RootModel extends Models<RootModel> {

    authModel: typeof authModel,

}


export const models: RootModel = {
    authModel,

}