import SigninPage from '@/components/Auth/SigninPage';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/signin')({
  component: SigninPage,
});
