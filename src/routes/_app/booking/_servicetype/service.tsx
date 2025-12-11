import SelectService from '@/components/TempoBooking/Personal/SelectService';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/booking/_servicetype/service')({
  component: SelectService,
});
