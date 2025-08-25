import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import clientPromise, { safeDbOperation } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, User, Building, Shield, Clock } from "lucide-react";

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  role: 'parent' | 'teacher' | 'admin';
  organization?: string;
  createdAt: Date;
  active: boolean;
}

async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return null;
  }

  const user = await safeDbOperation(
    async (db) => {
      const users = db.collection('users');
      return await users.findOne({ _id: new ObjectId(decoded.userId) });
    },
    null,
    'Get user data'
  );

  return user;
}

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'teacher': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'parent': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Manage your account and explore AI-powered education tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Role</p>
                  <Badge className={`mt-1 ${getRoleColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
              </div>

              {user.organization && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Building className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Organization</p>
                    <p className="font-semibold">{user.organization}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Created</p>
                  <p className="font-semibold">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge className={user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {user.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Role Type</span>
                  <span className="text-sm font-medium capitalize">{user.role}</span>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    Account ID: {user._id.toString().slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role-specific content */}
        {user.role === 'parent' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Parent Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Welcome to your parent dashboard! Here you can monitor your child's learning progress 
                and interact with their AI learning buddy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Learning Progress</h3>
                  <p className="text-blue-700 text-sm">Track your child's educational journey</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">AI Buddy Reports</h3>
                  <p className="text-green-700 text-sm">View AI-generated progress reports</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Communication</h3>
                  <p className="text-purple-700 text-sm">Connect with teachers and support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {user.role === 'teacher' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Teacher Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Welcome to your teacher dashboard! Manage your classroom and leverage AI tools 
                to enhance student learning outcomes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h3 className="font-semibold text-indigo-900 mb-2">Classroom Management</h3>
                  <p className="text-indigo-700 text-sm">Manage students and assignments</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h3 className="font-semibold text-pink-900 mb-2">AI Tools</h3>
                  <p className="text-pink-700 text-sm">Access AI-powered teaching resources</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">Analytics</h3>
                  <p className="text-yellow-700 text-sm">View student performance insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {user.role === 'admin' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Welcome to your admin dashboard! Oversee the entire platform and manage 
                users, schools, and system settings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">User Management</h3>
                  <p className="text-red-700 text-sm">Manage all platform users</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">School Management</h3>
                  <p className="text-blue-700 text-sm">Oversee school registrations</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">System Analytics</h3>
                  <p className="text-green-700 text-sm">Monitor platform performance</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibant text-purple-900 mb-2">Settings</h3>
                  <p className="text-purple-700 text-sm">Configure system parameters</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
