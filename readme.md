# Todo List Website

A modern and responsive todo list web application built with HTML, CSS, JavaScript, and JSON storage. Features a beautiful soft color scheme, dark/light theme toggle, and comprehensive task management capabilities.

## Features

- ✅ Add new tasks with categories and priorities
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks with confirmation
- ✅ Edit existing tasks in modal popup
- ✅ Filter tasks (All, Active, Completed) with color-coded buttons
- ✅ Search tasks by name or category
- ✅ Sort tasks by date, priority, or due date
- ✅ Drag and drop task reordering
- ✅ Task categories (Personal, Work, Shopping, Health, Study)
- ✅ Priority levels (High, Medium, Low) with visual indicators
- ✅ Due date assignment and tracking
- ✅ Progress tracking with statistics
- ✅ Dark/Light theme toggle with smooth transitions
- ✅ JSON data storage with export/import functionality
- ✅ Responsive design for all devices
- ✅ Soft color scheme and modern UI
- ✅ Pulse animations and hover effects
- ✅ Keyboard shortcuts support

## Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Interactive functionality and data management
- **JSON** - Local data storage using localStorage
- **CSS Variables** - Dynamic theming support
- **Flexbox & Grid** - Responsive layout system

## Installation

1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. No server setup required - runs entirely in the browser!

## Usage

### Basic Task Management

1. **Add Task**: Type in the input field and press Enter or click "Tambah"
2. **Complete Task**: Click the checkbox to mark as complete
3. **Edit Task**: Click the edit (✏️) button to modify task details
4. **Delete Task**: Click the delete (🗑️) button to remove tasks

### Advanced Features

- **Categories**: Assign tasks to Personal, Work, Shopping, Health, or Study
- **Priorities**: Set High (red), Medium (yellow), or Low (green) priority
- **Due Dates**: Set deadlines for your tasks
- **Search**: Use the search box to find specific tasks
- **Filter**: Click "Semua", "Aktif", or "Selesai" to filter tasks
- **Sort**: Use the dropdown to sort by date, priority, or due date
- **Drag & Drop**: Reorder tasks by dragging them
- **Theme Toggle**: Click the theme button to switch between light/dark mode

### Data Management

- **Auto-Save**: All changes are automatically saved to your browser
- **Export**: Click "📥 Export JSON" to download your tasks as a backup file
- **Import**: Click "📤 Import JSON" to restore tasks from a backup file

### Keyboard Shortcuts

- **Enter**: Add a new task when typing in the input field
- **Escape**: Close the edit modal

## File Structure

```
todo-list/
├── index.html          # Main HTML structure
├── styles.css          # Modern CSS with animations and theming
├── script.js           # JavaScript functionality and JSON storage
└── README.md           # Project documentation
```

## Color Scheme

The application features a soft, modern color palette:

### Light Theme

- **Primary**: Purple gradient (#6366f1 → #8b5cf6)
- **Secondary**: Teal (#06d6a0)
- **Background**: Soft white (#fefefe)
- **Cards**: Light gray (#fdfdfd)

### Dark Theme

- **Background**: Dark gray (#1a1a1a)
- **Cards**: Medium gray (#2a2a2a)
- **Text**: Light gray (#e5e5e5)

### Priority Colors

- **High Priority**: Red gradient (#f87171 → #fca5a5)
- **Medium Priority**: Yellow gradient (#fbbf24 → #fde047)
- **Low Priority**: Green gradient (#06d6a0 → #34d399)

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Data Storage

Tasks are stored locally in your browser using localStorage in JSON format. Data persists between sessions and includes:

```json
{
  "id": "unique_identifier",
  "text": "Task description",
  "category": "personal|work|shopping|health|study",
  "priority": "high|medium|low",
  "dueDate": "YYYY-MM-DD",
  "completed": false,
  "createdAt": "ISO_timestamp"
}
```

## Screenshots

### Light Theme

- Modern header with gradient background
- Color-coded filter buttons with pulse animations
- Task cards with priority indicators and categories
- Soft shadows and rounded corners

### Dark Theme

- Elegant dark interface with smooth transitions
- Maintains color coding and visual hierarchy
- Easy on the eyes for low-light usage

## Development

### Key Features Implementation

1. **Theme System**: CSS variables enable dynamic theming
2. **JSON Storage**: localStorage provides persistent data storage
3. **Responsive Design**: Flexbox and Grid ensure mobile compatibility
4. **Animations**: CSS keyframes create smooth interactions
5. **State Management**: JavaScript manages application state and UI updates

### Performance Optimizations

- Efficient DOM manipulation
- Event delegation for dynamic content
- Optimized CSS animations
- Minimal dependencies (vanilla JavaScript)

## Future Enhancements

- [ ] Task templates and recurring tasks
- [ ] Task sharing and collaboration
- [ ] Calendar integration
- [ ] Advanced filtering and search
- [ ] Task analytics and insights
- [ ] Offline support with Service Workers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

---

**Made with ❤️ using modern web technologies**
