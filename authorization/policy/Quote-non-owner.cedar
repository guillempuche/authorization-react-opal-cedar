// Deny access to private Quotes from non-owner.
forbid (principal, action, resource)
when { resource.private == true }
unless { principal in resource.creator };