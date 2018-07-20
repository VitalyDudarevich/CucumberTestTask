Feature: basic-auth

  Scenario Outline:
    Given <userInDB> is registered wiht the <passwordInDB>
    When Log in with <user1>, <password> credentials
    Then Status code <statusCode> is returned
      Examples:
        |userInDB     |passwordInDB  |user1        |password          |statusCode |
        |CorrectUser  |CorrectPass   |CorrectUser  |CorrectPass       |200        |
        |CorrectUser  |CorrectPass   |CorrectUser  |IncorrectPass     |401        |
        |CorrectUser  |CorrectPass   |IncorrectUser|CorrectPass       |401        |
        |CorrectUser  |CorrectPass   |IncorrectUser|InocrrectPass     |401        |
