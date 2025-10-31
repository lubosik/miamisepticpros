# DataForSEO MCP Server Setup Guide

## Overview
This guide explains how to set up and use the DataForSEO MCP server for keyword research and SEO data.

## Repository Location
The DataForSEO MCP server is cloned at:
```
/Users/ghost/dataforseo-mcp-server
```

## Credentials
- **Username:** dp@bizzautomate.io
- **API Key:** 61b58f4a530a0f5b

## Configuration
The MCP configuration has been added to `.cursor/mcp-config.json`:
```json
{
  "mcpServers": {
    "dataforseo-mcp": {
      "command": "node",
      "args": ["/Users/ghost/dataforseo-mcp-server/index.js"],
      "env": {
        "DATAFORSEO_USERNAME": "dp@bizzautomate.io",
        "DATAFORSEO_API_KEY": "61b58f4a530a0f5b"
      }
    }
  }
}
```

## API Documentation
The DataForSEO Labs API documentation should be scraped and stored when Firecrawl credits are available:
- URL: https://dataforseo.com/help-center/category/dataforseo-labs-api

## Usage
Once configured, the DataForSEO MCP provides endpoints for:
- Keyword research
- Search volume data
- Keyword difficulty
- PAA (People Also Ask) questions
- Competitive analysis

## Notes
- Firecrawl currently shows insufficient credits for scraping the API docs
- Configuration is ready and will work once Cursor restarts and picks up the new MCP config
- The DataForSEO server must be properly set up at the cloned location

