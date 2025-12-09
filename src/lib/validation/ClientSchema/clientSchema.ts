import {z} from 'zod';

export const clientSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 characters long'),
  secondaryPhoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 characters long')
    .optional(),
  address: z.string().min(3, 'Address must be at least 3 characters long'),
});
