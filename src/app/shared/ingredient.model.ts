export class Ingredient {
    constructor(public name: string, public amount: number) {
        
    }
}

export class IngredientRO {
    constructor(public readonly name: string, public readonly amount: number) {
        
    }
}