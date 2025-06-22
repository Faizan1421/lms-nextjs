import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, User, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface featureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: featureProps[] = [
  {
    title: 'Interactive Learning',
    description:
      'Learn through interactive lessons, quizzes, and hands-on projects',
    icon: <BookOpen />,
  },
  {
    title: 'Expert Instructors',
    description: 'Learn from experienced instructors with real-world expertise',
    icon: <User />,
  },
  {
    title: 'Flexible Learning',
    description:
      'Learn at your own pace with flexible scheduling and access to materials',
    icon: <Clock />,
  },
  {
    title: 'Community Support',
    description:
      'Connect with a community of learners and get help from our support team',
    icon: <Users />,
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="outline">The Future of online Education</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="text-muted-foreground max-w-[700px] md:text-xl">
            Discover a new way to learn with our modern, interactive learning
            management system. Access high-quality courses anytime, anywhere
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/courses" className={buttonVariants({ size: 'lg' })}>
              Explore Courses
            </Link>
            <Link
              href="/login"
              className={buttonVariants({ size: 'lg', variant: 'outline' })}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-300"
          >
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
