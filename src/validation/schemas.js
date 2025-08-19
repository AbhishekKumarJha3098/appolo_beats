import { z } from 'zod'


export const signupSchema = z.object({
name: z.string().min(2, 'Name must be at least 2 characters'),
email: z.string().email('Invalid email address'),
password: z.string().min(6, 'Password must be at least 6 characters'),
confirm: z.string()
}).refine(data => data.password === data.confirm, {
message: 'Passwords do not match',
path: ['confirm']
})


export const loginSchema = z.object({
email: z.string().email('Invalid email address'),
password: z.string().min(6, 'Password must be at least 6 characters'),
})


export const songSchema = z.object({
title: z.string().min(1, 'Title is required'),
singer: z.string().min(1, 'Singer is required'),
year: z.number().int().min(1900).max(new Date().getFullYear()),
genre: z.string().min(1, 'Genre is required'),
audioUrl: z.string().url('Provide a valid audio URL (mp3, wav, etc.)'),
coverUrl: z.string().url('Provide a valid image URL').optional().or(z.literal('')),
})


