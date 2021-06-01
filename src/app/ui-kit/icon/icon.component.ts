import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() icon = '';
  @Input() width = 24;
  @Input() height = 24;
  @Input() color = 'white';
  @Input() hoverColor = 'white';

  hovered = false;

  constructor() { }

  ngOnInit(): void {
  }

}
