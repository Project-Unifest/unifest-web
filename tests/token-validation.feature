Feature: Token Validation and Redirect

  Scenario Outline: Redirect to sign-in page for invalid token combinations
    Given I am on localhost:3000/home
    And I have an access token with status "<access_token_status>"
    And I have a refresh token with status "<refresh_token_status>"
    Then I should be redirected to "/sign-in"

    Examples:
      | access_token_status | refresh_token_status |
      | invalid_format     | invalid_format      |
      | invalid_format     | empty               |
      | invalid_format     | expired             |
      | empty             | invalid_format      |
      | empty             | empty               |
      | empty             | expired             |
      | expired           | invalid_format      |
      | expired           | empty               |
      | expired           | expired             |

  Scenario: Access token with invalid format
    Given I am on localhost:3000/home
    And I have an access token "invalid.token.format"
    Then I should be redirected to "/sign-in"

  Scenario: Empty access token
    Given I am on localhost:3000/home
    And I have an empty access token
    Then I should be redirected to "/sign-in"

  Scenario: Expired access token
    Given I am on localhost:3000/home
    And I have an expired access token "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsIm1lbWJlcklkIjoxLCJ1c2VybmFtZSI6InZlcmlmaWVkQGVtYWlsLmNvbSIsInJvbGUiOiJST0xFX1ZFUklGSUVEIiwiaWF0IjoxNzQ0NjE1OTIyLCJleHAiOjE3NDQ2MTk1MjJ9.BXsB0UnTLcDYItOQcOQ4dwLsSy1XxjPBl2MlVZbAul0"
    Then I should be redirected to "/sign-in"

  Scenario: Refresh token with invalid format
    Given I am on localhost:3000/home
    And I have a refresh token "invalid.token.format"
    Then I should be redirected to "/sign-in"

  Scenario: Empty refresh token
    Given I am on localhost:3000/home
    And I have an empty refresh token
    Then I should be redirected to "/sign-in"

  Scenario: Expired refresh token
    Given I am on localhost:3000/home
    And I have an expired refresh token "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6InJlZnJlc2giLCJpYXQiOjE3NDQ2MDQyNjUsImV4cCI6MTc0NDY0NzQ2NX0.pQ6CkwXty4bnXHX3utmj0kzjVVNNF8jAN5VuU2cjteA"
    Then I should be redirected to "/sign-in"