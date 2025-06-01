# Workflow Wonder Verse

A modern marketplace for AI automation tools built with Next.js, Supabase, and Tailwind CSS.

## Features

- 🔐 Authentication with Supabase Auth
- 🛍️ Marketplace for AI automations
- 👤 User roles (Buyer, Seller, Admin)
- 💰 Secure payment processing
- ⭐ Favorites and reviews system
- 📊 Dashboard for users and sellers
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Testing**: Jest, React Testing Library

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/workflow-wonder-verse.git
cd workflow-wonder-verse
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── integrations/     # Third-party integrations
├── lib/             # Utility functions
└── types/           # TypeScript types
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

- [Supabase](https://supabase.io/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- [React](https://reactjs.org/) for the frontend framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
