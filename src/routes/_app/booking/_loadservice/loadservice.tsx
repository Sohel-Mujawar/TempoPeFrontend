import SelectLoadService from '@/components/TempoBooking/Personal/SelectLoadService';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/booking/_loadservice/loadservice')({
  component: SelectLoadService,
});
