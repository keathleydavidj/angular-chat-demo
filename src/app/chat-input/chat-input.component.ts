import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';

import { User } from '../models/chat.model';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent {
  @Input() users: User[] = [];
  @Output() sendMessage = new EventEmitter<string>();

  newMessage: string = '';
  showMentionDropdown: boolean = false;
  filteredUsers: User[] = [];
  mentionFilter: string = '';

  onInputChange(event: any) {
    const cursorPosition = event.target.selectionStart;
    const textBeforeCursor = this.newMessage.slice(0, cursorPosition);
    const words = textBeforeCursor.split(' ');
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith('@')) {
      console.log(`last word: ${lastWord}`)
      this.showMentionDropdown = true;
      this.mentionFilter = lastWord.slice(1).toLowerCase();
      this.filterUsers();
    } else {
      this.showMentionDropdown = false;
    }
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.mentionFilter)
    );
  }

  selectMention(userName: string) {
    const cursorPosition = this.newMessage.lastIndexOf('@');
    this.newMessage = `${this.newMessage.slice(0, cursorPosition)}@${userName} `;
    this.showMentionDropdown = false;
  }

  onSendMessage() {
    if (this.newMessage.trim()) {
      this.sendMessage.emit(this.newMessage);
      this.newMessage = '';
      this.showMentionDropdown = false;
    }
  }
}
