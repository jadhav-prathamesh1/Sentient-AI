import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = {
  title: 'Create Account | Sentient AI',
  description: 'Create your Sentient AI account to start transforming education with AI-powered learning.',
};

export default function Register() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Join Sentient AI
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Create your account to start revolutionizing education with AI
              </p>
            </div>
            <RegisterForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}