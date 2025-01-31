"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type z } from "zod";
import { signupActionSchema } from "@/lib/schemas";
import { authClient } from "../../../auth/client";

export default function SignupPage() {
  const form = useForm<z.infer<typeof signupActionSchema>>({
    resolver: zodResolver(signupActionSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const router = useRouter();

  function onSubmit(values: z.infer<typeof signupActionSchema>) {
    authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: "John Doe",
      },
      {
        onSuccess: () => {
          router.push("/board");
        },
      }
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-1">
          <Image
            src="/logo.svg?height=80&width=80"
            alt="Momento"
            width={80}
            height={80}
            className="mb-4 h-12 w-auto"
          />
          <h2 className="text-center text-2xl font-semibold">
            Sign up for an account
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@mail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be your account&apos;s email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormDescription>
                      Make your password strong!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormDescription>
                      Type it second time, just to be sure
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full">Sign up</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <Separator className="absolute top-1/2 w-full" />
            <span className="relative bg-background px-2 text-xs text-muted-foreground">
              Or continue with
            </span>
          </div>
          <Button type="submit" variant="outline" className="w-full">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M44.5 20H24v8.5h11.8C34 33.4 29.6 36.5 24 36.5c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 8 2.9l6-6C34.5 5.5 29.5 3.5 24 3.5 12.4 3.5 3 12.9 3 24.5S12.4 45.5 24 45.5c10.5 0 21-7.5 21-21 0-1.2-.1-2.3-.3-3.5z"
              />
            </svg>
            Sign in with Google
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-4 text-center text-sm">
        <span className="text-muted-foreground">Already have an account?</span>{" "}
        <Link href="/" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
