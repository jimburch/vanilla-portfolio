# Automated Screenshot Workflow

## When to Take Screenshots

- After making visual changes to HTML/CSS
- Before and after implementing new features
- When debugging layout issues
- To document the current state of the application

## Screenshot Commands

```bash
# Full page screenshot
mcp_playwright_browser_take_screenshot --fullPage true

# Viewport screenshot
mcp_playwright_browser_take_screenshot

# Element-specific screenshot
mcp_playwright_browser_take_screenshot --element "element-description" --ref "element-ref"
```

## Workflow Steps

1. Make code changes
2. Navigate to the page (if not already there)
3. Take screenshot automatically
4. Analyze the visual result
5. Make adjustments if needed
6. Repeat until satisfied

## Auto-approval Settings

- Screenshots are auto-approved for localhost/127.0.0.1
- No manual permission required for development workflow
- Screenshots saved to `.playwright-mcp/` directory
