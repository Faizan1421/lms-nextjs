import { z } from 'zod';

export const courseStatus = ['Draft', 'Published', 'Archived'] as const;
export const courseLevels = ['Beginner', 'Intermediate', 'Advanced'] as const;
export const courseCategories = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Data Science',
  'Machine Learning',
  'Artificial Intelligence',
  'Cybersecurity',
  'Music',
  'Photography',
  'Video Editing',
  'Graphic Design',
  '3D Modeling',
  'Animation',
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(100, { message: 'Title must be less than 100 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' })
    .max(3000, { message: 'Description must be less than 3000 characters' }),
  fileKey: z.string().min(1, { message: 'File key is required' }),
  price: z.coerce.number().min(1, { message: 'Price must be positive number' }),
  duration: z.coerce
    .number()
    .min(1, { message: 'Duration must be positive number' }),
  level: z.enum(courseLevels, {
    message: 'Level is required',
  }),
  category: z.enum(courseCategories, {
    message: 'Category is required',
  }),
  smallDescription: z
    .string()
    .min(10, { message: 'Small description must be at least 10 characters' })
    .max(200, {
      message: 'Small description must be less than 200 characters',
    }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters' }),
  status: z.enum(courseStatus, {
    message: 'Status is required',
  }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
