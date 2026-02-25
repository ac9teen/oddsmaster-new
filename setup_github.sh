#!/bin/bash

set -e

# ─────────────────────────────────────────────
# OddsMaster GitHub Setup Script
# Run with: bash setup_github.sh YOUR_PAT_TOKEN
# ─────────────────────────────────────────────

if [ -z "$1" ]; then
  echo "❌ Usage: bash setup_github.sh YOUR_GITHUB_PAT"
  exit 1
fi

PAT="$1"
REPO_NAME="oddsmaster-new"
PROJECT_DIR="/root/oddsmaster-new"

echo "🔍 Fetching your GitHub username..."
GITHUB_USER=$(curl -s -H "Authorization: token $PAT" https://api.github.com/user | node -e "let d=''; process.stdin.on('data',c=>d+=c); process.stdin.on('end',()=>console.log(JSON.parse(d).login));")

if [ -z "$GITHUB_USER" ]; then
  echo "❌ Could not fetch GitHub username. Check your PAT."
  exit 1
fi

echo "✅ Logged in as: $GITHUB_USER"

# Check if the repo already exists
REPO_EXISTS=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: token $PAT" "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME")

if [ "$REPO_EXISTS" = "200" ]; then
  echo "⚠️  Repo $GITHUB_USER/$REPO_NAME already exists. Using it."
else
  echo "📦 Creating GitHub repo: $GITHUB_USER/$REPO_NAME ..."
  curl -s -X POST \
    -H "Authorization: token $PAT" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/user/repos \
    -d "{\"name\":\"$REPO_NAME\",\"private\":false,\"description\":\"OddsMaster website and blog content\"}" \
    > /dev/null
  echo "✅ Repo created!"
fi

# ─── Update config.yml to point to new repo ───
echo "📝 Updating Decap CMS config to use new repo..."
sed -i "s|repo: .*|repo: $GITHUB_USER/$REPO_NAME|" "$PROJECT_DIR/public/admin/config.yml"
sed -i "s|base_url: .*|base_url: https://oddsmaster.vip|" "$PROJECT_DIR/public/admin/config.yml"
echo "✅ config.yml updated to: $GITHUB_USER/$REPO_NAME"

# ─── Init git and push ────────────────────────
echo "🚀 Initializing git and pushing code..."
cd "$PROJECT_DIR"

git init
git config user.email "admin@oddsmaster.vip"
git config user.name "OddsMaster"

# Create .gitignore if it doesn't have node_modules
if ! grep -q "node_modules" .gitignore 2>/dev/null; then
  echo "node_modules/" >> .gitignore
  echo ".next/" >> .gitignore
  echo ".env" >> .gitignore
  echo ".env.local" >> .gitignore
fi

git add -A
git commit -m "Initial commit: OddsMaster website" 2>/dev/null || echo "(nothing new to commit)"

# Set remote (replace if exists)
git remote remove origin 2>/dev/null || true
git remote add origin "https://$GITHUB_USER:$PAT@github.com/$GITHUB_USER/$REPO_NAME.git"

git branch -M main
git push -u origin main --force

echo ""
echo "✅ Code pushed to: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo "─────────────────────────────────────────────"
echo "📌 NEXT STEP — Connect Vercel to GitHub:"
echo "   1. Go to: https://vercel.com/odds-master/oddsmaster-new/settings/git"
echo "   2. Click 'Connect Git Repository'"
echo "   3. Select: $GITHUB_USER/$REPO_NAME"
echo "   4. From now on, every time Decap CMS publishes a blog post,"
echo "      GitHub triggers a Vercel auto-deploy automatically!"
echo "─────────────────────────────────────────────"
echo ""

# ─── Redeploy with updated config ─────────────
echo "🔄 Deploying updated config to Vercel..."
npx vercel deploy --prod --yes

echo ""
echo "🎉 All done! Go to https://oddsmaster.vip/admin and log in with your GitHub account."
