import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ChatMessage } from '../models/chat.model';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent {
  @Input() message!: ChatMessage;
}
