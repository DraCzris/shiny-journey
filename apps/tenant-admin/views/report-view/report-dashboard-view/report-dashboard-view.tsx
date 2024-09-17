import {
  AIAssistant,
  ReportFilterProvider,
  ReportSummary,
  SubsectionsTabs,
} from '../components'

export const ReportDashboardView = () => (
  <ReportFilterProvider>
    <div className="pr-96 relative">
      <div className="max-w-7xl m-auto pr-0 lg:pr-8">
        <ReportSummary />

        {/* Highlight top one */}
        {/* 
          - Merge Event type
            - 
        */}
        {/* <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
        Recommended actions
      </h2>
      <div className="relative ring-2 ring-blue-600 rounded-lg overflow-hidden mb-10">
        <InterventionItem
          highlighted
          component="div"
          intervention={{
            action: {
              assign_from: 'Jiri Dubansky',
              assign_to: 'Patrik Safar',
              type: 'reroute',
            },
            analysis_type: 'reroute' as never,
            context: {
              description: `A user goes through the checkout process without any apparent issues until after the payment step. After adding items to their cart and using a debit card for payment, the payment is successfully processed and debited from the account. However, instead of showing an order confirmation, the system indicates that the payment is still pending.\n\nDuring this issue, users are charged and receive a confirmation from the payment gateway, yet the website itself fails to update the order status, leading to confusion. This discrepancy between the payment gateway and our system can lead to multiple user inquiries and lost trust.\n\nExpected behavior involves the system properly acknowledging the successful payment by displaying an order confirmation page inclusive of order details and thank you message.\n\nTesting scenarios revealed that this problem occurs on both desktop and mobile platforms, specifically noted on Chrome and Safari browsers. The incident rate appears particularly high among users on iOS 14 and Windows 11.\n\nExample details:\n- User's email: example_user@domain.com\n- Shopping cart items: 1x Jacket, 3x Socks, 2x Caps\n- Payment Method utilized: Debit Card`,
              id: 'TJ-31',
              link: 'https://patrik-safar.atlassian.net/browse/TJ-31',
              title: 'Reroute ticket #32 to another agent',
            },
            issue_id: '31',
            reasoning:
              'The group of issues are duplicated because they all describe the same problem: users are not receiving password reset emails despite multiple attempts. The issues occur across different devices (desktop, laptop, smartphone) and affect different users, but the core problem and its symptoms are identical. The possible root causes mentioned are also similar, focusing on the email delivery system or connectivity issues.',
            render_options: {},
          }}
        />
      </div> */}

        {/* Display list of actions or list of issues */}
        <SubsectionsTabs />
      </div>

      {/* AI chat */}
      <AIAssistant />
    </div>
  </ReportFilterProvider>
)
