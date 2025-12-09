import {createFileRoute} from '@tanstack/react-router';
import AppLayout from '@/layouts/AppLayout';
import LandingPage from '@/pages/LandingPage';
import LandingLayout from '@/layouts/LandingLayout';

export const Route = createFileRoute('/_app')({
  component: LandingLayout,
});
