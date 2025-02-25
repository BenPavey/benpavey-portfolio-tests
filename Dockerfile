# Use an official Playwright image that includes browsers and dependencies
FROM mcr.microsoft.com/playwright:focal

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your project files (including tests)
COPY . .

# (Optional) Ensure browsers are installed (usually the base image covers this)
RUN npx playwright install --with-deps

# Run Playwright tests with dynamic BASE_URL
CMD ["npx", "playwright", "test", "--reporter=html", "--output=playwright-report"]