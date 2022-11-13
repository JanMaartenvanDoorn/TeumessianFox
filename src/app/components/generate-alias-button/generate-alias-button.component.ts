import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-generate-alias-button",
  templateUrl: "./generate-alias-button.component.html",
  styleUrls: ["./generate-alias-button.component.css"],
})
export class GenerateAliasButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() color!: string;
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.btnClick.emit();
  }
}
