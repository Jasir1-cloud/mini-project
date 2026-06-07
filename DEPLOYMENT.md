# 🚀 DEPLOYMENT GUIDE - CyberGuard Academy

## TABLE OF CONTENTS
1. [Local Development](#local-development)
2. [Heroku Deployment](#heroku-deployment)
3. [Railway Deployment](#railway-deployment)
4. [DigitalOcean Deployment](#digitalocean-deployment)
5. [AWS EC2 Deployment](#aws-ec2-deployment)
6. [Docker Deployment](#docker-deployment)
7. [Production Checklist](#production-checklist)

---

## LOCAL DEVELOPMENT

### Quick Start
```bash
# Clone/Navigate to project
cd cyberguard-academy

# Install dependencies
npm install

# Start development server
npm start

# Access the app
http://localhost:3000
```

### Development with Auto-Reload
```bash
npm install --save-dev nodemon
npm run dev
```

### Environment Setup
```bash
cp .env.example .env
# Edit .env with your settings
```

---

## HEROKU DEPLOYMENT

### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed

### Step-by-Step

1. **Create Procfile**
```bash
echo "web: node server.js" > Procfile
```

2. **Initialize Git (if needed)**
```bash
git init
git add .
git commit -m "Initial commit"
```

3. **Create Heroku App**
```bash
heroku create cyberguard-academy
```

4. **Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=80
```

5. **Deploy**
```bash
git push heroku main
```

6. **View Logs**
```bash
heroku logs --tail
```

7. **Access App**
```
https://cyberguard-academy.herokuapp.com
```

### Database (SQLite on Heroku)
⚠️ **Note**: SQLite doesn't persist on Heroku (ephemeral filesystem)  
**Solution**: Use PostgreSQL add-on
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

---

## RAILWAY DEPLOYMENT

### Prerequisites
- Railway account (free tier available)
- GitHub account

### Step-by-Step

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect Railway**
- Go to railway.app
- Click "New Project"
- Select "GitHub Repo"
- Authorize and select your repo

3. **Configure**
- Set Node environment: `NODE_ENV=production`
- Set Port: `PORT=80` or auto-detected

4. **Deploy**
- Railway automatically deploys on push

5. **Custom Domain**
- Settings → Domain → Add custom domain

### SQLite with Railway
SQLite works fine with Railway's persistent storage!

---

## DIGITALOCEAN DEPLOYMENT

### Prerequisites
- DigitalOcean account
- Droplet (Ubuntu 20.04+, $5/month)

### Step-by-Step

1. **SSH into Droplet**
```bash
ssh root@your_droplet_ip
```

2. **Update System**
```bash
apt update && apt upgrade -y
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt install -y nodejs
```

4. **Install Git**
```bash
apt install -y git
```

5. **Clone Project**
```bash
cd /home/ubuntu
git clone your-repo-url cyberguard-academy
cd cyberguard-academy
```

6. **Install Dependencies**
```bash
npm install
```

7. **Install PM2 (Process Manager)**
```bash
npm install -g pm2
pm2 start server.js --name "cyberguard"
pm2 startup
pm2 save
```

8. **Setup Nginx (Reverse Proxy)**
```bash
apt install -y nginx
```

Create `/etc/nginx/sites-available/cyberguard`:
```nginx
server {
    listen 80;
    server_name your_domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable it:
```bash
ln -s /etc/nginx/sites-available/cyberguard /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

9. **Setup SSL with Let's Encrypt**
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your_domain.com
```

10. **Allow Firewall**
```bash
ufw allow 22,80,443/tcp
ufw enable
```

---

## AWS EC2 DEPLOYMENT

### Prerequisites
- AWS account
- EC2 instance (Ubuntu 20.04, t2.micro free tier)
- Security group configured (ports 80, 443, 22)

### Step-by-Step

1. **Connect via SSH**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

2. **Update System**
```bash
sudo apt update && sudo apt upgrade -y
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

4. **Setup Application**
```bash
cd /home/ubuntu
git clone your-repo-url cyberguard-academy
cd cyberguard-academy
npm install
```

5. **Install PM2**
```bash
sudo npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

6. **Setup Nginx**
```bash
sudo apt install -y nginx
```

Configure as shown in DigitalOcean section above

7. **Setup SSL**
```bash
sudo certbot --nginx
```

---

## DOCKER DEPLOYMENT

### Create Dockerfile
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Create docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_PATH=/data/quiz.db
    volumes:
      - ./data:/data
    restart: unless-stopped
```

### Build and Run
```bash
# Build image
docker build -t cyberguard-academy .

# Run container
docker run -p 3000:3000 cyberguard-academy

# Or use docker-compose
docker-compose up -d
```

---

## PRODUCTION CHECKLIST

### Security
- [ ] Set `NODE_ENV=production`
- [ ] Generate strong session secrets
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Setup firewall rules
- [ ] Enable rate limiting
- [ ] Use environment variables
- [ ] Validate all inputs
- [ ] Keep dependencies updated

### Performance
- [ ] Enable compression
- [ ] Setup caching headers
- [ ] Use CDN for static assets
- [ ] Monitor database performance
- [ ] Setup auto-scaling
- [ ] Monitor server resources
- [ ] Setup error tracking (Sentry)
- [ ] Configure logging

### Backup & Recovery
- [ ] Setup automated backups
- [ ] Test backup restoration
- [ ] Document recovery procedures
- [ ] Setup redundancy
- [ ] Monitor uptime
- [ ] Setup alerting

### Monitoring
- [ ] Setup error tracking
- [ ] Monitor API performance
- [ ] Track error rates
- [ ] Monitor resource usage
- [ ] Setup dashboards
- [ ] Configure alerts
- [ ] Regular log reviews

### Documentation
- [ ] Document deployment process
- [ ] Create runbook
- [ ] Document API changes
- [ ] Create disaster recovery plan
- [ ] Document configuration
- [ ] Maintain changelog

---

## ENVIRONMENT VARIABLES FOR PRODUCTION

```bash
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# CORS
CORS_ORIGIN=https://yourdomain.com

# Database
DB_PATH=/var/lib/cyberguard/quiz.db

# Security
ENABLE_RATE_LIMIT=true
SESSION_SECRET=your-secret-key-here

# API
API_TIMEOUT=30000

# Logging
LOG_ENABLED=true
LOG_LEVEL=warn
LOG_FILE=/var/log/cyberguard/app.log
```

---

## MONITORING & MAINTENANCE

### Monitor Server Health
```bash
# Check PM2 processes
pm2 monit

# View logs
pm2 logs

# Restart service
pm2 restart cyberguard
```

### Database Maintenance
```bash
# Backup database
cp quiz.db quiz.db.backup.$(date +%Y%m%d)

# Monitor size
du -sh quiz.db

# Cleanup old data
# (Custom script based on retention policy)
```

### Performance Monitoring
```bash
# View server stats
top
free -h
df -h

# Monitor network
netstat -tu
```

---

## SCALING STRATEGIES

### Vertical Scaling
- Increase server CPU/RAM
- Upgrade database server
- Optimize code

### Horizontal Scaling
- Load balancer (Nginx, HAProxy)
- Multiple app instances
- Database replication

### Database Optimization
- Add indexes
- Archive old data
- Use connection pooling

---

## TROUBLESHOOTING DEPLOYMENT

### App Won't Start
```bash
# Check logs
pm2 logs
systemctl status cyberguard

# Verify Node.js
node --version

# Test locally
npm start
```

### Port Already in Use
```bash
# Find process
lsof -i :3000

# Kill it
kill -9 PID
```

### Database Issues
```bash
# Check permissions
ls -la quiz.db

# Verify path
pwd

# Restore from backup
cp quiz.db.backup quiz.db
```

### CORS Errors
- Check `CORS_ORIGIN` in config
- Verify headers in response
- Check browser console

---

## COST COMPARISON

| Platform | Cost | Best For |
|----------|------|----------|
| Heroku | $7/month | Quick deployment |
| Railway | $5/month | Side projects |
| DigitalOcean | $5/month | Full control |
| AWS | Variable | Enterprise |
| Docker | Variable | Containerization |

---

## RECOMMENDED SETUP

**For Learning**:
- Local development with `npm start`

**For Small Project**:
- Railway or DigitalOcean

**For Production**:
- DigitalOcean + Nginx + PM2 + SSL

**For Enterprise**:
- AWS/Azure + Docker + Kubernetes + RDS

---

## BACKUP STRATEGY

### Daily Backups
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp /data/quiz.db /backups/quiz.db.backup.$DATE
# Keep last 30 backups
find /backups -name "quiz.db.backup.*" -mtime +30 -delete
```

### Weekly Archives
```bash
tar -czf quiz.db.backup.weekly.$(date +%Y%m%d).tar.gz quiz.db
```

---

## SUPPORT & HELP

**Deployment Issues**?
1. Check application logs
2. Verify environment variables
3. Test database connection
4. Check firewall rules
5. Review documentation

**Performance Issues**?
1. Monitor server resources
2. Check error logs
3. Analyze API response times
4. Optimize database queries
5. Consider scaling

---

## ADDITIONAL RESOURCES

- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Docker Documentation](https://docs.docker.com/)

---

**Choose your platform and deploy in minutes!** 🚀

Last Updated: January 2024
