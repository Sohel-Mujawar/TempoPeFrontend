import {createFileRoute} from '@tanstack/react-router';
import SafetyPage from '@/pages/SafetyPage';

export const Route = createFileRoute('/_app/_safety/safety')({
  component: SafetyPage,
});
