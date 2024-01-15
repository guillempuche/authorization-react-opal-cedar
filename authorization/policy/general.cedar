// Deny access to private Quotes from non-owner.
forbid (principal, action, resource)
when { resource.private == true }
unless { principal in resource.creator };

// Allow resource.owner full access to Quotes he owns.
permit (
  principal,
  action in
    [QuotesApp::Action::"QuoteView",
     QuotesApp::Action::"QuoteCreate",
     QuotesApp::Action::"QuoteUpdate",
     QuotesApp::Action::"QuoteDelete",
     QuotesApp::Action::"Test"],
  resource
)
when { principal in resource.creator };

// Allow all users access to non-private Quotes.
permit (
  principal,
  action == QuotesApp::Action::"QuoteView",
  resource
)
when { resource.private == false };