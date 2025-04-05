import { Metadata } from "next";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, UserCheck, Lock, InfoIcon, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Policy | Studiac",
  description: "Our privacy policy, terms of service, and refund policy",
};

export default function PolicyPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Policy</h1>
          <p className="text-muted-foreground">
            Our privacy policy, terms of service, and refund policy
          </p>
        </div>

        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="privacy" className="flex items-center gap-2 cursor-pointer">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy Policy</span>
              <span className="sm:hidden">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="terms" className="flex items-center gap-2 cursor-pointer">
              <UserCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Terms of Service</span>
              <span className="sm:hidden">Terms</span>
            </TabsTrigger>
            <TabsTrigger value="refund" className="flex items-center gap-2 cursor-pointer">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Refund Policy</span>
              <span className="sm:hidden">Refunds</span>
            </TabsTrigger>
            <TabsTrigger value="cookie" className="flex items-center gap-2 cursor-pointer">
              <InfoIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Cookie Policy</span>
              <span className="sm:hidden">Cookies</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Privacy Policy
                </CardTitle>
                <CardDescription>
                  Last updated: April 10, 2023
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Introduction</h3>
                <p className="text-muted-foreground">
                  At Studiac, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>

                <h3 className="text-lg font-medium">Information We Collect</h3>
                <p className="text-muted-foreground">
                  We collect personal information when you:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Create an account</li>
                  <li>Purchase a course</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact our support team</li>
                  <li>Participate in surveys or promotions</li>
                </ul>

                <h3 className="text-lg font-medium">How We Use Your Data</h3>
                <p className="text-muted-foreground">
                  We use your data to provide and improve our services, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Processing your course enrollments</li>
                  <li>Providing access to course materials</li>
                  <li>Sending course updates and notifications</li>
                  <li>Responding to your inquiries and support requests</li>
                  <li>Improving our platform and course offerings</li>
                </ul>

                <h3 className="text-lg font-medium">Data Security</h3>
                <p className="text-muted-foreground">
                  We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Terms of Service
                </CardTitle>
                <CardDescription>
                  Last updated: April 10, 2023
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Agreement to Terms</h3>
                <p className="text-muted-foreground">
                  By accessing or using our platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>

                <h3 className="text-lg font-medium">User Account</h3>
                <p className="text-muted-foreground">
                  When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>

                <h3 className="text-lg font-medium">Course Enrollments</h3>
                <p className="text-muted-foreground">
                  When you enroll in a course, you gain access to the course materials for personal, non-commercial use. You may not share your account or course access with others.
                </p>

                <h3 className="text-lg font-medium">Intellectual Property</h3>
                <p className="text-muted-foreground">
                  All content provided on our platform, including but not limited to course materials, videos, text, graphics, logos, and images, is the property of Studiac or its content creators and is protected by copyright and other intellectual property laws.
                </p>

                <h3 className="text-lg font-medium">Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  Studiac shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="refund">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Refund Policy
                </CardTitle>
                <CardDescription>
                  Last updated: April 10, 2023
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Refund Eligibility</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee for most courses. If you are unsatisfied with a course, you can request a refund within 30 days of your purchase.
                </p>

                <h3 className="text-lg font-medium">Refund Process</h3>
                <p className="text-muted-foreground">
                  To request a refund, please contact our support team with your order details. Refunds will be processed within 5-7 business days, and the amount will be credited back to the original payment method.
                </p>

                <h3 className="text-lg font-medium">Refund Exceptions</h3>
                <p className="text-muted-foreground">
                  Refunds are not available for:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Bundle purchases or special promotions</li>
                  <li>Courses where more than 30% of content has been accessed</li>
                  <li>Downloadable resources that have been downloaded</li>
                  <li>Subscription plans after the initial 7-day trial period</li>
                </ul>

                <h3 className="text-lg font-medium">Refund Approval</h3>
                <p className="text-muted-foreground">
                  All refund requests are reviewed by our team. We reserve the right to approve or deny refund requests based on our policies and the circumstances of each case.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cookie">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <InfoIcon className="h-5 w-5 text-primary" />
                  Cookie Policy
                </CardTitle>
                <CardDescription>
                  Last updated: April 10, 2023
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">What Are Cookies</h3>
                <p className="text-muted-foreground">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
                </p>

                <h3 className="text-lg font-medium">How We Use Cookies</h3>
                <p className="text-muted-foreground">
                  We use cookies for several purposes:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Authentication: To remember your login status</li>
                  <li>Preferences: To remember your settings and preferences</li>
                  <li>Analytics: To help us understand how visitors use our site</li>
                  <li>Security: To enhance the security of our website</li>
                </ul>

                <h3 className="text-lg font-medium">Types of Cookies We Use</h3>
                <p className="text-muted-foreground">
                  We use the following types of cookies:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Essential cookies: Necessary for the website to function properly</li>
                  <li>Functional cookies: Used to recognize you when you return to our website</li>
                  <li>Analytical cookies: Allow us to analyze how visitors use our site</li>
                  <li>Marketing cookies: Used to track visitors across websites</li>
                </ul>

                <h3 className="text-lg font-medium">Disabling Cookies</h3>
                <p className="text-muted-foreground">
                  You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that disabling cookies may affect the functionality of this and many other websites you visit.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 