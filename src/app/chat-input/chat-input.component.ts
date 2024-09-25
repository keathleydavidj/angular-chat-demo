import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent {
  @Output() sendMessage = new EventEmitter<string>();
  newMessage: string = '';

  onSendMessage() {
    if (this.newMessage.trim()) {
      this.sendMessage.emit(this.newMessage);
      this.newMessage = '';
    }
  }
}
