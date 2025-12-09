import {createFileRoute} from '@tanstack/react-router';
import AboutUsPage from '@/pages/AboutUsPage';

export const Route = createFileRoute('/_app/_about/about')({
  component: AboutUsPage,
});
