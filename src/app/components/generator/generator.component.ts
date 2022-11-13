import { Component, OnInit } from "@angular/core";
import { AliasGeneratorService } from "../../services/alias-generator.service";
import { Alias } from "../../Alias";
import { UUID } from "angular2-uuid";

@Component({
  selector: "app-generator",
  templateUrl: "./generator.component.html",
  styleUrls: ["./generator.component.css"],
})
export class GeneratorComponent implements OnInit {
  generated_aliasses: Alias[] = [];
  loaded_aliasses: Alias[] = [];
  postedAlias: Alias = {
    id: UUID.UUID().toString(),
    address: "example-HPyweeTw7Lsg9iNrXO5ypHulAw@example.com",
    generated: "2021-10-24T14:48:00.000Z",
    validated: true,
  };
  nerdMode: Boolean = false;
  constructor(private AliasGeneratorService: AliasGeneratorService) {}

  ngOnInit(): void {
    this.updateAliasses();
  }

  toggleNerdMode(): void {
    this.nerdMode = !this.nerdMode;
    this.updateAliasses();
  }

  updateAliasses(): void {
    if (this.nerdMode) {
      this.AliasGeneratorService.createNewAliassesNerdMode().subscribe(
        (aliasses) => (this.generated_aliasses = aliasses)
      );
    } else {
      this.AliasGeneratorService.createNewAliasses().subscribe(
        (aliasses) => (this.generated_aliasses = aliasses)
      );
    }
  }
}
