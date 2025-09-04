import { redirect } from 'next/navigation';

export default function HomePage() {
  // TODO: Add authentication check here
  redirect('/signup');
}
