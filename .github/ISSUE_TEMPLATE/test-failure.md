---
title: "🚨 Playwright Tests Failed!"
labels: ["automated-test"]
assignees: ["BenPavey"]
---


## 🚨 Playwright Tests Failed!

The scheduled Playwright test run has **failed**.

📌 **Details:**
- **Workflow:** `${{ github.workflow }}`
- **Status:** `${{ job.status }}`
- **Commit SHA:** `${{ github.sha }}`
- **Triggered By:** `${{ github.event_name }}`
- **Duration:** `${{ steps.playwright-tests.outputs.duration }}`

📝 **Summary:**
✅ **Pass:** `${{ steps.playwright-tests.outputs.passed }}`
❌ **Fail:** `${{ steps.playwright-tests.outputs.failed }}`

📎 **Attachments:**
[Download Playwright Test Report](../../actions/artifacts)
