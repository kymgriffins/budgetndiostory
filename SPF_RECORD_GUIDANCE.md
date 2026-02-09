# SPF Record Configuration Guide

## What is SPF?

SPF (Sender Policy Framework) is an email authentication protocol that helps prevent spammers from sending emails on behalf of your domain. Without an SPF record, spammers can easily spoof emails from your domain, leading to:

- Compromised email security
- Poor email deliverability
- Damaged domain reputation
- Increased risk of phishing attacks

## How to Add SPF Record

### Step 1: Access Your DNS Management

Log in to your domain registrar or DNS hosting provider (e.g., Namecheap, GoDaddy, Cloudflare).

### Step 2: Add TXT Record

Add a TXT record with the following values:

| Field            | Value                                 |
| ---------------- | ------------------------------------- |
| **Name/Host**    | `@` (or leave blank)                  |
| **Type**         | `TXT`                                 |
| **TTL**          | `3600` (or default)                   |
| **Value/Record** | `v=spf1 include:_spf.google.com ~all` |

### Step 3: Verify the Record

After adding the SPF record, verify it using:

```bash
dig TXT budgetndiostory.org
```

Or use an online SPF checker tool.

## Recommended SPF Configuration for Google Workspace

If you're using Google Workspace (G Suite) for email:

```
v=spf1 include:_spf.google.com ~all
```

If you're using multiple email services, you can combine them:

```
v=spf1 include:_spf.google.com include:sendgrid.net ~all
```

## SPF Record Breakdown

| Mechanism                 | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `v=spf1`                  | Version 1 - Required                                     |
| `include:_spf.google.com` | Allows Google servers to send email                      |
| `~all`                    | Soft fail - Accept emails that don't match (recommended) |
| `-all`                    | Hard fail - Reject emails that don't match (strict)      |

## Additional Email Security Measures

### DKIM (DomainKeys Identified Mail)

Add a DKIM record to verify that email content hasn't been tampered with:

1. Generate DKIM keys in your email provider
2. Add the TXT record with your public key

### DMARC (Domain-based Message Authentication)

Add a DMARC policy to specify how to handle suspicious emails:

```
_dmarc TXT record:
v=DMARC1; p=none; rua=mailto:dmarc-reports@budgetndiostory.org
```

## Testing Your Email Configuration

Use these tools to verify your email authentication:

1. **MXToolbox**: https://mxtoolbox.com/spf.aspx
2. **DMARC Analyzer**: https://dmarcAnalyzer.com
3. **Google Admin Toolbox**: https://toolbox.googleapps.com/apps/checkmx/

## Next Steps

1. ✅ Add SPF record (Priority: HIGH)
2. ⬜ Add DKIM record
3. ⬜ Add DMARC record
4. ⬜ Test email deliverability

## References

- [SPF Project](https://www.openspf.org/)
- [Google Workspace SPF Setup](https://support.google.com/a/answer/33786)
- [DMARC Setup Guide](https://dmarc.org/deployment/)
