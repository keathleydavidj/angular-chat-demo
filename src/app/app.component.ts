import { Component } from '@angular/core';
import { ChatContainerComponent } from "./chat-container/chat-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatroom';
}
