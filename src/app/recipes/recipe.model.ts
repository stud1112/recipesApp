import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {}
}

export class RecipeRO {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly imagePath: string,
    public readonly ingredients: Ingredient[]
  ) {}
}
