# Cloudflare Pages Deployment Guide

## Deployment Status
✅ Build successful (dist folder generated)
✅ Cloudflare configuration files created
✅ Changes committed and pushed to GitHub
✅ GitHub Actions workflow configured for automatic deployment

## Automatic Deployment Setup

### Step 1: Get Cloudflare Credentials

1. **Get Cloudflare Account ID**:
   - Login to https://dash.cloudflare.com/
   - Click on "Workers & Pages" in the sidebar
   - Your Account ID is displayed in the right sidebar

2. **Create Cloudflare API Token**:
   - Go to https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use "Edit Cloudflare Workers" template or create custom token with:
     - Permissions: `Account - Cloudflare Pages - Edit`
   - Click "Continue to summary" → "Create Token"
   - **Copy the token immediately** (you won't see it again)

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository: https://github.com/renbran/eiger-marvel-hr-plat
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these two secrets:

   **Secret 1:**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: [Paste the API token from Step 1]

   **Secret 2:**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: [Paste your Account ID from Step 1]

4. Click **Add secret** for each

### Step 3: Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. If prompted, click **"I understand my workflows, go ahead and enable them"**

### Step 4: Trigger First Deployment

Option A: Push any change to main branch
```bash
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

Option B: Re-run the workflow manually
1. Go to **Actions** tab
2. Click on "Deploy to Cloudflare Pages" workflow
3. Click "Run workflow"

### ✅ That's It!

Now every push to `main` branch will automatically:
1. Build your application
2. Deploy to Cloudflare Pages
3. Update your live site at `https://eiger-marvel-hr-plat.pages.dev`

Preview deployments are created automatically for all pull requests!

---

## Deploy to Cloudflare Pages

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Login to Cloudflare**
   - Go to https://dash.cloudflare.com/
   - Sign in or create an account

2. **Create New Pages Project**
   - Click on "Workers & Pages" in the sidebar
   - Click "Create application"
   - Select "Pages" tab
   - Click "Connect to Git"

3. **Connect GitHub Repository**
   - Select "GitHub" as provider
   - Authorize Cloudflare to access your GitHub
   - Select repository: `renbran/eiger-marvel-hr-plat`
   - Click "Begin setup"

4. **Configure Build Settings**
   ```
   Project name: eiger-marvel-hr-plat
   Production branch: main
   
   Build settings:
   - Framework preset: Vite
   - Build command: npm run build
   - Build output directory: dist
   - Node version: 18 (or latest)
   ```

5. **Environment Variables (if needed)**
   - Add any environment variables your app needs
   - Click "Save and Deploy"

6. **Deploy**
   - Click "Save and Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your site will be live at: `https://eiger-marvel-hr-plat.pages.dev`

### Option 2: Deploy via Wrangler CLI

1. **Install Wrangler** (if not already installed):
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Deploy**:
   ```bash
   wrangler pages deploy dist
   ```

4. **Follow prompts**:
   - Project name: eiger-marvel-hr-plat
   - Production branch: main

## Post-Deployment

### Custom Domain Setup (Optional)
1. Go to your Pages project in Cloudflare dashboard
2. Click "Custom domains"
3. Click "Set up a custom domain"
4. Enter your domain and follow DNS configuration steps

### Automatic Deployments
✅ Already configured! Every push to `main` branch will automatically trigger a new deployment.

### Preview Deployments
- Every pull request will create a preview deployment
- Preview URL format: `https://<commit-hash>.eiger-marvel-hr-plat.pages.dev`

## Features Included in Production

✅ All routes and pages
✅ Premium upgrade system
✅ Job matching functionality
✅ Candidate dashboard
✅ Profile builder
✅ All UI components
✅ Responsive design
✅ SPA routing (handled by _redirects file)

## Build Output Summary
- Total bundle size: ~553 KB (gzipped: ~167 KB)
- CSS size: ~433 KB (gzipped: ~75 KB)
- All assets optimized for production

## Verification Checklist
After deployment, verify:
- [ ] Homepage loads correctly
- [ ] Navigation works (all routes accessible)
- [ ] Jobs page displays correctly
- [ ] Premium upgrade page functions
- [ ] Candidate dashboard accessible
- [ ] Forms submit properly
- [ ] Mobile responsive design works
- [ ] All images load correctly

## Rollback (if needed)
1. Go to Cloudflare Pages dashboard
2. Click "Deployments"
3. Find the previous working deployment
4. Click "..." menu
5. Select "Rollback to this deployment"

## Support
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- Troubleshooting: Check deployment logs in Cloudflare dashboard

---

**Next Steps**: 
1. Deploy using Option 1 or 2 above
2. Test your production site
3. Set up custom domain (optional)
4. Monitor deployment logs for any issues
