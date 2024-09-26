import { Component, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

import { User, ChatMessage } from '../models/chat.model';
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [ChatInputComponent, ChatMessageComponent, NgForOf, NgIf],
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
  showToast: boolean = false;
  toastMessage: string = '';

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

    this.checkForMentions(newMessage);
  }

  checkForMentions(message: ChatMessage) {
    const { user, content } = message;

    const mentionRegEx = /@(\w+)/g;
    const mentions = content.match(mentionRegEx);

    if (mentions) {
      mentions.forEach(mention => {
        const userName = mention.slice(1);
        const mentionedUser = this.users.find(user => user.name.toLowerCase() === userName.toLowerCase());

        // Here's where the notification call to the backend would go...
        if (mentionedUser && mentionedUser.userID === this.currentUser.userID) {
          this.showToastNotification(`You were mentioned by ${user.name}`);
        }
      });
    }
  }

  showToastNotification(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 3000);
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
