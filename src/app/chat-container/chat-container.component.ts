import { Component, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForOf } from '@angular/common';

import { User, ChatMessage } from '../models/chat.model';
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [ChatInputComponent, ChatMessageComponent, NgForOf],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  users: User[] = [
    {userID: 1, name: 'Kevin'},
    {userID: 2, name: 'Jeff'},
    {userID: 3, name: 'Bryan'},
    {userID: 4, name: 'Gabbey'}
  ];

  currentUser: User = this.users[3];

  messages: ChatMessage[] = [
    {id: 1, user: this.users[0], content: 'Hello everyone!', timestamp: new Date()},
    {id: 2, user: this.users[1], content: 'Hi Kevin, how are you?', timestamp: new Date()},
    {id: 3, user: this.users[2], content: 'Hey folks!', timestamp: new Date()}
  ];

  private shouldScrollToBottom = false;

  addMessage(content: string) {
    const newMessage: ChatMessage = {
      id: this.messages.length + 1,
      user: this.currentUser, // Random user
      content: content,
      timestamp: new Date()
    }
    this.messages.push(newMessage);
    this.shouldScrollToBottom = true;
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    try {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
      console.log(`scrolling to new message at ${element.scrollHeight}`)
    } catch (err) {
      console.error('Error scrolling to bottom: ', err);
    }
  }

  onUserChange(userID: string) {
    const index = parseInt(userID);
    if (!isNaN(index) && index >= 0 && index < this.users.length) {
      this.currentUser = this.users[index];
    }
  }
}
