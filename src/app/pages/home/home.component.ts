import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {

}
