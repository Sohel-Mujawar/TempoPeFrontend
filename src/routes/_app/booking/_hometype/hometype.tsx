import SelectHomeType from '@/components/TempoBooking/Personal/SelectHomeType';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/booking/_hometype/hometype')({
  component: SelectHomeType,
});
