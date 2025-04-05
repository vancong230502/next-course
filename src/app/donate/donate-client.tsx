"use client";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Heart, Copy, Check, CreditCard, Smartphone, AlertCircle, Building, Wallet, QrCode, Share, Users, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function DonateClient() {
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedMomo, setCopiedMomo] = useState(false);
  const [copiedBankContent, setCopiedBankContent] = useState(false);
  const [copiedMomoContent, setCopiedMomoContent] = useState(false);
  const [copiedBankName, setCopiedBankName] = useState(false);
  const [copiedMomoName, setCopiedMomoName] = useState(false);

  const copyToClipboard = (text: string, type: 'bank' | 'momo' | 'bankContent' | 'momoContent' | 'bankName' | 'momoName') => {
    navigator.clipboard.writeText(text);
    if (type === 'bank') {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    } else if (type === 'momo') {
      setCopiedMomo(true);
      setTimeout(() => setCopiedMomo(false), 2000);
    } else if (type === 'bankContent') {
      setCopiedBankContent(true);
      setTimeout(() => setCopiedBankContent(false), 2000);
    } else if (type === 'momoContent') {
      setCopiedMomoContent(true);
      setTimeout(() => setCopiedMomoContent(false), 2000);
    } else if (type === 'bankName') {
      setCopiedBankName(true);
      setTimeout(() => setCopiedBankName(false), 2000);
    } else {
      setCopiedMomoName(true);
      setTimeout(() => setCopiedMomoName(false), 2000);
    }
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-10">
        <div className="flex flex-col space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Support Our Mission</h1>
            <p className="text-muted-foreground">
              Your donation helps us create more high-quality educational content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-0">
            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <CreditCard className="h-10 w-10 text-primary" />
                  <h3 className="font-medium">Create New Courses</h3>
                  <p className="text-sm text-muted-foreground">
                    Fund the development of new courses on in-demand topics.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <Smartphone className="h-10 w-10 text-primary" />
                  <h3 className="font-medium">Improve Platform</h3>
                  <p className="text-sm text-muted-foreground">
                    Help us enhance our learning platform with new features.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <AlertCircle className="h-10 w-10 text-primary" />
                  <h3 className="font-medium">Ensure Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Maintain high standards through continuous improvements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/10 rounded-lg px-4 py-8 md:p-8 border shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              <h2 className="text-2xl font-semibold text-center">Payment Methods</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* MBBank */}
              <Card className="border shadow-sm h-full">
                <CardHeader className="pb-4 border-b text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Building className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle>MBBank Transfer</CardTitle>
                  <CardDescription>
                    Military Commercial Joint Stock Bank
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-6">
                    <div className="border border-border rounded-md w-[220px] h-[220px] flex items-center justify-center bg-blue-50/30 dark:bg-blue-950/10">
                      <QrCode className="h-40 w-40 text-blue-600/70" />
                    </div>
                    
                    <div className="w-full space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                        <div className="font-medium text-sm">Account Number:</div>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted py-1 px-3 rounded-sm text-sm">0982675263</code>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 cursor-pointer transition-colors"
                            onClick={() => copyToClipboard("0982675263", 'bank')}
                          >
                            {copiedBank ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                        <div className="font-medium text-sm">Account Name:</div>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted py-1 px-3 rounded-sm text-sm">NGUYEN VAN A</code>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 cursor-pointer transition-colors"
                            onClick={() => copyToClipboard("NGUYEN VAN A", 'bankName')}
                          >
                            {copiedBankName ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                        <div className="font-medium text-sm">Transfer Content:</div>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted py-1 px-3 rounded-sm text-sm">support@example.com</code>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 cursor-pointer transition-colors"
                            onClick={() => copyToClipboard("support@example.com", 'bankContent')}
                          >
                            {copiedBankContent ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 bg-muted/20 text-center gap-2 flex flex-col sm:flex-row items-center justify-center">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Send email to <a href="mailto:support@example.com" className="text-primary hover:underline">support@example.com</a> after donation
                  </span>
                </CardFooter>
              </Card>

              {/* MoMo */}
              <Card className="border shadow-sm h-full">
                <CardHeader className="pb-4 border-b text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Wallet className="h-10 w-10 text-pink-600" />
                  </div>
                  <CardTitle>MoMo Transfer</CardTitle>
                  <CardDescription>
                    MoMo E-wallet
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-6">
                    <div className="border border-border rounded-md w-[220px] h-[220px] flex items-center justify-center bg-pink-50/30 dark:bg-pink-950/10">
                      <QrCode className="h-40 w-40 text-pink-500/90" />
                    </div>
                    
                    <div className="w-full space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                        <div className="font-medium text-sm">Phone Number:</div>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted py-1 px-3 rounded-sm text-sm">0982675263</code>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 cursor-pointer transition-colors"
                            onClick={() => copyToClipboard("0982675263", 'momo')}
                          >
                            {copiedMomo ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                        <div className="font-medium text-sm">Account Name:</div>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted py-1 px-3 rounded-sm text-sm">NGUYEN VAN A</code>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 cursor-pointer transition-colors"
                            onClick={() => copyToClipboard("NGUYEN VAN A", 'momoName')}
                          >
                            {copiedMomoName ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                        <div className="font-medium text-sm">Transfer Content:</div>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted py-1 px-3 rounded-sm text-sm">support@example.com</code>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 cursor-pointer transition-colors"
                            onClick={() => copyToClipboard("support@example.com", 'momoContent')}
                          >
                            {copiedMomoContent ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 bg-muted/20 text-center gap-2 flex flex-col sm:flex-row items-center justify-center">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Send email to <a href="mailto:support@example.com" className="text-primary hover:underline">support@example.com</a> after donation
                  </span>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="mt-2 mb-6">
            <h3 className="text-xl font-semibold text-center mb-6">Other Ways to Support Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Share className="h-10 w-10 text-primary" />
                    <h4 className="font-medium">Share Our Courses</h4>
                    <p className="text-sm text-muted-foreground">
                      Help spread the word about our educational content.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <MessageSquare className="h-10 w-10 text-primary" />
                    <h4 className="font-medium">Provide Feedback</h4>
                    <p className="text-sm text-muted-foreground">
                      Share your thoughts to help us improve our platform.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Users className="h-10 w-10 text-primary" />
                    <h4 className="font-medium">Join As Instructor</h4>
                    <p className="text-sm text-muted-foreground">
                      Contribute your expertise to help others learn.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 