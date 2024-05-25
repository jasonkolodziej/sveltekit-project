import { z, object, string, boolean, date } from 'zod';

export const userSchema = z.object({
	firstName: string({ required_error: 'First Name is required' })
		.min(1, { message: 'First Name is required' })
		.trim(),
	lastName: string({ required_error: 'Last Name is required' })
		.min(1, { message: 'Last Name is required' })
		.trim(),
	email: string({ required_error: 'Email is required' }).email({
		message: 'Please enter a valid email address'
	}),
	password: string({ required_error: 'Password is required' })
		.min(1, { message: 'Password must be at least 6 characters' })
		.trim(),
	confirmPassword: string({ required_error: 'Password is required' })
		.min(1, { message: 'Password must be at least 6 characters' })
		.trim(),
	terms: boolean({ required_error: 'You must accept the terms and privacy policy' }),
	role: z
		.enum(['USER', 'PREMIUM', 'ADMIN'], { required_error: 'You must have a role' })
		.default('USER'),
	verified: boolean().default(false),
	token: string().optional(),
	receiveEmail: boolean().default(true),
	createdAt: date().optional(),
	updatedAt: date().optional()
});

export const userUpdatePasswordSchema = userSchema
	.pick({ password: true, confirmPassword: true })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});
