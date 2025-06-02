# Workflow Wonder Verse

A modern marketplace for workflow automations, built with React, TypeScript, and Supabase.

## Features

- 🎨 Modern, responsive UI with smooth animations
- 🔐 Secure authentication and authorization
- 📱 Mobile-first design
- 🚀 Offline capabilities with service workers
- 🎯 Role-based access control
- 📊 Interactive dashboard
- 🔄 Real-time updates
- 🎭 Dark/Light theme support

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Query
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **UI Components**: Radix UI, Framer Motion
- **Styling**: Tailwind CSS
- **Testing**: Vitest, Testing Library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/workflow-wonder-verse.git
   cd workflow-wonder-verse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── pages/         # Page components
├── styles/        # Global styles and Tailwind config
└── types/         # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
