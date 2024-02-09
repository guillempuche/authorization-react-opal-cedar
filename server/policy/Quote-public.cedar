// Allow all users access to non-private Quotes.
permit (
  principal,
  action == QuotesApp::Action::"QuoteView",
  resource
)
when { resource.private == false };