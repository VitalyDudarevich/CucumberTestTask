Feature: GET

  Scenario Outline: GET request
    When I send additional headers <header> to target site
    Then I check if headers <header> is in response body
      Examples:
        | header           |
        | {"Test":"test"}  |
        | {"Test1":"test1"}|
