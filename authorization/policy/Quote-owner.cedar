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