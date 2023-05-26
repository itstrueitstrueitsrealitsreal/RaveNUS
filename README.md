# RaveNUS

## Motivation
A wise man once said: “A hungry man is not a free man.” With the plethora of choices of food options we have at NUS, adding on the potential burden of counting calories or maintaining a balanced diet, students and staff are overwhelmed by options. 

Oftentimes, I find myself at a loss when it comes to making this deceptively simple decision. I spend all my downtime deciding which stall to patronise, and before I know it, I only have 20 minutes left before my next lesson, and I end up settling for the stall with the shortest queue, which probably has mediocre food, and quickly wolf it down before my next lesson starts.

We recognise this dilemma that people in NUS face daily, and we feel that it necessitates a comprehensive solution that allows people to ease them into the making of this decision, instead of facing analysis paralysis whenever they are faced with the monumental task of deciding what to eat.

Enter RaveNoUS. Our solution allows users to delegate all the decision making to a handly little app, all in the convenience of your pocket.

Through this, we aim to allow users to socialise with their other users while solving this problem, allowing users to bond over sharing one of the key markers of cultural identity - food.

## Aim
Our web app will aim to provide meal recommendations to users based on a few factors. The first would be dietary preferences indicated by the user upon first launch of the web app which can be changed later. An example of such would be a user requiring Halal food. The location of which the user is currently at will also determine the food recommendations as it would not be logical for a user to travel halfway across the campus for a meal. Food stalls in canteens that are nearer to the user will be prioritised in recommendations. 

Furthermore, a social aspect will be integrated into the web app. Users will be able to give ratings and reviews on the food that they eat. These ratings will be displayed together with the food recommendations for users to read, further aiding them in their decision and will be taken into account for future recommendations for themselves and others. If users choose to, they can also share their reviews straight to social media for all their followers to see. Additionally, there will be a leaderboard aspect of the web app where users who give more reviews and ratings will be ranked higher. This will give something for users to work for.

Moreover, statistics will be tracked. Firstly, users will be allowed to indicate a desired maximum daily consumption. This will be incorporated into the food recommendations, foods that will exceed the user’s calorie cap will have a smaller weight in the recommendation. Secondly, user’s can track their expenditure by entering their amount spent on food daily, monthly and weekly trends can then be derived. Lastly, the number of times users patronise a store will also be tracked.

We thus aim to create a web application that will recommend meal options to app users, to aid with this cumbersome problem. 

## User Stories
1. As a student who has difficulty choosing what to eat, I want to be able to quickly decide on what I want to eat.

2. As a student who finds hunting for healthy food on campus to be tedious, I want to be able to obtain suggestions on what to eat based on my nutritional needs.

3. As a student with other peers and friends who are NUS students, I want to be able to socialise with them through sharing what I ate today.

4. As a person who eats on campus regularly, I want to be able to track the statistics (e.g cost, calories, variety) of what I eat daily.

## Features and Timeline
The web application provides a user interface for users who eat regularly on campus to obtain food recommendations, track their food consumption statistics and share what they eat with friends. 

### Features
1) Food recommendations
  - Based on previously indicated dietary preferences by the user
  - Based on location of the user
  - Based on ratings by the user and peers
  - Based on how many calories the user has already consumed for the day
2) Timetable Syncing
  - Allows users to sync their timetable with NUSMODS to allow for better recommendations based on location
3) Social aspect
  - Users can make food reviews by taking pictures of their food using the app and sharing it with other users
  - Users can also opt to post their images on social media
  - Foodie leaderboard: based on the number and quality of reviews given by users
4) Mechanisms to collect datasets for analysis

### Timeline
#### Milestone 1 29th May
| Task | Description | Date |
| :--- | :--- | :--- |
Basic Mockup | Basic layout of the web pages | 13th May - 17th May
Account Login | Page for users to login to their account | 17th May - 23rd May
Sign-Up Page | Page for users to sign up | 17th May - 23rd May
Account Database Establishment | Database to store the account login credentials | 17th May - 23rd May
Settings Page | Page for users to indicate their dietary preferences if any | 23rd May - 29th May

**Evaluation Milestone 1: Ideation**
  - Formulate your project idea clearly
  - Identify the features for your system
  - Design your system
  - Create a development plan
  - Pick up the necessary technologies
  - Build a technical proof of concept (e.g., an integrated frontend+backend with the login/register feature)
  - Document your system
 
**Testing:**
  - Unit testing will be conducted upon completion of each component.
  - Integrated testing will be conducted upon completion of unit testing of all components of our application.
  - Functional testing will be done upon completion of integrated testing of all components.
  - Load Testing will be conducted using JMeter.

#### Milestone 2 26th June
| Task | Description | Date |
| :--- | :--- | :--- |
Food Database | Database to store any info about the shops, such as location, dietary restrictions, etc. | 30th May - 4th June
Food Catalog | List of stores and their food, with pictures | 30th May - 4th June
Location Access | Adding location access to the web app to help in food recommendations | 4th June - 8th June
Food Review | Allow users to leave reviews on the food they eat | 8th June - 15th June
Foodie Leaderboard | A leaderboard to gamify the app. Users with more reviews will be placed higher in the leaderboard | 15th June - 18th June
Review Database Establishment | Database to store the reviews that users post | 8th June - 15th June
Basic Review Analysis | Based on the reviews given for a food item, it will be given a score | 18th June - 25th June

**Evaluation Milestone 2: Prototyping**
  - Implement the prototype of your system, which should contain the most essential features
  - Perform system testing
  - Document your system
 
**Testing:**
  - Unit testing will be conducted upon completion of each component.
  - Integrated testing will be conducted upon completion of unit testing of all components of our application.
  - Functional testing will be done upon completion of integrated testing of all components.

#### Milestone 3 24th July
| Task | Description | Date |
| :--- | :--- | :--- |
NUSMODS Sync | Users timetable access to allow tracking of when the user’s next class will be | 27th June - 4th July
Consumption Tracker | Users can input what they have consumed to be tracked | 4th July - 10th July
Social Media Integration | Users can post they reviews straight to social media | 10th July - 16th July
Basic Food Recommendations | Users will be recommended food based on review ratings and dietary restrictions | 16th July - 23rd July

**Evaluation Milestone 3: Extension**
  - Extend your system by adding more useful features
  - Perform system / user testing
  - Document your system

**Testing:**
  - Unit testing will be conducted upon completion of each component.
  - Integrated testing will be conducted upon completion of unit testing of all components of our application.
  - Functional testing will be done upon completion of integrated testing of all components.
  - Cross-Browser testing will be done upon completion of functional testing
  - Load testing will be done upon completion of cross-browser testing

#### Splashdown 23rd August
| Task | Description | Date |
| :--- | :--- | :--- |
Advanced Food Recommendations | The existing recommendation system will take into account the user’s past consumption, timetable, and location | 25th July - 22nd August
Integration with NUS NextBus Application | Our web application will be integrated with NUS NextBus in order to decide on the optimal location to eat | 5th August - 12th August

**Splashdown: Refinement**
  - Not an official Milestone
  - Polish up your system and fix outstanding issues

## Tech Stack
1. Git / Github: Version Control
2. React: Frontend
3. Firebase: Database
4. Python: Data Analysis
