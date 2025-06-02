import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Code, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex-1">
        <div className="container flex flex-col items-center gap-4 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="flex max-w-[980px] flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              Master Workflow Automation
              <br />
              with Workflow Wonder
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Learn to automate your workflows, boost productivity, and transform your business with our comprehensive learning platform.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/register">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/browse">
              <Button variant="outline" size="lg">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to master workflow automation and boost your productivity.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10" />
              <CardTitle>Comprehensive Courses</CardTitle>
              <CardDescription>
                Learn from industry experts with our structured learning paths.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Code className="h-10 w-10" />
              <CardTitle>Hands-on Projects</CardTitle>
              <CardDescription>
                Apply your knowledge with real-world automation projects.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-10 w-10" />
              <CardTitle>Community Support</CardTitle>
              <CardDescription>
                Join a community of learners and get help when you need it.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
            Ready to Get Started?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Join thousands of learners who have transformed their workflows with our platform.
          </p>
          <Link href="/auth/register">
            <Button size="lg">
              Start Learning Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 