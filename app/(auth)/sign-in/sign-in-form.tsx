"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { SignIn } from "@/lib/actions/auth.actions";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("signin", values);

      const { email, password } = values;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredential.user.getIdToken();

      if (!idToken) {
        toast.error("Signin failed");
        return;
      }

      await SignIn({
        email,
        idToken,
      });
      toast.success(`Signin successful`);
      router.push("/");
    } catch (error) {
      console.log(`Failed to submit form: ${error}`);
      toast.error("Failed to submit form");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen space-y-5">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-lg space-y-6">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold text-cyan-700 underline">MPREP</h1>
          <h3 className="text-xl">Login</h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
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
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full cursor-pointer bg-cyan-700" type="submit">
              Login
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?
              <Link href="/sign-up" target="_self" className="text-cyan-700">
                Signup
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
