import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('messageInput') messageInput!: ElementRef

  newMessage: string = '';
  showMentionDropdown: boolean = false;
  filteredUsers: User[] = [];
  mentionFilter: string = '';
  selectedIndex: number = -1;

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
      this.selectedIndex = -1;
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
    this.focusInput();
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.showMentionDropdown) return;

    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = this.selectedIndex + 1 < this.filteredUsers.length
          ? this.selectedIndex + 1
          : 0;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = this.selectedIndex > 0
          ? this.selectedIndex - 1
          : this.filteredUsers.length - 1;
        break;
      case 'Tab':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectMention(this.filteredUsers[this.selectedIndex].name);
        }
        break;
      case 'Escape':
        this.showMentionDropdown = false;
        break;
    }
  }

  focusInput() {
    setTimeout(() => {
      this.messageInput.nativeElement.focus();
      this.messageInput.nativeElement.selectionStart = this.messageInput.nativeElement.selectionEnd = this.newMessage.length;
    }, 0);
  }

  onSendMessage() {
    if (this.newMessage.trim()) {
      this.sendMessage.emit(this.newMessage);
      this.newMessage = '';
      this.showMentionDropdown = false;
    }
  }
}
