# Angular Chat Application with Advanced User Tagging

## Project Overview

This project is a modern, responsive chat application built with Angular 18. It demonstrates proficiency in front-end development, particularly in creating interactive user interfaces and implementing complex features like real-time user tagging.

## Key Features

### 1. Real-time Chat Interface
- Clean, intuitive UI for sending and receiving messages
- Scrollable message history
- Responsive design for various screen sizes

### 2. User Management
- Ability to switch between different user accounts
- Visual representation of the current user

### 3. Advanced User Tagging System
- **Trigger**: Type '@' to activate the tagging system
- **Real-time Filtering**: As you type, the user list filters to match input
- **Keyboard Navigation**: 
  - Use arrow keys to move through the user list
  - Press Tab to select a user
  - Press Escape to close the dropdown without selecting
- **Smart Cursor Management**: After selecting a user, the cursor automatically returns to the end of the input, ready for more typing
- **Visual Feedback**: Clear highlighting of the currently selected user in the dropdown

### 4. Toast Notifications
- Simulated notification system when a user is mentioned

## Technical Highlights

1. **Angular 18**: Utilizes the latest features of Angular for efficient, component-based architecture
2. **TypeScript**: Fully typed for improved code quality and maintainability
4. **CSS Flexbox**: Implements modern layout techniques for responsive design
5. **Event Handling**: Complex keyboard event management for enhanced user experience
6. **Component Communication**: Demonstrates effective use of @Input(), @Output(), and EventEmitter
7. **ViewChild**: Uses ViewChild for direct access to DOM elements

## Code Structure

- `ChatContainerComponent`: Main component managing the overall chat interface
- `ChatInputComponent`: Handles message input and user tagging functionality
- `ChatMessageComponent`: Renders individual chat messages

## Future Enhancements

- Integration with a backend service for persistent data storage for notifications etc.
- Real-time updates using WebSockets
- User authentication and authorization

## Running the Project

1. Ensure you have Node.js and Angular CLI installed
2. Clone the repository
3. Run `npm install` to install dependencies
4. Run `ng serve` to start the development server
5. Navigate to `http://localhost:4200/` in your browser
