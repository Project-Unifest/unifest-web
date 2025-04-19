### Describe the bug

When attempting to create a pull request using the `mcp_github_create_pull_request` tool, the operation fails with a 403 error despite having what appears to be a valid personal access token configured.

### Affected version

```
docker run -i --rm ghcr.io/github/github-mcp-server ./github-mcp-server --version
```

(Version information to be added after running the command)

### Steps to reproduce the behavior

1. Configure GitHub PAT in ~/.cursor/mcp.json
2. Run a workflow using the GitHub MCP tools
3. Attempt to create a pull request using `mcp_github_create_pull_request`
4. Observe the error response

### Expected vs actual behavior

**Expected behavior:**
The pull request should be created successfully in the specified repository.

**Actual behavior:**
The operation fails with a 403 error:

```
MCP error -32603: failed to create pull request: POST https://api.github.com/repos/Project-Unifest/unifest-web/pulls: 403 Resource not accessible by personal access token
```

### Logs

```json
{
  "error": "MCP error -32603: failed to create pull request: POST https://api.github.com/repos/Project-Unifest/unifest-web/pulls: 403 Resource not accessible by personal access token"
}
```

### Additional information

- Token tested with curl requests to GitHub API and seemed valid
- Multiple tokens were tried (both fine-grained and classic PATs)
- Token has appropriate repo permissions for the repository
- Other GitHub API operations may succeed, but PR creation specifically fails
