import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: '<%= name %>',
  imports: [],
  templateUrl: './<%= name %>.component.html',
  styleUrls: ['./<%= name %>.component.scss']
})
export class <%= classify(name) %>Component {
  // standalone component logic
}