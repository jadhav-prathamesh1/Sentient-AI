import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: 'Sign In | Sentient AI',
  description: 'Sign in to your Sentient AI account to access personalized learning features.',
};

export default function Login() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Welcome Back
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Sign in to continue your AI-powered learning journey
              </p>
            </div>
            <LoginForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}