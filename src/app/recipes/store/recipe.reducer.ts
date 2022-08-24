import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipe.actions";

export interface State {
    recipes: Recipe[];
    selectedId: number;
}

const initialState: State = {
    recipes: [],
    selectedId: null
}

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions) {
    switch (action.type) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                selectedId: null,
                recipes: [...action.payload]
            }
        default: return state;
    }
}