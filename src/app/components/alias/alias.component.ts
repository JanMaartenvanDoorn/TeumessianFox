import { Component, OnInit, Input } from "@angular/core";
import { Clipboard } from "@angular/cdk/clipboard";
import { Alias } from "../../Alias";

@Component({
  selector: "app-alias",
  templateUrl: "./alias.component.html",
  styleUrls: ["./alias.component.css"],
})
export class AliasComponent implements OnInit {
  @Input() alias!: Alias;

  constructor(private clipboard: Clipboard) {}

  ngOnInit(): void {}

  copyAliasToClipboard(): void {
    this.clipboard.copy(this.alias.address);
  }
}
