import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/guards/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { ColorComponent } from "./components/color/color.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { AddCvComponent } from "./cv/add-cv/add-cv.component";
import { AutocompleteComponent } from "./cv/autocomplete/autocomplete.component";
import { CvComponent } from "./cv/cv/cv.component";
import { DetailsCvComponent } from "./cv/details-cv/details-cv.component";
import { MasterDetailComponent } from "./cv/master-detail/master-detail.component";
import { CvResolver } from "./cv/resolver/Cv.resolver";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { FrontComponent } from "./templates/front/front.component";
import { TodoComponent } from "./todo/todo/todo.component";

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "rh", component: RhComponent },
  {
    path: "cv",
    component: CvComponent, resolve:{
      cv: CvResolver
    }
  },
  {path:"List",
    component:MasterDetailComponent,
    children: [
      {
        path:':id', component:DetailsCvComponent
      }
    ]
  },
  { path: "cv/add", component: AddCvComponent, canActivate: [AuthGuard] },
  { path: "cv/:id", component: DetailsCvComponent },
  {
    path: "",
    component: FrontComponent,
    children: [
      { path: "todo", component: TodoComponent },
      { path: "word", component: MiniWordComponent },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [{ path: "color", component: ColorComponent }],
  },
  {path: "skika", component:AutocompleteComponent},
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
