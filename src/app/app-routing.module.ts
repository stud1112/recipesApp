import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";


const appRoutes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'shoplist', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    // {
    //   path: 'recipes/:id', component: RecipeItemComponent, /* children: [
    //     { path: ':id/:name', component: UserComponent},
    // ] */},
    // {
    //   path: 'recipes',
    //   component: RecipesComponent,
    //   canActivate: [AuthGuard],
    //   resolve: [RecipesResolverService],
    //   children: [
    //     { path: '', component: RecipeStartComponent },
    //     { path: 'new', component: RecipeEditComponent },
    //     {
    //       path: ':id',
    //       component: RecipeDetailComponent,
    //       resolve: [RecipesResolverService],
    //     },
    //     {
    //       path: ':id/edit',
    //       component: RecipeEditComponent,
    //       resolve: [RecipesResolverService],
    //     },
    //   ],
    // },
  //   {
  //     path: 'shoplist',
  //     // canActivate: [AuthGuard],
  //     // canActivateChild: [AuthGuard],
  //     component: ShoppingListComponent,
  //     // children: [
  //     //   { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
  //     //   { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]},
  //     // ]
  // }, 
  // { path: 'auth', component: AuthComponent},
  {
    path: 'not-found', component: PageNotFoundComponent
  },
  //   // {
  //   //   path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}
  //   // },    
    // {
    //   path: '**', redirectTo: '/not-found'
    // }
];
  
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {'preloadingStrategy': PreloadAllModules})
        // RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}