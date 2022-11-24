import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-coursescards',
  templateUrl: './coursescards.component.html',
  styleUrls: ['./coursescards.component.css']
})
export class CoursescardsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(`coursecards : pathparam: ${params['id']}`);
    });
  }
  navig() {
    this.router.navigate([{outlets: {primary: './kapa', sidemenu: './lamda'}}]);
  }

}
