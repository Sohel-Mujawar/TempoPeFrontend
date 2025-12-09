import Home from '@/pages/Home';
import {createLazyFileRoute} from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_admin/dashboard')({
  component: Home,
});
