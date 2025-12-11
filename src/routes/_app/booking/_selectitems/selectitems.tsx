import SelectItems from '@/components/TempoBooking/Personal/SelectItems';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/booking/_selectitems/selectitems')({
  component: SelectItems,
});
