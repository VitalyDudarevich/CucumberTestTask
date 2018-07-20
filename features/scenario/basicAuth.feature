Feature: basicAuth

  Scenario Outline: Only registered users can log in
    Given <expectedUser> is registered with the <expectedPassword>
    When Log in with <user>, <password> credentials
    Then Status code <statusCode> is returned
      Examples:
        |expectedUser     |expectedPassword  |user         |password          |statusCode |
        |CorrectUser      |CorrectPass       |CorrectUser  |CorrectPass       |200        |
        |CorrectUser      |CorrectPass       |CorrectUser  |IncorrectPass     |401        |
        |CorrectUser      |CorrectPass       |IncorrectUser|CorrectPass       |401        |
        |CorrectUser      |CorrectPass       |IncorrectUser|InocrrectPass     |401        |
