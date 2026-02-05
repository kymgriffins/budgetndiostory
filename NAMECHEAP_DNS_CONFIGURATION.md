# Namecheap DNS Configuration Guide for Vercel

This guide explains how to configure your Namecheap domain's DNS settings to connect it to your Vercel deployment.

## Overview

| Field            | Value                                  |
| ---------------- | -------------------------------------- |
| **Type**         | CNAME                                  |
| **Name/Host**    | `www`                                  |
| **Value/Target** | `781ea67122b2a916.vercel-dns-017.com.` |

## Video Tutorial

For a visual walkthrough, watch this step-by-step guide:

[![Namecheap DNS Configuration Tutorial](https://img.youtube.com/vi/Htl6SNvK2F4/0.jpg)](https://youtu.be/Htl6SNvK2F4?si=-CYX0-3yUV4AtHKk) |

## Step-by-Step Configuration

### Step 1: Log in to Namecheap

1. Go to [namecheap.com](https://www.namecheap.com)
2. Click **"Sign In"** in the top-right corner
3. Enter your credentials and log in

### Step 2: Access Domain List

1. From the dashboard, click **"Domain List"** in the left sidebar
2. Find the domain you want to configure
3. Click the **"Manage"** button next to it

### Step 3: Access DNS Settings

1. Scroll down to the **"Domain"** section
2. Click on **"Advanced DNS"** tab
3. You will see the DNS management interface

### Step 4: Add/Update CNAME Record

#### If the `www` record already exists:

1. Find the **"CNAME Record"** with Host `www` in the list
2. Click the **"Edit"** icon (pencil icon) next to it
3. Update the following fields:
   - **Host:** `www`
   - **Value:** `781ea67122b2a916.vercel-dns-017.com.`
   - **TTL:** `Automatic` or `5 minutes` (recommended for faster propagation)

4. Click the **"Save Changes"** (checkmark) button

#### If the `www` record doesn't exist:

1. Scroll down to the **"HOST RECORDS"** section
2. Click **"Add New Record"**
3. Select the following:
   - **Type:** `CNAME Record`
   - **Host:** `www`
     **Value:** `781ea67122b2a916.vercel-dns-017.com.`
   - **TTL:** `Automatic` or `5 minutes` (recommended for faster propagation)

4. Click the **"Save Changes"** (checkmark) button

### Step 5: Verify Configuration

After saving, wait for DNS propagation:

- **Time:** 5-30 minutes typically, up to 48 hours maximum
- **Check propagation:** Use [dnschecker.org](https://dnschecker.org) to verify

### Step 6: Test Your Domain

1. Open a new browser tab
2. Navigate to `https://www.yourdomain.com`
3. Your Vercel site should now load

## Troubleshooting

### Domain Not Resolving

1. **Check CNAME spelling:** Ensure `781ea67122b2a916.vercel-dns-017.com.` is entered exactly
2. **Verify domain is added in Vercel:** Go to Vercel Dashboard → Your Project → Settings → Domains
3. **Wait for propagation:** DNS changes can take up to 48 hours

### SSL Certificate Issues

1. Vercel automatically provisions SSL certificates
2. Wait 10-15 minutes after DNS propagation
3. Try accessing with `https://` prefix

### Common Mistakes to Avoid

| Mistake                    | Solution                                           |
| -------------------------- | -------------------------------------------------- |
| Missing trailing dot (`.`) | Always include the trailing dot in the CNAME value |
| Wrong host value           | Use `www` exactly (without quotes or spaces)       |
| Conflicting A records      | Remove any A records pointing to old IP addresses  |
| TTL set too high           | Use 5 minutes or Auto for faster propagation       |

## Verification Commands

You can verify your DNS configuration using these commands:

### Windows (Command Prompt):

```cmd
nslookup www.yourdomain.com
```

### macOS/Linux (Terminal):

```bash
dig www.yourdomain.com
# or
nslookup www.yourdomain.com
```

### Expected Result:

You should see the CNAME pointing to `781ea67122b2a916.vercel-dns-017.com.`

## Additional Notes

- **Subdomain Only:** This configuration only sets up the `www` subdomain
- **Root Domain:** To also configure `@` (root/apex domain), add an A record pointing to Vercel's IP: `76.76.21.21`
- **Automatic SSL:** Vercel will automatically provision an SSL certificate for your domain
- **Green Lock:** Once SSL is provisioned, you'll see a secure lock icon in the browser

## Support

If you encounter issues:

1. **Vercel Support:** [vercel.com/support](https://vercel.com/support)
2. **Namecheap Support:** [namecheap.com/support](https://namecheap.com/support)
3. **DNS Propagation Checker:** [dnschecker.org](https://dnschecker.org)
