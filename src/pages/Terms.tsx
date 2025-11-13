import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertTriangle, Scale, Shield } from 'lucide-react';

const Terms = () => {
  return (
    <Layout>
      <SEOHead 
        title="Terms of Service"
        description="MCKI Terms of Service - Read our terms and conditions for using our cryptocurrency arbitrage intelligence platform."
        keywords={["terms of service", "terms and conditions", "user agreement", "crypto platform", "legal"]}
        noIndex={false}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-muted-foreground">
                Last updated: January 1, 2024 | Website: mcki.site
              </p>
        </div>

        <div className="space-y-8">
          <Card className="border-warning">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-5 w-5" />
                Important Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Please read these Terms of Service carefully before using the MCKI platform. By accessing or using our service, you agree to be bound by these terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>By accessing and using MCKI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
              
              <p>These Terms of Service ("Terms") govern your use of our cryptocurrency arbitrage intelligence platform operated by MCKI Platform ("us", "we", or "our").</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>MCKI provides cryptocurrency arbitrage intelligence tools and market analysis. Our services include:</p>
              <ul>
                <li>Real-time cryptocurrency price monitoring across multiple exchanges</li>
                <li>Arbitrage opportunity identification and alerts</li>
                <li>Market analysis and trading insights</li>
                <li>Portfolio tracking and management tools</li>
                <li>Educational content and resources</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                3. User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>As a user of MCKI, you agree to:</p>
              <ul>
                <li>Provide accurate and complete information when creating your account</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service in compliance with all applicable laws and regulations</li>
                <li>Not engage in any activity that could harm or disrupt the service</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
                <li>Respect the intellectual property rights of MCKI and third parties</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Financial Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p><strong>Important:</strong> MCKI provides information and tools for educational and informational purposes only. We do not provide financial, investment, or trading advice.</p>
              
              <ul>
                <li>All trading involves risk, including the potential loss of principal</li>
                <li>Past performance does not guarantee future results</li>
                <li>Cryptocurrency markets are highly volatile and unpredictable</li>
                <li>You should consult with qualified financial advisors before making investment decisions</li>
                <li>MCKI is not responsible for any financial losses incurred through the use of our platform</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Data and Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
              
              <p>By using our service, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>The MCKI platform and its original content, features, and functionality are owned by MCKI Platform and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
              
              <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our content without prior written consent.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We strive to provide continuous service availability, but we cannot guarantee uninterrupted access. The service may be temporarily unavailable due to:</p>
              <ul>
                <li>Scheduled maintenance</li>
                <li>Technical difficulties</li>
                <li>Network or equipment failures</li>
                <li>Force majeure events</li>
              </ul>
              
              <p>We reserve the right to modify, suspend, or discontinue the service at any time without notice.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>To the maximum extent permitted by applicable law, MCKI Platform shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:</p>
              <ul>
                <li>Loss of profits or revenue</li>
                <li>Loss of data or information</li>
                <li>Business interruption</li>
                <li>Trading losses</li>
              </ul>
              
              <p>Our total liability shall not exceed the amount paid by you for the service in the 12 months preceding the claim.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Indemnification</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>You agree to indemnify, defend, and hold harmless MCKI Platform and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of or related to your use of the service or violation of these Terms.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.</p>
              
              <p>Upon termination, your right to use the service will cease immediately, but these Terms will remain in effect to the extent necessary to resolve any disputes.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which MCKI Platform is incorporated, without regard to conflict of law principles.</p>
              
              <p>Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date.</p>
              
              <p>Your continued use of the service after any such changes constitutes your acceptance of the new Terms.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                13. Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p>If you have any questions about these Terms of Service, please contact us:</p>
              <ul>
                <li>Email: <a href="mailto:legal@mcki.site">legal@mcki.site</a></li>
                <li>Address: MCKI Platform, Legal Department</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;